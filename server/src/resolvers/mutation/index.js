const fs = require("fs");
const { pubsub } = require("../../subscriptions");
const query = require("../query");

/**
 * Update the entire settings object
 * @param {*} input the graphql input
 */
const enterScore = async (_, input) => {
  return fs.promises
    .readFile("./data/history.json", "utf8")
    .then(data => JSON.parse(data))
    .then(data => {
      data.push(input.match);
      fs.promises.writeFile(
        "./data/history.json",
        JSON.stringify(data, null, 2)
      );
      query
        .history()
        .then(history =>
          pubsub.publish("historyChange", { historyChange: history })
        );
      query
        .leaderboard()
        .then(leaderboard =>
          pubsub.publish("leaderboardChange", { historyChange: leaderboard })
        );
      query
        .upcomingMatches()
        .then(upcoming =>
          pubsub.publish("upcomingChange", { historyChange: upcoming })
        );

      return [input.match];
    });
};

module.exports = { enterScore };
