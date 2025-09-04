export const createPageUrl = (pageName) => {
  const routes = {
    Home: "/",
    NewGame: "/new-game",
    Instructions: "/instructions",
    RoleAssignment: "/role-assignment",
    GameRound: "/game-round",
    RoundSummary: "/round-summary",
    GameSummary: "/game-summary"
  };
  
  return routes[pageName] || "/";
};
