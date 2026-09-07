export class Coach{
    constructor(
        public id: number,
        public first_name: string,
        public last_name: string,
        public birth_date: string,
        public nationality: string,
        public lineup: CoachLineupDTO,
        public defence: number,
        public midfield: number,
        public attack: number,
        public midfield_style: string,
        public balance_style: string,
    ) {}
}

export class CreateCoachDTO{
    constructor(
        public first_name: string,
        public last_name: string,
        public birth_date: string,
        public nationality: string,
        public lineup: CoachLineupDTO,
        public defence: number,
        public midfield: number,
        public attack: number,
        public midfield_style: string,
        public balance_style: string,
    ) {}
}

export class CoachLineupDTO{
    constructor(
        public gk: boolean,
        public lb: boolean,
        public cb: boolean,
        public rb: boolean,
        public lwb: boolean,
        public cdm: boolean,
        public rwb: boolean,
        public lm: boolean,
        public cm: boolean,
        public rm: boolean,
        public lw: boolean,
        public cam: boolean,
        public rw: boolean,
        public st: boolean
    ) {}
}