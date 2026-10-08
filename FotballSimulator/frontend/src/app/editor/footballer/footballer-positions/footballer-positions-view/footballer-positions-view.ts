import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelModule } from 'primeng/panel';
import { FootballerPositionsDTO } from '../../../../../shared/models/footballer';

@Component({
  selector: 'footballer-positions-view',
  imports: [PanelModule, CommonModule],
  templateUrl: './footballer-positions-view.html',
  styleUrl: './footballer-positions-view.css',
})
export class FootballerPositionsView {

  @Input() footballerPositions!: FootballerPositionsDTO;

  getPositionStyles(rating: number): any {
    
    const numRating = Number(rating);
    const clampedRating = Math.max(0, Math.min(10, numRating));
    const hue = clampedRating * 12;
    const backgroundColor = `hsla(${hue}, 65%, 70%, 0.8)`;

    return { 
      'background-color': backgroundColor, 
      'color': '#1f2937', // Ciemnoszary, łagodniejszy niż czysta czerń
      'border-color': `hsla(${hue}, 65%, 60%, 0.5)`, // Subtelnie dopasowana ramka
      'transition': 'background-color 0.5s ease, border-color 0.5s ease, color 0.5s ease' 
    }; 
  }
}
