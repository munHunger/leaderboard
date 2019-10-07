const fs = require("fs");

let history = async (_, input) => {
  return fs.promises
    .readFile("./data/history.json", "utf8")
    .then(history => JSON.parse(history))
    .then(history => {
      return fs.promises
        .readFile("./data/teams.json", "utf8")
        .then(teams => JSON.parse(teams))
        .then(teams => {
          return history.map(match => {
            match.home.team = teams.find(team => team.name === match.home.team);
            match.away.team = teams.find(team => team.name === match.away.team);
            return match;
          });
        });
    });
};

let upcomingMatches = async (_, input) => {
  return fs.promises
    .readFile("./data/teams.json", "utf8")
    .then(teams => JSON.parse(teams))
    .then(teams =>
      fs.promises
        .readFile("./data/history.json", "utf8")
        .then(history => JSON.parse(history))
        .then(history => {
          let unplayed = teams
            .map(team => {
              return {
                home: team,
                away: teams
                  .filter(other => other.name !== team.name)
                  .filter(
                    other =>
                      !history.some(match => {
                        let isInMatch = match.home.team === team.name;
                        let isOtherInMatch = match.away.team == other.name;
                        return isInMatch && isOtherInMatch;
                      })
                  )
              };
            })
            .map(match => {
              match.away =
                match.away[Math.floor(Math.random() * match.away.length)];
              return match;
            });
          return unplayed.filter(match => match.home && match.away);
        })
    );
};

let leaderboard = async (_, input) => {
  return fs.promises
    .readFile("./data/teams.json", "utf8")
    .then(teams => JSON.parse(teams))
    .then(teams =>
      fs.promises
        .readFile("./data/history.json", "utf8")
        .then(history => JSON.parse(history))
        .then(history => {
          return teams
            .map(team => {
              return {
                ...team,
                plays: history.filter(
                  match =>
                    match.home.team === team.name ||
                    match.away.team === team.name
                ).length,
                score: history
                  .filter(
                    match =>
                      match.home.team === team.name ||
                      match.away.team === team.name
                  )
                  .map(match => {
                    let homeWin = match.home.score > match.away.score;
                    let isHome = match.home.team === team.name;
                    return (homeWin && isHome) || (!homeWin && !isHome);
                  })
                  .reduce((acc, val) => {
                    if (val) acc++;
                    return acc;
                  }, 0)
              };
            })
            .sort((a, b) => b.score - a.score);
        })
    );
};
module.exports = { history, upcomingMatches, leaderboard };
