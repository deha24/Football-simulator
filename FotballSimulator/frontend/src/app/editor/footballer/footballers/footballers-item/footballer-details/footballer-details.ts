import { Component, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FootballersService } from '../../../footballersService';
import { FootballerPositionsView } from '../../../footballer-positions/footballer-positions-view/footballer-positions-view';
import { FootballerDetailsDTO, FootballerPositionsDTO } from '../../../../../../shared/models/footballer';

@Component({
  selector: 'app-footballer-details',
  imports: [FootballerPositionsView],
  templateUrl: './footballer-details.html',
  styleUrl: './footballer-details.css'
})
export class FootballerDetails {

  footballer!: FootballerDetailsDTO;
  footballerPositions!: FootballerPositionsDTO;

  constructor(private footballersService: FootballersService, private route: ActivatedRoute, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.footballersService.getFootballerById(parseInt(id)).subscribe((data: FootballerDetailsDTO) => {
      this.footballer = data;
      this.footballerPositions = data.positions;
      this.cdr.detectChanges();
    });
  }
}
