import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Club } from '../../../../../../shared/models/club';
import { ClubService } from '../../../clubService';
import { ActivatedRoute } from '@angular/router';


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
    this.clubsService.getClubById(parseInt(id)).subscribe((data: any) => {
      this.club = data[parseInt(id)-1];
      this.cdr.detectChanges();
    });
  }
}
