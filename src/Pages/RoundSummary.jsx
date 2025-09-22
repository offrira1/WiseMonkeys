import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { createPageUrl } from "../utils";
import { Team, Game } from "../Entities/index.jsx";
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../data/translations";
import LanguageToggle from "../Components/LanguageToggle";

export default function RoundSummary() {
  console.log("🎯 RoundSummary component loaded");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { language, isHebrew } = useLanguage();
  const common = translations[language].common;
  const t = translations[language].roundSummary;
  
  const gameId = searchParams.get('gameId');
  const teamId = searchParams.get('teamId');
  const score = parseInt(searchParams.get('score') || '0');
  const correct = searchParams.get('correct');
  const skips = searchParams.get('skips');
  const usedWords = searchParams.get('usedWords') ? JSON.parse(decodeURIComponent(searchParams.get('usedWords'))) : [];
  const skippedWords = searchParams.get('skippedWords') ? JSON.parse(decodeURIComponent(searchParams.get('skippedWords'))) : [];
  
  console.log("📋 RoundSummary params:", { gameId, teamId, score, correct, skips });
  
  const [teams, setTeams] = useState([]);
  const [currentTeamIndex, setCurrentTeamIndex] = useState(0);
  const [game, setGame] = useState(null);

  useEffect(() => {
    loadGameData();
  }, [gameId]);

  const loadGameData = async () => {
    try {
      console.log("🔄 Loading game data for gameId:", gameId);
      const gameData = await Game.get(gameId);
      console.log("🎮 Game data loaded:", gameData);
      const allTeams = await Team.filter({ game_id: gameId });
      console.log("👥 Teams loaded:", allTeams);
      
      // If no data found, create mock data for testing
      if (!gameData || allTeams.length === 0) {
        console.log("⚠️ No data found, creating mock data for testing");
        const mockGame = {
          id: gameId,
          name: "משחק בדיקה",
          current_round: 1,
          max_rounds: 30,
          is_finished: false,
          canContinue() { return true; }
        };
        const mockTeams = [
          { id: teamId, name: "קבוצה 1", score: 0 },
          { id: "team_2", name: "קבוצה 2", score: 0 }
        ];
        setGame(mockGame);
        setTeams(mockTeams);
        setCurrentTeamIndex(0);
        return;
      }
      
      setGame(gameData);
      setTeams(allTeams);
      const currentIndex = allTeams.findIndex(team => team.id === teamId);
      console.log("📍 Current team index:", currentIndex);
      setCurrentTeamIndex(currentIndex);
    } catch (error) {
      console.error("❌ Error loading game data:", error);
      // Create fallback mock data
      const mockGame = {
        id: gameId,
        name: "משחק בדיקה",
        current_round: 1,
        max_rounds: 30,
        is_finished: false,
        canContinue() { return true; }
      };
      const mockTeams = [
        { id: teamId, name: "קבוצה 1", score: 0 },
        { id: "team_2", name: "קבוצה 2", score: 0 }
      ];
      setGame(mockGame);
      setTeams(mockTeams);
      setCurrentTeamIndex(0);
    }
  };

  const handleContinue = async () => {
    const nextTeamIndex = (currentTeamIndex + 1) % teams.length;
    
    // If we're back to the first team, increment the round
    if (nextTeamIndex === 0) {
      await Game.update(gameId, { current_round: (game?.current_round || 1) + 1 });
    }
    
    navigate(createPageUrl("RoleAssignment") + `?gameId=${gameId}&teamIndex=${nextTeamIndex}`);
  };

  const handleFinishGame = async () => {
    await Game.update(gameId, { is_finished: true });
    navigate(createPageUrl("GameSummary") + `?gameId=${gameId}`);
  };

  const handleHome = () => {
    navigate(createPageUrl("Home"));
  };

  const isLastTeam = currentTeamIndex === teams.length - 1;
  const canContinue = game && !game.is_finished && (game.current_round < game.max_rounds);

  // Show loading state if data is not ready
  if (!game || teams.length === 0) {
    console.log("⏳ Showing loading state. Game:", !!game, "Teams:", teams.length);
    return (
      <div className="round-summary-page" dir={isHebrew ? "rtl" : "ltr"}>
        <div className="loading-container">
          <div className="loading-text">
            {t.loading}
            <br />
            <small>Game: {game ? '✅' : '❌'} | Teams: {teams.length}</small>
            <br />
            <small>GameId: {gameId} | TeamId: {teamId}</small>
            <br />
            <small>Score: {score} | Correct: {correct} | Skips: {skips}</small>
          </div>
        </div>
      </div>
    );
  }

  console.log("🎨 Rendering RoundSummary with data:", { game: !!game, teams: teams.length, currentTeamIndex });
  
  // Calculate average hints used
  const averageHints = usedWords.length > 0 
    ? (usedWords.reduce((sum, word) => sum + (word.hintsUsed || 0), 0) / usedWords.length).toFixed(1)
    : 0;

  return (
    <div className="round-summary-page" dir={isHebrew ? "rtl" : "ltr"}>
      <div className="round-summary-container">
        {/* Language Toggle */}
        <div className="language-toggle-container">
          <LanguageToggle />
        </div>

        {/* Score Display */}
        <div className="score-display-card">
          <h1 className="page-title">{t.title}</h1>
          <p className="page-subtitle">{t.subtitle}</p>
          <div className="score-number">{score}</div>
          <div className="score-label">{t.points}</div>
          <div className="score-details">
            <div className="score-item">
              <span className="score-item-label">{t.correctGuesses}:</span>
              <span className="score-item-value">{correct}</span>
            </div>
            <div className="score-item">
              <span className="score-item-label">{t.skips}:</span>
              <span className="score-item-value">{skips}</span>
            </div>
          </div>
          <div className="round-info">
            {t.roundInfo} {game?.current_round || 1} {t.team} {currentTeamIndex + 1} {t.of} {teams.length}
          </div>
        </div>

        {/* Word Details */}
        <div className="word-details-card">
          <h2 className="word-details-title">{t.wordDetails}</h2>
          
          {/* Guessed Words */}
          <div className="words-section">
            <h3 className="words-section-title">{t.guessedWords} ({usedWords.length})</h3>
            {usedWords.length > 0 ? (
              <div className="words-list">
                {usedWords.map((word, index) => (
                  <div key={index} className="word-item">
                    <div className="word-text">{word.text}</div>
                    <div className="word-stats">
                      <span className="hints-used">{t.hintsUsed}: {word.hintsUsed || 0}</span>
                      <span className="word-score">{t.score}: {word.score || 0}</span>
                    </div>
                  </div>
                ))}
                <div className="words-summary">
                  <div className="summary-item">
                    <span className="summary-label">{t.totalScore}:</span>
                    <span className="summary-value">{usedWords.reduce((sum, word) => sum + (word.score || 0), 0)}</span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">{t.averageHints}:</span>
                    <span className="summary-value">{averageHints}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="no-words">{t.noWords}</div>
            )}
          </div>

          {/* Skipped Words */}
          {skippedWords.length > 0 && (
            <div className="words-section">
              <h3 className="words-section-title">{t.skippedWords} ({skippedWords.length})</h3>
              <div className="words-list">
                {skippedWords.map((word, index) => (
                  <div key={index} className="word-item skipped">
                    <div className="word-text">{word.text}</div>
                    <div className="word-stats">
                      <span className="skipped-label">{t.skips}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="action-buttons">
          {canContinue ? (
            <>
              {isLastTeam ? (
                <button onClick={handleContinue} className="continue-button">
                  {t.continueNextRound}
                </button>
              ) : (
                <button onClick={handleContinue} className="continue-button">
                  {t.continueNextTeam}
                </button>
              )}
              
              <button onClick={handleFinishGame} className="finish-button">
                {t.finishGame}
              </button>
            </>
          ) : (
            <button onClick={handleFinishGame} className="finish-button">
              {t.endGame}
            </button>
          )}
          
          <button onClick={handleHome} className="home-button">
            {t.backToHome}
          </button>
        </div>
      </div>
    </div>
  );
}
