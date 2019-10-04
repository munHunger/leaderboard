import { Component, Input } from '@angular/core';
import { Team } from 'src/app/model/team.model';

@Component({
  selector: 'standing',
  templateUrl: './standing.component.html',
  styleUrls: ['./standing.component.scss']
})
export class StandingComponent {
  @Input()
  private model: Team;
}
