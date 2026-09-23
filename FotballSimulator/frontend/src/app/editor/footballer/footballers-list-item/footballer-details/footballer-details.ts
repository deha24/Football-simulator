import { Component, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FootballersService } from '../../footballersService';
import { FootballerPositionsShow } from '../../footballer-positions-show/footballer-positions-show';
import { Footballer, FootballerPositionsDTO } from '../../../../../shared/models/footballer';

@Component({
  selector: 'app-footballer-details',
  imports: [FootballerPositionsShow],
  templateUrl: './footballer-details.html',
  styleUrl: './footballer-details.css'
})
export class FootballerDetails {

  footballer!: Footballer;
  footballerPositions!: FootballerPositionsDTO;

  constructor(private footballersService: FootballersService, private route: ActivatedRoute, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.footballersService.getFootballerById(parseInt(id)).subscribe((data: any) => {
      console.log('Footballer data:', data);
      this.footballer = data;
      this.footballerPositions = data.position;
      this.cdr.detectChanges();
    });
  }
}
