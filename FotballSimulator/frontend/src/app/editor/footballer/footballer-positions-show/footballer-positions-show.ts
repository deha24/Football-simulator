import { Component, Input } from '@angular/core';
import { PanelModule } from 'primeng/panel';
import { FootballerPositionsDTO } from '../../../../shared/models/footballer';

@Component({
  selector: 'footballer-positions-show',
  imports: [PanelModule],
  templateUrl: './footballer-positions-show.html',
  styleUrl: './footballer-positions-show.css',
})
export class FootballerPositionsShow {

  @Input() footballerPositions!: FootballerPositionsDTO;
}
