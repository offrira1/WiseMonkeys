import { hebrewWords, bananaCards } from './words.js';

class GameData {
  constructor() {
    this.initializeStorage();
  }

  initializeStorage() {
    // Initialize words if not exists
    if (!localStorage.getItem('gameWords')) {
      const words = hebrewWords.map((word, index) => ({
        id: `word_${index}`,
        text: word,
        difficulty: 'easy',
        is_active: true
      }));
      localStorage.setItem('gameWords', JSON.stringify(words));
    }

    // Initialize banana cards if not exists
    if (!localStorage.getItem('bananaCards')) {
      const cards = bananaCards.map((card, index) => ({
        id: `card_${index}`,
        text: card,
        is_active: true
      }));
      localStorage.setItem('bananaCards', JSON.stringify(cards));
    }

    // Initialize game settings if not exists
    if (!localStorage.getItem('gameSettings')) {
      const settings = {
        instructions: "שלושת הקופים - משחק מהנה למשפחה וחברים!\n\nאיך משחקים?\n1. כל קבוצה צריכה 3 שחקנים לפחות\n2. כל שחקן מקבל תפקיד: קוף שלא רואה, קוף שלא שומע, או קוף שלא מדבר\n3. הקוף שלא מדבר עושה פנטומימה\n4. הקוף שלא שומע נותן רמזים מילוליים\n5. הקוף שלא רואה מנחש את המילה\n6. יש לכם זמן מוגבל לנחש כמה שיותר מילים\n\nניקוד:\n• ניחוש נכון = +1 נקודה\n• דילוג על מילה = -1 נקודה\n• הקבוצה עם הניקוד הגבוה ביותר מנצחת!",
        cardBackground: null,
        defaultTimer: 60
      };
      localStorage.setItem('gameSettings', JSON.stringify(settings));
    }
  }

  // Words management
  getWords() {
    return JSON.parse(localStorage.getItem('gameWords') || '[]');
  }

  updateWords(words) {
    localStorage.setItem('gameWords', JSON.stringify(words));
  }

  // Banana cards management
  getBananaCards() {
    return JSON.parse(localStorage.getItem('bananaCards') || '[]');
  }

  updateBananaCards(cards) {
    localStorage.setItem('bananaCards', JSON.stringify(cards));
  }

  // Game settings management
  getSettings() {
    return JSON.parse(localStorage.getItem('gameSettings') || '{}');
  }

  updateSettings(settings) {
    localStorage.setItem('gameSettings', JSON.stringify(settings));
  }

  // Teams management
  getTeams() {
    return JSON.parse(localStorage.getItem('gameTeams') || '[]');
  }

  updateTeams(teams) {
    localStorage.setItem('gameTeams', JSON.stringify(teams));
  }

  // Active games management
  getActiveGames() {
    return JSON.parse(localStorage.getItem('activeGames') || '[]');
  }

  saveActiveGame(game) {
    const games = this.getActiveGames();
    const existingIndex = games.findIndex(g => g.id === game.id);
    if (existingIndex >= 0) {
      games[existingIndex] = game;
    } else {
      games.push(game);
    }
    localStorage.setItem('activeGames', JSON.stringify(games));
  }

  getActiveGame(gameId) {
    const games = this.getActiveGames();
    return games.find(g => g.id === gameId);
  }

  deleteActiveGame(gameId) {
    const games = this.getActiveGames();
    const filtered = games.filter(g => g.id !== gameId);
    localStorage.setItem('activeGames', JSON.stringify(filtered));
  }
}

export default new GameData();
