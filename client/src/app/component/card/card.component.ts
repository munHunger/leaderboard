import { Component, Input } from '@angular/core';
import { Team } from 'src/app/model/team.model';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input()
  private large: boolean;

  @Input()
  private small: boolean;

  @Input()
  private model: Team;
}
