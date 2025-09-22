import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { createPageUrl } from "../utils";
import { Team, Game } from "../Entities/index.jsx";
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../data/translations";
import LanguageToggle from "../Components/LanguageToggle";

// Confetti Component
const Confetti = () => {
  return (
    <div className="confetti-container">
      {Array.from({ length: 20 }, (_, i) => (
        <div key={i} className="confetti-piece"></div>
      ))}
    </div>
  );
};

export default function GameSummary() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { language, isHebrew } = useLanguage();
  const common = translations[language].common;
  const t = translations[language].gameSummary;
  
  const gameId = searchParams.get('gameId');
  
  const [game, setGame] = useState(null);
  const [teams, setTeams] = useState([]);
  const [gameStats, setGameStats] = useState(null);

  useEffect(() => {
    loadGameData();
  }, [gameId]);

  const loadGameData = async () => {
    try {
      const gameData = await Game.get(gameId);
      const allTeams = await Team.filter({ game_id: gameId });
      
      setGame(gameData);
      setTeams(allTeams);
      
      // Calculate game statistics
      const stats = calculateGameStats(gameData, allTeams);
      setGameStats(stats);
    } catch (error) {
      console.error("Error loading game data:", error);
    }
  };

  const calculateGameStats = (gameData, teams) => {
    const roundHistory = gameData.round_history || [];
    
    // Sort teams by final score
    const sortedTeams = [...teams].sort((a, b) => b.score - a.score);
    
    // Calculate team statistics
    const teamStats = teams.map(team => {
      const teamRounds = roundHistory.filter(round => round.teamId === team.id);
      const totalCorrect = teamRounds.reduce((sum, round) => sum + round.correctGuesses, 0);
      const totalSkips = teamRounds.reduce((sum, round) => sum + round.skips, 0);
      const totalWords = totalCorrect + totalSkips;
      const accuracy = totalWords > 0 ? (totalCorrect / totalWords * 100).toFixed(1) : 0;
      
      return {
        ...team,
        totalCorrect,
        totalSkips,
        totalWords,
        accuracy: parseFloat(accuracy),
        roundsPlayed: teamRounds.length,
        averageScore: teamRounds.length > 0 ? (team.score / teamRounds.length).toFixed(1) : 0
      };
    });

    // Calculate overall game statistics
    const totalRounds = gameData.current_round || 1;
    const totalWords = roundHistory.reduce((sum, round) => sum + round.correctGuesses + round.skips, 0);
    const totalCorrect = roundHistory.reduce((sum, round) => sum + round.correctGuesses, 0);
    const gameAccuracy = totalWords > 0 ? (totalCorrect / totalWords * 100).toFixed(1) : 0;

    return {
      winningTeam: sortedTeams[0],
      sortedTeams,
      teamStats,
      totalRounds,
      totalWords,
      totalCorrect,
      gameAccuracy: parseFloat(gameAccuracy),
      gameDuration: gameData.created_at ? 
        Math.round((new Date() - new Date(gameData.created_at)) / 1000 / 60) : 0
    };
  };

  const getRankIcon = (index) => {
    switch (index) {
      case 0: return "🥇";
      case 1: return "🥈";
      case 2: return "🥉";
      default: return `${index + 1}.`;
    }
  };

  const getRankColor = (index) => {
    switch (index) {
      case 0: return "from-yellow-400 to-yellow-600";
      case 1: return "from-gray-300 to-gray-500";
      case 2: return "from-orange-400 to-orange-600";
      default: return "from-blue-400 to-blue-600";
    }
  };

  const getMVPPlayers = () => {
    if (!gameStats) return [];
    
    const mvpPlayers = [];
    gameStats.sortedTeams.forEach(team => {
      const teamStat = gameStats.teamStats.find(stat => stat.id === team.id);
      if (teamStat && teamStat.accuracy > 70) {
        mvpPlayers.push({
          name: team.name,
          accuracy: teamStat.accuracy,
          score: team.score
        });
      }
    });
    
    return mvpPlayers.sort((a, b) => b.accuracy - a.accuracy);
  };

  const newGame = () => {
    navigate(createPageUrl("Home"));
  };

  const goHome = () => {
    navigate(createPageUrl("Home"));
  };

  if (!game || !gameStats) {
    return (
      <div className="game-summary-page" dir={isHebrew ? "rtl" : "ltr"}>
        <div className="loading-container">
          <div className="loading-text">{t.loading}</div>
        </div>
      </div>
    );
  }

  const mvpPlayers = getMVPPlayers();

  return (
    <div className="game-summary-page" dir={isHebrew ? "rtl" : "ltr"}>
      <Confetti />
      <div className="game-summary-container">
        {/* Language Toggle */}
        <div className="language-toggle-container">
          <LanguageToggle />
        </div>


        {/* Winner Announcement */}
        <div className="winner-card">
          <h2 className="winner-title">{t.winner}</h2>
          <div className="winner-name">{gameStats.winningTeam.name}</div>
          <div className="winner-score">{gameStats.winningTeam.score} {t.points}</div>
        </div>

        {/* Game Statistics */}
        <div className="stats-card">
          <h3 className="stats-title">{t.gameStats}</h3>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-icon">⏱️</div>
              <div className="stat-number">{gameStats.totalRounds}</div>
              <div className="stat-label">{t.rounds}</div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">🎯</div>
              <div className="stat-number">{gameStats.totalCorrect}</div>
              <div className="stat-label">{t.correctGuesses}</div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">📝</div>
              <div className="stat-number">{gameStats.totalWords}</div>
              <div className="stat-label">{t.totalWords}</div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">⭐</div>
              <div className="stat-number">{gameStats.gameAccuracy}%</div>
              <div className="stat-label">{t.overallAccuracy}</div>
            </div>
          </div>
        </div>

        {/* Team Rankings */}
        <div className="rankings-card">
          <h3 className="rankings-title">{t.teamRankings}</h3>
          <div className="rankings-list">
            {gameStats.sortedTeams.map((team, index) => {
              const teamStat = gameStats.teamStats.find(stat => stat.id === team.id);
              return (
                <div key={team.id} className={`ranking-item rank-${index + 1}`}>
                  <div className="ranking-header">
                    <div className="ranking-position">
                      <span className="rank-icon">{getRankIcon(index)}</span>
                      <span className="rank-number">{index + 1}</span>
                    </div>
                    <div className="ranking-info">
                      <div className="team-name team-name-white">{team.name}</div>
                      <div className="team-participants">
                        {team.players && team.players.length > 0 ? (
                          <div className="participants-list">
                            {team.players.map((player, playerIndex) => (
                              <span key={playerIndex} className="participant-name">
                                {player}
                                {playerIndex < team.players.length - 1 ? ', ' : ''}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <div className="no-participants">{t.noParticipants}</div>
                        )}
                      </div>
                      <div className="team-details">
                        {teamStat?.roundsPlayed} {t.roundsPlayed} | {t.accuracy}: {teamStat?.accuracy}%
                      </div>
                    </div>
                    <div className="ranking-score">
                      <div className="score-number">{team.score}</div>
                      <div className="score-label">{t.points}</div>
                    </div>
                  </div>
                  
                  <div className="ranking-details">
                    <div className="detail-item">
                      <span className="detail-label">{t.correct}:</span>
                      <span className="detail-value">{teamStat?.totalCorrect || 0}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">{t.skips}:</span>
                      <span className="detail-value">{teamStat?.totalSkips || 0}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">{t.averagePerRound}:</span>
                      <span className="detail-value">{teamStat?.averageScore || 0}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* MVP Players */}
        {mvpPlayers.length > 0 && (
          <div className="mvp-card">
            <h3 className="mvp-title">{t.mvpPlayers}</h3>
            <div className="mvp-list">
              {mvpPlayers.map((player, index) => (
                <div key={index} className="mvp-item">
                  <div className="mvp-icon">⭐</div>
                  <div className="mvp-info">
                    <div className="mvp-name">{player.name}</div>
                    <div className="mvp-stats">{t.accuracy}: {player.accuracy}% | {player.score} {t.points}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="action-buttons">
          <button onClick={newGame} className="new-game-button">
            {t.newGame}
          </button>
          <button onClick={goHome} className="home-button">
            {t.backToHome}
          </button>
        </div>
      </div>
    </div>
  );
}
