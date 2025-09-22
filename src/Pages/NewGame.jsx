import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "../utils";
import { Game, Team } from "../Entities/index.jsx";
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../data/translations";
import LanguageToggle from "../Components/LanguageToggle";

export default function NewGame() {
  const navigate = useNavigate();
  const { language, isHebrew } = useLanguage();
  const common = translations[language].common;
  const t = translations[language].newGame;
  
  const [teams, setTeams] = useState([
    { id: 1, name: isHebrew ? "קבוצה 1" : "Team 1", players: ["", "", ""] }
  ]);
  const [timer, setTimer] = useState(60);
  const [cardBackground, setCardBackground] = useState(null);

  const addTeam = () => {
    if (teams.length < 4) {
      const newTeam = {
        id: teams.length + 1,
        name: isHebrew ? `קבוצה ${teams.length + 1}` : `Team ${teams.length + 1}`,
        players: ["", "", ""]
      };
      setTeams([...teams, newTeam]);
    }
  };

  const removeTeam = (teamId) => {
    if (teams.length > 1) {
      setTeams(teams.filter(team => team.id !== teamId));
    }
  };

  const updateTeamName = (teamId, name) => {
    setTeams(teams.map(team => 
      team.id === teamId ? { ...team, name } : team
    ));
  };

  const updatePlayer = (teamId, playerIndex, name) => {
    setTeams(teams.map(team => 
      team.id === teamId 
        ? { 
            ...team, 
            players: team.players.map((player, index) => 
              index === playerIndex ? name : player
            )
          }
        : team
    ));
  };

  const addPlayer = (teamId) => {
    setTeams(teams.map(team => 
      team.id === teamId && team.players.length < 6
        ? { ...team, players: [...team.players, ""] }
        : team
    ));
  };

  const removePlayer = (teamId, playerIndex) => {
    setTeams(teams.map(team => 
      team.id === teamId && team.players.length > 3
        ? { 
            ...team, 
            players: team.players.filter((_, index) => index !== playerIndex)
          }
        : team
    ));
  };

  const canStartGame = () => {
    return teams.every(team => 
      team.players.filter(p => p.trim() !== "").length >= 3
    );
  };

  const startGame = async () => {
    if (!canStartGame()) return;

    try {
      // Create game
      const game = await Game.create({
        name: "משחק חדש",
        timer_duration: timer,
        used_words: [],
        card_background: cardBackground
      });

      // Create teams
      const createdTeams = [];
      for (const team of teams) {
        const validPlayers = team.players.filter(p => p.trim() !== "");
        if (validPlayers.length >= 3) {
          const createdTeam = await Team.create({
            name: team.name,
            players: validPlayers,
            score: 0,
            game_id: game.id,
            current_player_index: 0
          });
          createdTeams.push(createdTeam);
        }
      }

      // Navigate to role assignment
      navigate(createPageUrl("RoleAssignment") + `?gameId=${game.id}&teamIndex=0`);
    } catch (error) {
      console.error("Error starting game:", error);
    }
  };

  const goHome = () => {
    navigate(createPageUrl("Home"));
  };

  return (
    <div className="new-game-page" dir={isHebrew ? "rtl" : "ltr"}>
      <div className="new-game-container">
        {/* Language Toggle */}
        <div className="language-toggle-container">
          <LanguageToggle />
        </div>

        {/* Game Settings */}
        <div className="game-settings-card">
          <div className="card-header">
            <h2 className="card-title">{t.gameSettings}</h2>
          </div>
          <div className="card-content">
            <div className="timer-section">
              <div className="timer-header">
                <div className="timer-info">
                  <h3 className="timer-title">{t.timePerRound}</h3>
                  <p className="timer-desc">{t.timeDescription}</p>
                </div>
                <div className="timer-display">
                  {timer} {t.seconds}
                </div>
              </div>
              <select 
                value={timer} 
                onChange={(e) => setTimer(parseInt(e.target.value))}
                className="timer-select"
              >
                <option value={60}>{t.fast}</option>
                <option value={90}>{t.medium}</option>
                <option value={120}>{t.relaxed}</option>
              </select>
            </div>
          </div>
        </div>

        {/* Teams */}
        <div className="teams-card">
          <div className="card-header">
            <h2 className="card-title">{t.teams}</h2>
            {teams.length < 4 && (
              <button onClick={addTeam} className="add-team-btn">
                {t.addTeam}
              </button>
            )}
          </div>
          <div className="card-content">
            {teams.map((team, index) => (
              <div key={team.id} className="team-card">
                <div className="team-header">
                  <div className="team-info">
                    <div className="team-number">{index + 1}</div>
                    <input
                      type="text"
                      value={team.name}
                      onChange={(e) => updateTeamName(team.id, e.target.value)}
                      className="team-name-input"
                      placeholder={t.teamNamePlaceholder}
                    />
                  </div>
                  {teams.length > 1 && (
                    <button 
                      onClick={() => removeTeam(team.id)} 
                      className="remove-team-btn"
                    >
                      🗑️
                    </button>
                  )}
                </div>

                <div className="players-section">
                  <div className="players-header">
                    <span className="players-label">{isHebrew ? 'שחקנים' : 'Players'} ({team.players.filter(p => p.trim() !== "").length}/6)</span>
                    {team.players.length < 6 && (
                      <button 
                        onClick={() => addPlayer(team.id)} 
                        className="add-player-btn"
                      >
                        +
                      </button>
                    )}
                  </div>
                  
                  {team.players.map((player, playerIndex) => (
                    <div key={playerIndex} className="player-input-row">
                      <input
                        type="text"
                        value={player}
                        onChange={(e) => updatePlayer(team.id, playerIndex, e.target.value)}
                        placeholder={t.playerPlaceholder}
                        className="player-input"
                      />
                      {team.players.length > 3 && (
                        <button 
                          onClick={() => removePlayer(team.id, playerIndex)} 
                          className="remove-player-btn"
                        >
                          🗑️
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="action-buttons">
          <button 
            onClick={startGame}
            disabled={!canStartGame()}
            className="start-button"
          >
            🎮 {t.startGame}
          </button>
          <button onClick={goHome} className="back-button">
            ← {t.backToHome}
          </button>
        </div>
      </div>
    </div>
  );
}
