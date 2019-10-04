import { Component, OnInit } from '@angular/core';
import { LeaderService } from '../service/leader.service';
import { Team } from '../model/team.model';
import { Game } from '../model/game.model';
import { Outcome } from '../model/outcome.model';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private leaders: Team[];
  private schedule: Game[];
  private showResultDialog: boolean = false;

  private selectedGame: Game;

  constructor(private service: LeaderService, private apollo: Apollo) {
    //service.getLeaders().subscribe(leaders => this.leaders = leaders);
    //this.schedule = service.getSchedule();
  }
  
  ngOnInit() {
    this.update()
  }

  update() {
    this.apollo
    .watchQuery({
      query: gql`
query{
leaderboard{
  name
  owner
  avatar
}
}
      `,
    })
    .valueChanges.subscribe(result => {
      console.log(result)
      console.log(this.leaders);
      this.leaders = result.data.leaderboard as Team[]
    });

  this.apollo
  .watchQuery({
    query: gql`
query{
upcomingMatches{
  home {
    name
    owner
    avatar
  }
  away {
    name
    owner
    avatar
  }
}
}
    `,
  })
  .valueChanges.subscribe(result => {
    this.schedule = result.data.upcomingMatches as Game[]
  });
  }

  private openResultDialog(game: Game) {
    this.showResultDialog = true;
    this.selectedGame = game;
  }

  private settleResult() {
    this.showResultDialog = false;
    this.apollo.mutate({
      mutation:gql`
mutation EnterScore($homeName: String!, $homeScore: Int!, $awayName: String!, $awayScore: Int!){
  enterScore(match: {
    home: {
      team: $homeName
      score: $homeScore
    },
    away: {
      team: $awayName
      score: $awayScore
    }
  }){
    home {
      team {
        name
      }
    }
  }
}
            `,
            variables: {
              homeName: this.selectedGame.home.name,
              homeScore: this.selectedGame.home.score,
              awayName: this.selectedGame.away.name,
              awayScore: this.selectedGame.away.score
            }
    }).subscribe(() => 
    this.update());
  }
}
