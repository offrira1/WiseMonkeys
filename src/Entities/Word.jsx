// Word entity class
class Word {
  constructor(data = {}) {
    this.id = data.id || this.generateId();
    this.text = data.text || "";
    this.difficulty = data.difficulty || "easy";
    this.is_active = data.is_active !== undefined ? data.is_active : true;
  }

  generateId() {
    return 'word_' + Math.random().toString(36).substr(2, 9);
  }

  static async create(data) {
    const word = new Word(data);
    const gameData = (await import('../data/GameData.js')).default;
    const language = localStorage.getItem('language') || 'hebrew';
    const words = gameData.getWords(language);
    words.push(word);
    gameData.updateWords(words, language);
    return word;
  }

  static async get(id) {
    const gameData = (await import('../data/GameData.js')).default;
    const language = localStorage.getItem('language') || 'hebrew';
    const words = gameData.getWords(language);
    return words.find(w => w.id === id) || null;
  }

  static async update(id, data) {
    const gameData = (await import('../data/GameData.js')).default;
    const language = localStorage.getItem('language') || 'hebrew';
    const words = gameData.getWords(language);
    const index = words.findIndex(w => w.id === id);
    if (index >= 0) {
      Object.assign(words[index], data);
      gameData.updateWords(words, language);
      return words[index];
    }
    return null;
  }

  static async filter(criteria = {}) {
    const gameData = (await import('../data/GameData.js')).default;
    // Get current language from localStorage or default to Hebrew
    const language = localStorage.getItem('language') || 'hebrew';
    const words = gameData.getWords(language);
    return words.filter(word => {
      return Object.entries(criteria).every(([key, value]) => {
        return word[key] === value;
      });
    });
  }
}

export default Word;
