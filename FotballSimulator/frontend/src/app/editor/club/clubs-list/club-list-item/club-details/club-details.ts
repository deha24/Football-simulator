import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClubService } from '../../../clubService';
import { Club } from '../../../../../../shared/models/club';

@Component({
  selector: 'club-details',
  imports: [],
  templateUrl: './club-details.html',
  styleUrl: './club-details.css'
})

export class ClubDetails implements OnInit {

  club!: Club;

  constructor(private clubsService: ClubService, private route: ActivatedRoute, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.loadClub(parseInt(id));
  }

  loadClub(id: number){
    this.clubsService.getClubById(id).subscribe((data: any) => {
      this.club = data;
      this.cdr.detectChanges();
    });
  }
}
