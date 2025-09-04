// Mock Team entity class
class Team {
  constructor(data = {}) {
    this.id = data.id || this.generateId();
    this.name = data.name || "";
    this.players = data.players || [];
    this.score = data.score || 0;
    this.game_id = data.game_id || "";
    this.current_player_index = data.current_player_index || 0;
  }

  generateId() {
    return 'team_' + Math.random().toString(36).substr(2, 9);
  }

  static async create(data) {
    const team = new Team(data);
    const gameData = (await import('../data/GameData.js')).default;
    const teams = gameData.getTeams();
    teams.push(team);
    gameData.updateTeams(teams);
    return team;
  }

  static async get(id) {
    const gameData = (await import('../data/GameData.js')).default;
    const teams = gameData.getTeams();
    return teams.find(team => team.id === id) || null;
  }

  static async update(id, data) {
    const gameData = (await import('../data/GameData.js')).default;
    const teams = gameData.getTeams();
    const index = teams.findIndex(team => team.id === id);
    if (index >= 0) {
      Object.assign(teams[index], data);
      gameData.updateTeams(teams);
      return teams[index];
    }
    return null;
  }

  static async filter(criteria = {}) {
    const gameData = (await import('../data/GameData.js')).default;
    const teams = gameData.getTeams();
    return teams.filter(team => {
      return Object.entries(criteria).every(([key, value]) => {
        return team[key] === value;
      });
    });
  }
}

export default Team;
