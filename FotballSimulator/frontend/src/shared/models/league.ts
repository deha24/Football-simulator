import { Club } from "./club";

export class League {
  constructor(
    public id: number,
    public name: string,
    public country: string,
    public level: number,
    public clubs: Club[]
  ) {}
}

export class CreateLeagueDTO {
  constructor(
    public name: string,
    public country: string,
    public level: number
  ) {}
}
