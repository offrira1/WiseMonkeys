import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { createPageUrl } from "../utils";
import { Word, Team, Game } from "../Entities/index.jsx";
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../data/translations";
import LanguageToggle from "../Components/LanguageToggle";

export default function GameRound() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { language, isHebrew } = useLanguage();
  const t = translations[language].gameRound;
  const common = translations[language].common;
  
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
  const [skippedWords, setSkippedWords] = useState([]);
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
        setCurrentWord(t.noWordsLeft);
        return "";
      }
      
      const randomIndex = Math.floor(Math.random() * availableWords.length);
      const newWord = availableWords[randomIndex].text;
      setCurrentWord(newWord);
      return newWord;
    } catch (error) {
      console.error("Error getting next word:", error);
      setCurrentWord(t.errorLoadingWord);
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
      
      // Debug: Check current language and words
      const gameDataInstance = (await import('../data/GameData.js')).default;
      gameDataInstance.debugCurrentWords(language);
      
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
      
      const summaryUrl = createPageUrl("RoundSummary") + 
        `?gameId=${gameId}&teamId=${teamId}&score=${roundScore}&correct=${correctGuesses}&skips=${skips}` +
        `&usedWords=${encodeURIComponent(JSON.stringify(usedWords))}` +
        `&skippedWords=${encodeURIComponent(JSON.stringify(skippedWords))}`;
      console.log("🚀 Navigating to:", summaryUrl);
      navigate(summaryUrl);
    } catch (error) {
      console.error("❌ Error ending round:", error);
    }
  }, [teamId, gameId, team, roundScore, correctGuesses, skips, usedWords, skippedWords, navigate, game]);

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
    
    if (isCorrect) {
        // Show hint counter modal for correct guesses
        setPendingWord(wordToMarkAsUsed);
        setShowHintCounter(true);
    } else {
        // Track skipped word
        const newSkippedWords = [...skippedWords, { text: wordToMarkAsUsed, score: -1 }];
        setSkippedWords(newSkippedWords);
        setRoundScore(s => s - 1);
        setSkips(s => s + 1);
        await getNextWord(usedWords);
    }
  };

  const handleHintSelection = async (hintCount) => {
    const score = calculateScore(hintCount);
    setRoundScore(s => s + score);
    setCorrectGuesses(c => c + 1);
    
    // Track the word with hint information
    const wordWithHints = {
      text: pendingWord,
      hintsUsed: hintCount,
      score: score
    };
    const newUsedWords = [...usedWords, wordWithHints];
    setUsedWords(newUsedWords);
    
    setShowHintCounter(false);
    setPendingWord("");
    await getNextWord(newUsedWords);
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
          <div className="loading-text">{t.loading}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="game-round-page" dir={isHebrew ? "rtl" : "ltr"}>
      <div className="game-round-container">
        {/* Language Toggle */}
        <div className="language-toggle-container">
          <LanguageToggle />
          {/* Debug button - remove this later */}
          <button 
            onClick={async () => {
              const gameDataInstance = (await import('../data/GameData.js')).default;
              gameDataInstance.debugCurrentWords(language);
              gameDataInstance.clearAllWordData();
              console.log('Cleared and refreshed word data');
            }}
            style={{marginLeft: '10px', padding: '5px', fontSize: '12px'}}
          >
            Debug Words
          </button>
        </div>
        {/* Timer */}
        <div className="timer-card">
          <div className="timer-content">
            <div className="timer-left">
              <div className="timer-display">
                {formatTime(timeLeft)}
              </div>
              <div className="timer-label">{t.timeRemaining}</div>
            </div>
            
            {/* Timer Controls - Only show when game is active */}
            {isActive && (
              <div className="timer-controls">
                {isPaused ? (
                  <button onClick={resumeTimer} className="timer-btn resume-btn">
{t.continue}
                  </button>
                ) : (
                  <button onClick={pauseTimer} className="timer-btn pause-btn">
{t.pause}
                  </button>
                )}
                <button onClick={resetTimer} className="timer-btn reset-btn">
{t.reset}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Team Info - Only show when game is not active */}
        {!isActive && (
          <div className="team-info-card">
            <h2 className="team-title">{t.teamTurn} {team.name}</h2>
            <div className="players-grid">
              <div className="player-role">
                <div className="role-icon">🙈</div>
                <div className="role-name">{t.monkeyNotSee}</div>
                <div className="player-name">{currentPlayers.guesser}</div>
                <div className="role-desc">{t.guess}</div>
              </div>
              <div className="player-role">
                <div className="role-icon">🙉</div>
                <div className="role-name">{t.monkeyNotHear}</div>
                <div className="player-name">{currentPlayers.clueGiver}</div>
                <div className="role-desc">{t.giveHint}</div>
              </div>
              <div className="player-role">
                <div className="role-icon">🙊</div>
                <div className="role-name">{t.monkeyNotSpeak}</div>
                <div className="player-name">{currentPlayers.mime}</div>
                <div className="role-desc">{t.pantomime}</div>
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
                  <span className="banana-title">{t.bananaChallenge}</span>
                </div>
                <div className="banana-content">
                  <p className="banana-text">{bananaCardText}</p>
                </div>
              </div>
            )}

            <div className="start-section">
              <button onClick={startRound} className="start-button">
                {t.startRound}
              </button>
              <button onClick={finishGame} className="end-game-button">
                {t.finishGame}
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
                <span className="action-text">{t.correctGuess}</span>
              </button>

              {/* Word Card */}
              <div className="word-card">
                <div className="current-word">{currentWord}</div>
              </div>

              {/* Right Button - Skip */}
              <button onClick={() => handleAction(false)} className="skip-button">
                <span className="action-icon">❌</span>
                <span className="action-text">{t.skip}</span>
              </button>
            </div>

            {/* Banana Card Challenge - Only show if there's a banana card */}
            {bananaCardText && (
              <div className="banana-challenge-card">
                <div className="banana-header">
                  <span className="banana-icon">🍌</span>
                  <span className="banana-title">{t.bananaChallenge}</span>
                </div>
                <div className="banana-content">
                  <p className="banana-text">{bananaCardText}</p>
                </div>
              </div>
            )}

            {/* Current Score */}
            <div className="score-card">
              <div className="score-title">{t.roundScore}: {roundScore}</div>
              <div className="score-details">
                {common.correctGuesses}: {correctGuesses} | {common.skips}: {skips}
              </div>
              <button onClick={finishGame} className="end-game-button">
                {t.finishGame}
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
                <h3>{t.hintCounter.title}</h3>
                <p className="hint-counter-word">{t.hintCounter.word}: {pendingWord}</p>
              </div>
              
              <div className="hint-counter-buttons">
                <button 
                  className="hint-button hint-1" 
                  onClick={() => handleHintSelection(1)}
                >
                  <div className="hint-number">1</div>
                  <div className="hint-label">{t.hintCounter.oneHint}</div>
                  <div className="hint-points">+3 {common.points}</div>
                </button>
                
                <button 
                  className="hint-button hint-2" 
                  onClick={() => handleHintSelection(2)}
                >
                  <div className="hint-number">2</div>
                  <div className="hint-label">{t.hintCounter.twoHints}</div>
                  <div className="hint-points">+2 {common.points}</div>
                </button>
                
                <button 
                  className="hint-button hint-3" 
                  onClick={() => handleHintSelection(3)}
                >
                  <div className="hint-number">3</div>
                  <div className="hint-label">{t.hintCounter.threeHints}</div>
                  <div className="hint-points">+1 {common.points}</div>
                </button>
                
                <button 
                  className="hint-button hint-4" 
                  onClick={() => handleHintSelection(4)}
                >
                  <div className="hint-number">4</div>
                  <div className="hint-label">{t.hintCounter.fourHints}</div>
                  <div className="hint-points">0 {common.points}</div>
                </button>
              </div>
              
              <button 
                className="hint-cancel-button" 
                onClick={() => setShowHintCounter(false)}
              >
                {common.cancel}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
