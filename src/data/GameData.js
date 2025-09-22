import { hebrewWords, engWords, hebrewBananaCards, englishBananaCards } from './words.js';

class GameData {
  constructor() {
    this.initializeStorage();
  }

  migrateOldData() {
    // Check if old gameWords exists and migrate to new structure
    const oldWords = localStorage.getItem('gameWords');
    if (oldWords && !localStorage.getItem('hebrewWords')) {
      try {
        const words = JSON.parse(oldWords);
        const hebrewWords = words.map((word, index) => ({
          ...word,
          id: `hebrew_word_${index}`,
          language: 'hebrew'
        }));
        localStorage.setItem('hebrewWords', JSON.stringify(hebrewWords));
        // Remove old data
        localStorage.removeItem('gameWords');
      } catch (error) {
        console.error('Error migrating old words data:', error);
      }
    }

    // Check if old bananaCards exists and migrate to new structure
    const oldBananaCards = localStorage.getItem('bananaCards');
    if (oldBananaCards && !localStorage.getItem('hebrewBananaCards')) {
      try {
        const cards = JSON.parse(oldBananaCards);
        const hebrewCards = cards.map((card, index) => ({
          ...card,
          id: `hebrew_card_${index}`,
          language: 'hebrew'
        }));
        localStorage.setItem('hebrewBananaCards', JSON.stringify(hebrewCards));
        // Remove old data
        localStorage.removeItem('bananaCards');
      } catch (error) {
        console.error('Error migrating old banana cards data:', error);
      }
    }
  }

  initializeStorage() {
    // Migrate old data if exists
    this.migrateOldData();

    // Initialize Hebrew words if not exists
    if (!localStorage.getItem('hebrewWords')) {
      const words = hebrewWords.map((word, index) => ({
        id: `hebrew_word_${index}`,
        text: word,
        difficulty: 'easy',
        is_active: true,
        language: 'hebrew'
      }));
      localStorage.setItem('hebrewWords', JSON.stringify(words));
    }

    // Initialize English words if not exists
    if (!localStorage.getItem('englishWords')) {
      const words = engWords.map((word, index) => ({
        id: `english_word_${index}`,
        text: word,
        difficulty: 'easy',
        is_active: true,
        language: 'english'
      }));
      localStorage.setItem('englishWords', JSON.stringify(words));
    }

    // Initialize Hebrew banana cards if not exists
    if (!localStorage.getItem('hebrewBananaCards')) {
      const cards = hebrewBananaCards.map((card, index) => ({
        id: `hebrew_card_${index}`,
        text: card,
        is_active: true,
        language: 'hebrew'
      }));
      localStorage.setItem('hebrewBananaCards', JSON.stringify(cards));
    }

    // Initialize English banana cards if not exists
    if (!localStorage.getItem('englishBananaCards')) {
      const cards = englishBananaCards.map((card, index) => ({
        id: `english_card_${index}`,
        text: card,
        is_active: true,
        language: 'english'
      }));
      localStorage.setItem('englishBananaCards', JSON.stringify(cards));
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
  getWords(language = 'hebrew') {
    const key = language === 'hebrew' ? 'hebrewWords' : 'englishWords';
    return JSON.parse(localStorage.getItem(key) || '[]');
  }

  updateWords(words, language = 'hebrew') {
    const key = language === 'hebrew' ? 'hebrewWords' : 'englishWords';
    localStorage.setItem(key, JSON.stringify(words));
  }

  // Banana cards management
  getBananaCards(language = 'hebrew') {
    const key = language === 'hebrew' ? 'hebrewBananaCards' : 'englishBananaCards';
    return JSON.parse(localStorage.getItem(key) || '[]');
  }

  updateBananaCards(cards, language = 'hebrew') {
    const key = language === 'hebrew' ? 'hebrewBananaCards' : 'englishBananaCards';
    localStorage.setItem(key, JSON.stringify(cards));
  }

  // Force refresh words for current language
  refreshWordsForLanguage(language = 'hebrew') {
    const words = language === 'hebrew' ? hebrewWords : engWords;
    const wordData = words.map((word, index) => ({
      id: `${language}_word_${index}`,
      text: word,
      difficulty: 'easy',
      is_active: true,
      language: language
    }));
    this.updateWords(wordData, language);
  }

  // Debug method to check current words
  debugCurrentWords(language = 'hebrew') {
    const words = this.getWords(language);
    console.log(`Current ${language} words:`, words.slice(0, 5)); // Show first 5 words
    return words;
  }

  // Clear all word data and reinitialize
  clearAllWordData() {
    localStorage.removeItem('hebrewWords');
    localStorage.removeItem('englishWords');
    localStorage.removeItem('hebrewBananaCards');
    localStorage.removeItem('englishBananaCards');
    localStorage.removeItem('gameWords'); // Remove old data if exists
    localStorage.removeItem('bananaCards'); // Remove old data if exists
    this.initializeStorage();
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
