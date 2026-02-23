export class Club {
  constructor(
    public id: number,
    public name: string,
    public location: string,
    public founded: number,
    public stadium: string,
    public capacity: number,
    public players_id: string[]
  ) {}
}

export class CreateClubDTO {
  constructor(
    public name: string,
    public players_id: string[]
  ) {}
}
