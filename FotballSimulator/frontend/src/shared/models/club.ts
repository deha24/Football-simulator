export class ClubDTO {
  constructor(
    public id: number,
    public name: string,
    public location: string,
    public found_date: string,
    public stadium_name: string,
    public stadium_capacity: number,
  ) {}
}

export class CreateClubDTO {
  constructor(
    public name: string,
    public location: string,
    public found_date: string,
    public stadium_name: string,
    public stadium_capacity: number,
  ) {}
}
