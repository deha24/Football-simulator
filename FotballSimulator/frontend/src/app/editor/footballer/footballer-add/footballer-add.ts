import { Component, Output, EventEmitter, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { formatDate } from '@angular/common';
import { SelectModule } from 'primeng/select';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { DatePickerModule } from 'primeng/datepicker';
import { CreateFootballerDTO, Footballer } from '../../../../shared/models/footballer';
import { FootballersService } from '../footballersService';
import { ClubService } from '../../club/clubService';
import { LeagueService } from '../../league/leagueService';
import { League } from '../../../../shared/models/league';
import { Club, CreateClubDTO } from '../../../../shared/models/club';

@Component({
  selector: 'footballer-add',
  imports: [ReactiveFormsModule, SelectModule, InputGroupModule, InputNumberModule, InputTextModule, FormsModule, InputGroupAddonModule, DatePickerModule],
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
    newFootballerBirthDate: new FormControl('', { validators: [Validators.required] }),
    newFootballerNationality: new FormControl('', { validators: [Validators.required] }),
    newFootballerPosition: new FormControl('', { validators: [Validators.required] }),
    newFootballerDefence: new FormControl(null, { validators: [Validators.required, Validators.min(0), Validators.max(100)] }),
    newFootballerMidfield: new FormControl(null, { validators: [Validators.required, Validators.min(0), Validators.max(100)] }),
    newFootballerAttack: new FormControl(null, { validators: [Validators.required, Validators.min(0), Validators.max(100)] }),
  });

  addNewFootballer() {
    const firstName = this.addfootballerform.value.newFootballerFirstName;
    const lastName = this.addfootballerform.value.newFootballerLastname;
    const birthDate = formatDate(this.addfootballerform.value.newFootballerBirthDate!, 'yyyy-MM-dd', 'en-US');
    const nationality = this.addfootballerform.value.newFootballerNationality;
    const position = this.addfootballerform.value.newFootballerPosition;
    const defence = this.addfootballerform.value.newFootballerDefence;
    const midfield = this.addfootballerform.value.newFootballerMidfield;
    const attack = this.addfootballerform.value.newFootballerAttack;

    if (this.addfootballerform.valid) {
      const newFootballer = new CreateFootballerDTO(firstName!, lastName!, birthDate!, nationality!, position!, defence!, midfield!, attack!);
      console.log('Dodawanie nowego piłkarza:', newFootballer);
      this.footballersService.addFootballer(newFootballer).subscribe(() => {
      this.addfootballerform.reset();
      });
    } else {
      // Handle form errors if needed
      console.error('Form is invalid');
      Object.keys(this.addfootballerform.controls).forEach(key => {
        const control = this.addfootballerform.get(key);
        // Jeśli pole jest niepoprawne, wypisz jego błędy
        if (control?.invalid) {
          console.log(`Pole o nazwie "${key}" ma błędy:`, control.errors);
        }
      });
    }
  }
}
