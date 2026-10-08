import { ClubDTO } from "./club";

export class LeagueDTO {
  constructor(
    public id: number,
    public name: string,
    public country: string,
    public level: number,
    public clubs: ClubDTO[]
  ) {}
}

export class CreateLeagueDTO {
  constructor(
    public name: string,
    public country: string,
    public level: number
  ) {}
}
