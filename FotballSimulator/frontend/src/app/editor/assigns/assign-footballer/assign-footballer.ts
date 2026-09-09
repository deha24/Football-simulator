import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { CardModule } from 'primeng/card';
import { ClubService } from '../../club/clubService';
import { Club } from '../../../../shared/models/club';

@Component({
  selector: 'assign-footballer',
  imports: [ReactiveFormsModule, FormsModule, CardModule, SelectModule],
  templateUrl: './assign-footballer.html',
  styleUrl: './assign-footballer.css',
})
export class AssignFootballer implements OnInit {

  clubs: Club[]= [];
  club!: Club;
  club1!: Club;
  club2!: Club;
  tmpClub!: Club;

  constructor(private clubService: ClubService, private cdr: ChangeDetectorRef){}

  ngOnInit(): void {
      this.loadClubs();
      this.club1Listener();
      this.club2Listener();
  }

  pickClub1form = new FormGroup({
    club1Id: new FormControl(null, { }),
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

  loadClub(id: number){
    this.clubService.getClubById(id).subscribe((data: Club) => {
      this.tmpClub = data;
    });
    return this.tmpClub
  }

  club1Listener(){
    this.pickClub1form.get('club1Id')?.valueChanges.subscribe(ClubId => {
      if(ClubId !== null){
        this.club1 = this.loadClub(ClubId);
      }
    });
  }

  club2Listener(){
    this.pickClub2form.get('club2Id')?.valueChanges.subscribe(ClubId => {
      if(ClubId !== null){
        this.club2 = this.loadClub(ClubId);
      }
    });
  }
}