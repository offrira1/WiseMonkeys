// Game entity class
class Game {
  constructor(data = {}) {
    this.id = data.id || this.generateId();
    this.name = data.name || "משחק חדש";
    this.timer_duration = data.timer_duration || 60;
    this.used_words = data.used_words || [];
    this.card_background = data.card_background || null;
    this.created_at = data.created_at || new Date().toISOString();
    this.is_active = data.is_active !== undefined ? data.is_active : true;
    this.current_round = data.current_round || 1;
    this.max_rounds = data.max_rounds || 30;
    this.is_finished = data.is_finished || false;
    this.round_history = data.round_history || [];
  }

  generateId() {
    return 'game_' + Math.random().toString(36).substr(2, 9);
  }

  static async create(data) {
    const game = new Game(data);
    const gameData = (await import('../data/GameData.js')).default;
    gameData.saveActiveGame(game);
    return game;
  }

  static async get(id) {
    const gameData = (await import('../data/GameData.js')).default;
    const rawGame = gameData.getActiveGame(id);
    if (rawGame) {
      // Create a proper Game instance with methods
      return new Game(rawGame);
    }
    return null;
  }

  static async update(id, data) {
    const gameData = (await import('../data/GameData.js')).default;
    const rawGame = gameData.getActiveGame(id);
    if (rawGame) {
      Object.assign(rawGame, data);
      gameData.saveActiveGame(rawGame);
      // Return a proper Game instance with methods
      return new Game(rawGame);
    }
    return null;
  }

  static async filter(criteria = {}) {
    const gameData = (await import('../data/GameData.js')).default;
    const games = gameData.getActiveGames();
    return games.filter(game => {
      return Object.entries(criteria).every(([key, value]) => {
        return game[key] === value;
      });
    });
  }

  addRoundResult(teamId, teamName, score, correctGuesses, skips) {
    this.round_history.push({
      round: this.current_round,
      teamId,
      teamName,
      score,
      correctGuesses,
      skips,
      timestamp: new Date().toISOString()
    });
  }

  canContinue() {
    return this.current_round < this.max_rounds && !this.is_finished;
  }

  finishGame() {
    this.is_finished = true;
  }
}

export default Game;
