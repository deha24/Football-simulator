import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { CardModule } from 'primeng/card';
import { EventService } from '../../../../shared/services/EventServices';
import { FootballersInClub } from './footballers-in-club/footballers-in-club';
import { ClubService } from '../../club/clubService';
import { Club } from '../../../../shared/models/club';

@Component({
  selector: 'assign-footballer',
  imports: [ReactiveFormsModule, FormsModule, CardModule, SelectModule, FootballersInClub],
  templateUrl: './assign-footballer.html',
  styleUrl: './assign-footballer.css',
})
export class AssignFootballer implements OnInit {

  clubs: Club[]= [];
  club: Club | undefined;
  club1: Club | undefined;
  club2: Club | undefined;
  tmpClub: Club | undefined;

  constructor(private clubService: ClubService, private cdr: ChangeDetectorRef, private eventService: EventService){}

  ngOnInit(): void {
      this.loadClubs();
      this.club1Listener();
      this.club2Listener();
  }

  pickClub1form = new FormGroup({
    club1Id: new FormControl(2, { }),
  });

  pickClub2form = new FormGroup({
    club2Id: new FormControl(2, { }),
  });

  loadClubs() {
    this.clubService.getClubs().subscribe((data) => {
      this.clubs = data;
      this.cdr.detectChanges();
    });
  }

  club1Listener(){
    this.pickClub1form.get('club1Id')?.valueChanges.subscribe(clubId => {
      if(clubId !== null){
        this.clubService.getClubById(clubId).subscribe((data: Club) => {
          this.club1 = data;
        });
      }
    });
  }

  club2Listener(){
    this.pickClub2form.get('club2Id')?.valueChanges.subscribe(clubId => {
      if(clubId !== null){
        this.clubService.getClubById(clubId).subscribe((data: Club) => {
          this.club2 = data;
        });
      }
    });
  }
}