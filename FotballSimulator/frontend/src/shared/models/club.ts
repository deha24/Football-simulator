export class Club {
  constructor(
    public id: number,
    public name: string,
    public location: string,
    public foundDate: string,
    public stadium: string,
    public capacity: number,
  ) {}
}

export class CreateClubDTO {
  constructor(
    public name: string,
    public location: string,
    public foundDate: string,
    public stadium: string,
    public capacity: number,
  ) {}
}
