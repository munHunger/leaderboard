import { Component, Input } from '@angular/core';
import { Team } from 'src/app/model/team.model';

@Component({
  selector: 'pill',
  templateUrl: './pill.component.html',
  styleUrls: ['./pill.component.scss']
})
export class PillComponent {
    @Input()
    private model: Team;
}
