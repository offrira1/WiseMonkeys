import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { createPageUrl } from "../utils";
import { Word, Team, Game } from "../Entities/index.jsx";

export default function GameRound() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const gameId = searchParams.get('gameId');
  const teamId = searchParams.get('teamId');
  const doubleTime = searchParams.get('doubleTime') === 'true';
  const initialTimer = parseInt(searchParams.get('timer') || '60');
  const bananaCardText = searchParams.get('bananaCard') ? decodeURIComponent(searchParams.get('bananaCard')) : null;
  
  const [timeLeft, setTimeLeft] = useState(initialTimer);
  const [currentWord, setCurrentWord] = useState("");
  const [roundScore, setRoundScore] = useState(0);
  const [correctGuesses, setCorrectGuesses] = useState(0);
  const [skips, setSkips] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [team, setTeam] = useState(null);
  const [game, setGame] = useState(null);
  const [usedWords, setUsedWords] = useState([]);
  const [currentPlayers, setCurrentPlayers] = useState({});
  const [showHintCounter, setShowHintCounter] = useState(false);
  const [pendingWord, setPendingWord] = useState("");
  
  // Calculate score based on number of hints used
  const calculateScore = (hintCount) => {
    switch (hintCount) {
      case 1: return 3; // 3+ steps
      case 2: return 2; // 2+ steps  
      case 3: return 1; // 1+ step
      case 4: return 0; // 0 steps
      default: return 0;
    }
  };

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
      setTimeLeft(initialTimer);
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
  }, [gameId, teamId, initialTimer, getNextWord]);

  useEffect(() => {
    loadGameData();
  }, [loadGameData]);

  const endRound = useCallback(async () => {
    console.log("🔄 endRound called with:", { gameId, teamId, roundScore, correctGuesses, skips });
    setIsActive(false);
    
    try {
      // Update team score and player rotation
      console.log("📊 Updating team score...");
      await Team.update(teamId, { 
        score: (team?.score || 0) + roundScore,
        current_player_index: ((team?.current_player_index || 0) + 3)
      });
      
      // Add round result to game history
      console.log("📝 Adding round result to game history...");
      await Game.update(gameId, {
        used_words: usedWords,
        round_history: [
          ...(game?.round_history || []),
          {
            round: game?.current_round || 1,
            teamId,
            teamName: team?.name,
            score: roundScore,
            correctGuesses,
            skips,
            timestamp: new Date().toISOString()
          }
        ]
      });
      
      const summaryUrl = createPageUrl("RoundSummary") + `?gameId=${gameId}&teamId=${teamId}&score=${roundScore}&correct=${correctGuesses}&skips=${skips}`;
      console.log("🚀 Navigating to:", summaryUrl);
      navigate(summaryUrl);
    } catch (error) {
      console.error("❌ Error ending round:", error);
    }
  }, [teamId, gameId, team, roundScore, correctGuesses, skips, usedWords, navigate, game]);

  useEffect(() => {
    let interval = null;
    if (isActive && !isPaused && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(t => t - 1);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      endRound();
    }
    return () => clearInterval(interval);
  }, [isActive, isPaused, timeLeft, endRound]);

  const handleAction = async (isCorrect) => {
    const wordToMarkAsUsed = currentWord;
    const newUsedWords = [...usedWords, wordToMarkAsUsed];
    setUsedWords(newUsedWords);
    
    if (isCorrect) {
        // Show hint counter modal for correct guesses
        setPendingWord(wordToMarkAsUsed);
        setShowHintCounter(true);
    } else {
        setRoundScore(s => s - 1);
        setSkips(s => s + 1);
        await getNextWord(newUsedWords);
    }
  };

  const handleHintSelection = async (hintCount) => {
    const score = calculateScore(hintCount);
    setRoundScore(s => s + score);
    setCorrectGuesses(c => c + 1);
    setShowHintCounter(false);
    setPendingWord("");
    await getNextWord(usedWords);
  };

  const startRound = () => {
    setIsActive(true);
    setIsPaused(false);
  };

  const pauseTimer = () => {
    setIsPaused(true);
  };

  const resumeTimer = () => {
    setIsPaused(false);
  };

  const resetTimer = () => {
    setTimeLeft(initialTimer);
    setIsPaused(false);
  };

  const finishGame = async () => {
    setIsActive(false);
    
    try {
      // Update team score and player rotation
      await Team.update(teamId, { 
        score: (team?.score || 0) + roundScore,
        current_player_index: ((team?.current_player_index || 0) + 3)
      });
      
      // Add round result to game history
      await Game.update(gameId, {
        used_words: usedWords,
        is_finished: true,
        round_history: [
          ...(game?.round_history || []),
          {
            round: game?.current_round || 1,
            teamId,
            teamName: team?.name,
            score: roundScore,
            correctGuesses,
            skips,
            timestamp: new Date().toISOString()
          }
        ]
      });
      
      navigate(createPageUrl("GameSummary") + `?gameId=${gameId}`);
    } catch (error) {
      console.error("Error finishing game:", error);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (!team || !game) {
    return (
      <div className="game-round-page">
        <div className="loading-container">
          <div className="loading-text">טוען...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="game-round-page" dir="rtl">
      <div className="game-round-container">
        {/* Timer */}
        <div className="timer-card">
          <div className="timer-content">
            <div className="timer-left">
              <div className="timer-display">
                {formatTime(timeLeft)}
              </div>
              <div className="timer-label">זמן נותר</div>
            </div>
            
            {/* Timer Controls - Only show when game is active */}
            {isActive && (
              <div className="timer-controls">
                {isPaused ? (
                  <button onClick={resumeTimer} className="timer-btn resume-btn">
                    ▶️ המשך
                  </button>
                ) : (
                  <button onClick={pauseTimer} className="timer-btn pause-btn">
                    ⏸️ השהה
                  </button>
                )}
                <button onClick={resetTimer} className="timer-btn reset-btn">
                  🔄 אפס
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Team Info - Only show when game is not active */}
        {!isActive && (
          <div className="team-info-card">
            <h2 className="team-title">תור קבוצת {team.name}</h2>
            <div className="players-grid">
              <div className="player-role">
                <div className="role-icon">🙈</div>
                <div className="role-name">קוף שלא רואה</div>
                <div className="player-name">{currentPlayers.guesser}</div>
                <div className="role-desc">מנחש</div>
              </div>
              <div className="player-role">
                <div className="role-icon">🙉</div>
                <div className="role-name">קוף שלא שומע</div>
                <div className="player-name">{currentPlayers.clueGiver}</div>
                <div className="role-desc">נותן רמז</div>
              </div>
              <div className="player-role">
                <div className="role-icon">🙊</div>
                <div className="role-name">קוף שלא מדבר</div>
                <div className="player-name">{currentPlayers.mime}</div>
                <div className="role-desc">פנטומימה</div>
              </div>
            </div>
          </div>
        )}

        {!isActive ? (
          <>
            {/* Banana Card Challenge - Only show if there's a banana card and game is not active */}
            {bananaCardText && (
              <div className="banana-challenge-card">
                <div className="banana-header">
                  <span className="banana-icon">🍌</span>
                  <span className="banana-title">אתגר קלף בננה:</span>
                </div>
                <div className="banana-content">
                  <p className="banana-text">{bananaCardText}</p>
                </div>
              </div>
            )}

            <div className="start-section">
              <button onClick={startRound} className="start-button">
                התחל סיבוב!
              </button>
              <button onClick={finishGame} className="end-game-button">
                סיים משחק
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Word and Action Buttons Row */}
            <div className="word-actions-container">
              {/* Left Button - Correct Guess */}
              <button onClick={() => handleAction(true)} className="correct-button">
                <span className="action-icon">✅</span>
                <span className="action-text">ניחוש נכון</span>
              </button>

              {/* Word Card */}
              <div className="word-card">
                <div className="current-word">{currentWord}</div>
              </div>

              {/* Right Button - Skip */}
              <button onClick={() => handleAction(false)} className="skip-button">
                <span className="action-icon">❌</span>
                <span className="action-text">דילוג</span>
              </button>
            </div>

            {/* Banana Card Challenge - Only show if there's a banana card */}
            {bananaCardText && (
              <div className="banana-challenge-card">
                <div className="banana-header">
                  <span className="banana-icon">🍌</span>
                  <span className="banana-title">אתגר קלף בננה:</span>
                </div>
                <div className="banana-content">
                  <p className="banana-text">{bananaCardText}</p>
                </div>
              </div>
            )}

            {/* Current Score */}
            <div className="score-card">
              <div className="score-title">ניקוד הסיבוב: {roundScore}</div>
              <div className="score-details">
                ניחושים נכונים: {correctGuesses} | דילוגים: {skips}
              </div>
              <button onClick={finishGame} className="end-game-button">
                סיים משחק
              </button>
            </div>
          </>
        )}

        {/* Hint Counter Modal */}
        {showHintCounter && (
          <div className="hint-counter-modal">
            <div className="hint-counter-overlay" onClick={() => setShowHintCounter(false)}></div>
            <div className="hint-counter-content">
              <div className="hint-counter-header">
                <h3>כמה רמזים השתמשתם?</h3>
                <p className="hint-counter-word">מילה: {pendingWord}</p>
              </div>
              
              <div className="hint-counter-buttons">
                <button 
                  className="hint-button hint-1" 
                  onClick={() => handleHintSelection(1)}
                >
                  <div className="hint-number">1</div>
                  <div className="hint-label">רמז אחד</div>
                  <div className="hint-points">+3 נקודות</div>
                </button>
                
                <button 
                  className="hint-button hint-2" 
                  onClick={() => handleHintSelection(2)}
                >
                  <div className="hint-number">2</div>
                  <div className="hint-label">שני רמזים</div>
                  <div className="hint-points">+2 נקודות</div>
                </button>
                
                <button 
                  className="hint-button hint-3" 
                  onClick={() => handleHintSelection(3)}
                >
                  <div className="hint-number">3</div>
                  <div className="hint-label">שלושה רמזים</div>
                  <div className="hint-points">+1 נקודה</div>
                </button>
                
                <button 
                  className="hint-button hint-4" 
                  onClick={() => handleHintSelection(4)}
                >
                  <div className="hint-number">4</div>
                  <div className="hint-label">ארבעה רמזים</div>
                  <div className="hint-points">0 נקודות</div>
                </button>
              </div>
              
              <button 
                className="hint-cancel-button" 
                onClick={() => setShowHintCounter(false)}
              >
                ביטול
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
