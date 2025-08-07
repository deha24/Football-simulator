import { Component } from '@angular/core';
import { Footballer } from '../../../../../shared/models/footballer';
import { FootballersService } from '../../footballersService';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-footballer-details',
  imports: [],
  templateUrl: './footballer-details.html',
  styleUrl: './footballer-details.css'
})
export class FootballerDetails {

  footballer!: Footballer;

  constructor(private footballersService: FootballersService, private route: ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.footballersService.getFootballerById(parseInt(id)).subscribe((data: any) => {
      this.footballer = data[parseInt(id)-1];
    });
  }
}
