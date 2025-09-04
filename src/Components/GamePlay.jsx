import React, { useState, useEffect, useCallback } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { CheckCircle, X, Clock, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "../utils";
import { Word, Team, Game } from "../Entities/index.jsx";

export default function GamePlay({ gameId, teamId, doubleTime }) {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(60);
  const [currentWord, setCurrentWord] = useState("");
  const [roundScore, setRoundScore] = useState(0);
  const [correctGuesses, setCorrectGuesses] = useState(0);
  const [skips, setSkips] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [team, setTeam] = useState(null);
  const [game, setGame] = useState(null);
  const [usedWords, setUsedWords] = useState([]);
  const [currentPlayers, setCurrentPlayers] = useState({});
  
  const getNextWord = useCallback(async (currentUsedWords) => {
    try {
      const allWords = await Word.filter({ is_active: true, difficulty: "easy" });
      const availableWords = allWords.filter(word => !currentUsedWords.includes(word.text));
      
      if (availableWords.length === 0) {
        setCurrentWord("נגמרו המילים!");
        return "";
      }
      
      const randomIndex = Math.floor(Math.random() * availableWords.length);
      const newWord = availableWords[randomIndex].text;
      setCurrentWord(newWord);
      return newWord;
    } catch (error) {
      console.error("Error getting next word:", error);
      setCurrentWord("שגיאה בטעינת מילה");
      return "";
    }
  }, []);

  const loadGameData = useCallback(async () => {
    try {
      const gameData = await Game.get(gameId);
      const teamData = await Team.get(teamId);
      
      setGame(gameData);
      setTeam(teamData);
      setTimeLeft(doubleTime ? gameData.timer_duration * 2 : gameData.timer_duration);
      setUsedWords(gameData.used_words || []);
      
      const playerIndex = teamData.current_player_index || 0;
      const players = teamData.players;
      setCurrentPlayers({
        mime: players[playerIndex % players.length],
        guesser: players[(playerIndex + 1) % players.length],
        clueGiver: players[(playerIndex + 2) % players.length]
      });
      
      await getNextWord(gameData.used_words || []);
    } catch (error) {
      console.error("Error loading game data:", error);
    }
  }, [gameId, teamId, doubleTime, getNextWord]);

  useEffect(() => {
    loadGameData();
  }, [loadGameData]);

  const endRound = useCallback(async () => {
    setIsActive(false);
    
    try {
      await Team.update(teamId, { 
        score: (team?.score || 0) + roundScore,
        current_player_index: ((team?.current_player_index || 0) + 3)
      });
      
      await Game.update(gameId, {
        used_words: usedWords
      });
      
      navigate(createPageUrl("RoundSummary") + `?gameId=${gameId}&teamId=${teamId}&score=${roundScore}&correct=${correctGuesses}&skips=${skips}`);
    } catch (error) {
      console.error("Error ending round:", error);
    }
  }, [teamId, gameId, team, roundScore, correctGuesses, skips, usedWords, navigate]);

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(t => t - 1);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      endRound();
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, endRound]);

  const handleAction = async (isCorrect) => {
    const wordToMarkAsUsed = currentWord;
    const newUsedWords = [...usedWords, wordToMarkAsUsed];
    setUsedWords(newUsedWords);
    
    if (isCorrect) {
        setRoundScore(s => s + 1);
        setCorrectGuesses(c => c + 1);
    } else {
        setRoundScore(s => s - 1);
        setSkips(s => s + 1);
    }
    
    await getNextWord(newUsedWords);
  };

  const startRound = () => {
    setIsActive(true);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (!team || !game) {
    return <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 flex items-center justify-center">
      <Loader2 className="w-12 h-12 text-white animate-spin" />
    </div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 p-4" dir="rtl">
      <div className="max-w-2xl mx-auto space-y-6">
        
        {/* Timer */}
        <Card className="bg-white/95 backdrop-blur-sm text-center">
          <CardContent className="p-6">
            <div className={`text-6xl font-bold mb-2 ${timeLeft <= 10 ? 'text-red-500 animate-pulse' : 'text-blue-900'}`}>
              {formatTime(timeLeft)}
            </div>
            <div className="flex items-center justify-center gap-2 text-gray-600">
              <Clock className="w-5 h-5" />
              <span>זמן נותר</span>
            </div>
          </CardContent>
        </Card>

        {/* תפקידי שחקנים */}
        <Card className="bg-white/95 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-center text-xl text-blue-900">
              תור קבוצת {team.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="space-y-2">
                <div className="text-2xl">🙈</div>
                <div className="font-semibold">קוף שלא רואה</div>
                <div className="text-sm text-gray-600">{currentPlayers.guesser}</div>
                <div className="text-xs text-gray-500">מנחש</div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl">🙉</div>
                <div className="font-semibold">קוף שלא שומע</div>
                <div className="text-sm text-gray-600">{currentPlayers.clueGiver}</div>
                <div className="text-xs text-gray-500">נותן רמז</div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl">🙊</div>
                <div className="font-semibold">קוף שלא מדבר</div>
                <div className="text-sm text-gray-600">{currentPlayers.mime}</div>
                <div className="text-xs text-gray-500">פנטומימה</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {!isActive ? (
          <Card className="bg-white/95 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <Button 
                onClick={startRound}
                className="w-full h-16 text-xl bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold"
              >
                התחל סיבוב!
              </Button>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* המילה הנוכחית */}
            <Card className="bg-white/95 backdrop-blur-sm">
              <CardContent className="p-8 text-center min-h-[150px] flex items-center justify-center">
                <div className="text-5xl font-bold text-blue-900">
                  {currentWord}
                </div>
              </CardContent>
            </Card>

            {/* כפתורי פעולה */}
            <div className="grid grid-cols-2 gap-4">
              <Button 
                onClick={() => handleAction(true)}
                className="h-28 text-xl flex-col bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold shadow-lg"
              >
                <CheckCircle className="w-8 h-8 mb-2" />
                <span>ניחוש נכון</span>
                <span className="text-sm font-normal">(+1 נקודה)</span>
              </Button>
              
              <Button 
                onClick={() => handleAction(false)}
                variant="destructive"
                className="h-28 text-xl flex-col bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 font-semibold shadow-lg"
              >
                <X className="w-8 h-8 mb-2" />
                <span>דילוג</span>
                <span className="text-sm font-normal">(-1 נקודה)</span>
              </Button>
            </div>

            {/* ניקוד נוכחי */}
            <Card className="bg-white/95 backdrop-blur-sm">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-900">
                  ניקוד הסיבוב: {roundScore}
                </div>
                <div className="text-sm text-gray-600 mt-2">
                  ניחושים נכונים: {correctGuesses} | דילוגים: {skips}
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}
