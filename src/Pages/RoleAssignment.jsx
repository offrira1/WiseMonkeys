import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { createPageUrl } from "../utils";
import { Game, Team } from "../Entities/index.jsx";
import GameData from "../data/GameData.js";

export default function RoleAssignment() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const gameId = searchParams.get('gameId');
  const teamIndex = parseInt(searchParams.get('teamIndex') || '0');
  
  const [game, setGame] = useState(null);
  const [teams, setTeams] = useState([]);
  const [currentTeam, setCurrentTeam] = useState(null);
  const [bananaCard, setBananaCard] = useState(null);
  const [showBananaCard, setShowBananaCard] = useState(false);
  const [doubleTime, setDoubleTime] = useState(false);
  const [isEditingTeamName, setIsEditingTeamName] = useState(false);
  const [editedTeamName, setEditedTeamName] = useState('');

  useEffect(() => {
    loadGameData();
  }, [gameId, teamIndex]);

  const loadGameData = async () => {
    try {
      const gameData = await Game.get(gameId);
      const allTeams = await Team.filter({ game_id: gameId });
      
      setGame(gameData);
      setTeams(allTeams);
      setCurrentTeam(allTeams[teamIndex]);
    } catch (error) {
      console.error("Error loading game data:", error);
    }
  };

  const openBananaCard = () => {
    const challenges = [
      "נחש את המילה רק עם תנועות ידיים",
      "נחש את המילה רק עם קולות של בעלי חיים",
      "נחש את המילה רק עם ריקוד",
      "נחש את המילה רק עם ציור באוויר",
      "נחש את המילה רק עם תנועות פנים",
      "נחש את המילה רק עם קולות של מכונות",
      "נחש את המילה רק עם תנועות גוף",
      "נחש את המילה רק עם קולות של טבע"
    ];
    
    const randomChallenge = challenges[Math.floor(Math.random() * challenges.length)];
    setBananaCard({ text: randomChallenge });
    setShowBananaCard(true);
  };

  const closeBananaCard = () => {
    setShowBananaCard(false);
    setBananaCard(null);
  };

  const editTeamName = () => {
    const newName = prompt("הזן שם חדש לקבוצה:", currentTeam.name);
    if (newName && newName.trim()) {
      Team.update(currentTeam.id, { name: newName.trim() });
      setCurrentTeam({ ...currentTeam, name: newName.trim() });
    }
  };

  const startRound = () => {
    const timer = doubleTime ? game.timer_duration * 2 : game.timer_duration;
    const bananaCardParam = bananaCard ? encodeURIComponent(bananaCard.text) : '';
    navigate(createPageUrl("GameRound") + `?gameId=${gameId}&teamId=${currentTeam.id}&doubleTime=${doubleTime}&timer=${timer}&bananaCard=${bananaCardParam}`);
  };

  const goHome = () => {
    if (confirm("האם אתה בטוח שברצונך לחזור לתפריט הראשי? המשחק יאבד.")) {
      navigate(createPageUrl("Home"));
    }
  };

  const currentPlayers = useMemo(() => {
    if (!currentTeam) return { mime: "", clueGiver: "", guesser: "", additionalMimes: [] };
    
    const players = [...currentTeam.players]; // Create a copy
    const shuffledPlayers = players.sort(() => Math.random() - 0.5); // Randomize
    
    // Always assign: 1 guesser, 1 clue giver, rest are mimes
    const guesser = shuffledPlayers[0];
    const clueGiver = shuffledPlayers[1];
    const mimes = shuffledPlayers.slice(2); // All remaining players are mimes
    
    return {
      mime: mimes[0] || "", // Primary mime
      clueGiver: clueGiver,
      guesser: guesser,
      additionalMimes: mimes.slice(1) // Additional mimes if more than 3 players
    };
  }, [currentTeam]); // Only recalculate when currentTeam changes

  if (!game || !currentTeam) {
    return (
      <div className="role-assignment-page">
        <div className="loading-container">
          <div className="loading-text">טוען...</div>
        </div>
      </div>
    );
  }



  return (
    <div className="role-assignment-page" dir="rtl">
      <div className="role-assignment-container">


        {/* Role Assignment */}
        <div className="roles-card">
          <div className="card-header">
            <h2 className="card-title">חלוקת תפקידים - {currentTeam.name}</h2>
          </div>
          <div className="card-content">
            <div className="roles-grid">
              <div className="role-card">
                <div className="role-monkey">🙈</div>
                <h3 className="role-title">קוף שלא רואה</h3>
                <div className="player-name">{currentPlayers.guesser}</div>
                <p className="role-desc">מנחש את המילה</p>
              </div>
              <div className="role-card">
                <div className="role-monkey">🙉</div>
                <h3 className="role-title">קוף שלא שומע</h3>
                <div className="player-name">{currentPlayers.clueGiver}</div>
                <p className="role-desc">נותן רמזים מילוליים</p>
              </div>
              <div className="role-card">
                <div className="role-monkey">🙊</div>
                <h3 className="role-title">קופים שלא מדברים</h3>
                <div className="player-name">{currentPlayers.mime}</div>
                {currentPlayers.additionalMimes.length > 0 && (
                  <div className="additional-mimes">
                    {currentPlayers.additionalMimes.map((mime, index) => (
                      <div key={index} className="additional-mime">{mime}</div>
                    ))}
                  </div>
                )}
                <p className="role-desc">עושים פנטומימה</p>
              </div>
            </div>
          </div>
        </div>

        {/* Game Options */}
        <div className="game-options-card">
          <div className="card-header">
            <h2 className="card-title">אפשרויות משחק</h2>
          </div>
          <div className="card-content">
            <div className="options-row">
              {/* Banana Card */}
              <div className="banana-card-option">
                {!showBananaCard ? (
                  <div className="banana-unopened">
                    <div className="banana-icon">🍌</div>
                    <p className="banana-desc">קלף בננה</p>
                    <button onClick={openBananaCard} className="banana-button">
                      פתח קלף
                    </button>
                  </div>
                ) : (
                  <div className="banana-opened">
                    <div className="banana-icon">🍌</div>
                    <div className="banana-challenge">
                      <h3 className="challenge-title">אתגר:</h3>
                      <p className="challenge-text">{bananaCard.text}</p>
                    </div>
                    <button onClick={closeBananaCard} className="close-banana">
                      סגור
                    </button>
                  </div>
                )}
              </div>

              {/* Separator */}
              <div className="options-separator"></div>

              {/* Double Time */}
              <div className="double-time-option">
                <div className="double-time-container">
                  <div className="hourglass-icon">⏳</div>
                  <p className="double-time-desc">זמן כפול</p>
                  <label className="double-time-checkbox">
                    <input
                      type="checkbox"
                      checked={doubleTime}
                      onChange={(e) => setDoubleTime(e.target.checked)}
                    />
                    <span className="checkbox-text">הפעל זמן כפול</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="action-buttons">
          <button onClick={startRound} className="start-button">
            התחל סיבוב!
          </button>
          <button onClick={goHome} className="back-button">
            ← חזרה לתפריט הראשי
          </button>
        </div>
      </div>
    </div>
  );
}
