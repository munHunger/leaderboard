const { pubsub } = require("../../subscriptions");

const historyChange = {
  subscribe: () => {
    return pubsub.asyncIterator("historyChange");
  }
};
const leaderboardChange = {
  subscribe: () => {
    return pubsub.asyncIterator("leaderboardChange");
  }
};
const upcomingChange = {
  subscribe: () => {
    return pubsub.asyncIterator("upcomingChange");
  }
};
module.exports = { historyChange, leaderboardChange, upcomingChange };