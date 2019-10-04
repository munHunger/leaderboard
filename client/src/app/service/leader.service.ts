import { Injectable } from "@angular/core";
import { Team } from "../model/team.model";
import { Game } from "../model/game.model";
import { SubscriptionClient } from "subscriptions-transport-ws";
import { gql } from "apollo-boost";
import { WebSocketLink } from "apollo-link-ws";

export const wsClient = new SubscriptionClient("ws://localhost:5001/graphql", {
  reconnect: true
});

export const client = new WebSocketLink(wsClient);
@Injectable()
export class LeaderService {

  public getLeaders() {
    return wsClient.request({
      query: gql`
query{
  leaderboard{
    name
    owner
    avatar
  }
}
      `
    })
  }

  public getSchedule(): Game[] {
    return [
      {
        home: {
          name: "Schrödinger wildcats",
          avatar: "",
          owner: "Peter",
          wins: [],
          losses: []
        },
        away: {
          name: "Nacka Crushers",
          avatar: "",
          owner: "Dan",
          wins: [],
          losses: []
        }
      },
      {
        home: {
          name: "Band aid warrior",
          avatar: "",
          owner: "Fredrik",
          wins: [],
          losses: []
        },
        away: {
          name: "mcTeam face",
          avatar: "",
          owner: "Tommy",
          wins: [],
          losses: []
        }
      },
      {
        home: {
          name: "Ruskis",
          avatar: "",
          owner: "Marcus",
          wins: [],
          losses: []
        },
        away: {
          name: "Nacka Crushers",
          avatar: "",
          owner: "Dan",
          wins: [],
          losses: []
        }
      }
    ];
  }
}
