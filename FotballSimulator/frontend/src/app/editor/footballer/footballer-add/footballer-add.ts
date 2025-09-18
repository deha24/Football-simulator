import { Component, Output, EventEmitter, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Footballer } from '../../../../shared/models/footballer';
import { FootballersService } from '../footballersService';
import { ClubService } from '../../club/clubService';
import { LeagueService } from '../../league/leagueService';
import { League } from '../../../../shared/models/league';
import { Club } from '../../../../shared/models/club';

@Component({
  selector: 'footballer-add',
  imports: [ReactiveFormsModule],
  templateUrl: './footballer-add.html',
  styleUrl: './footballer-add.css'
})
export class FootballerAdd  implements OnInit {

  @Output() addFootballer = new EventEmitter<Footballer>();

  leagues: League[] = [];
  clubs: Club[] = [];

  constructor(private footballersService: FootballersService,private ClubService: ClubService, private leagueService: LeagueService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.leagueService.getLeagues().subscribe((leagues) => {
      this.leagues = leagues;
      this.cdr.detectChanges();
    });
  }

  addfootballerform = new FormGroup({
    newFootballerFirstName: new FormControl('', { validators: [Validators.required] }),
    newFootballerLastname: new FormControl('', { validators: [Validators.required] }),
    newFootballerLeague: new FormControl('', { validators: [Validators.required] }),
  });

  addNewFootballer() {
    const firstName = this.addfootballerform.value.newFootballerFirstName;
    const lastName = this.addfootballerform.value.newFootballerLastname;

    if (this.addfootballerform.valid) {
      const newFootballer = new Footballer(6,firstName!, lastName!, "cam");
      this.footballersService.addFootballer(newFootballer).subscribe(() => {
      this.addFootballer.emit(newFootballer);
      this.addfootballerform.reset();
      });
    } else {
      // Handle form errors if needed
      console.error('Form is invalid');
    }
  }
}
