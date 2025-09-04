import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { createPageUrl } from "../utils";
import { Team, Game } from "../Entities/index.jsx";

export default function RoundSummary() {
  console.log("🎯 RoundSummary component loaded");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const gameId = searchParams.get('gameId');
  const teamId = searchParams.get('teamId');
  const score = parseInt(searchParams.get('score') || '0');
  const correct = searchParams.get('correct');
  const skips = searchParams.get('skips');
  
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
      <div className="round-summary-page">
        <div className="loading-container">
          <div className="loading-text">
            טוען סיכום הסיבוב...
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
  
  return (
    <div className="round-summary-page" dir="rtl">
      <div className="round-summary-container">
        {/* Score Display */}
        <div className="score-display-card">
          <h1 className="page-title">סיכום סיבוב ומספר הנקודות</h1>
          <p className="page-subtitle">תוצאות הסיבוב הנוכחי</p>
          <div className="score-number">{score}</div>
          <div className="score-label">נקודות</div>
          <div className="score-details">
            <div className="score-item">
              <span className="score-item-label">ניחושים נכונים:</span>
              <span className="score-item-value">{correct}</span>
            </div>
            <div className="score-item">
              <span className="score-item-label">דילוגים:</span>
              <span className="score-item-value">{skips}</span>
            </div>
          </div>
          <div className="round-info">
            סיבוב מספר {game?.current_round || 1} קבוצה {currentTeamIndex + 1} מ {teams.length}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="action-buttons">
          {canContinue ? (
            <>
              {isLastTeam ? (
                <button onClick={handleContinue} className="continue-button">
                  המשך לסיבוב הבא
                </button>
              ) : (
                <button onClick={handleContinue} className="continue-button">
                  המשך לקבוצה הבאה
                </button>
              )}
              
              <button onClick={handleFinishGame} className="finish-button">
                סיים משחק
              </button>
            </>
          ) : (
            <button onClick={handleFinishGame} className="finish-button">
              סיום המשחק
            </button>
          )}
          
          <button onClick={handleHome} className="home-button">
            חזרה לתפריט הראשי
          </button>
        </div>
      </div>
    </div>
  );
}
