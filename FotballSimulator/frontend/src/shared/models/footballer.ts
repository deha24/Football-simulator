export class Footballer {
    constructor(
        public id: number,
        public first_name: string,
        public last_name: string,
        public birth_date: string,
        public nationality: string,
        public position: FootballerPositionsDTO,
        public goalkeeping: number,
        public defence: number,
        public midfield: number,
        public attack: number,
    )
    {}
}

export class CreateFootballerDTO {
    constructor(
        public first_name: string,
        public last_name: string,
        public birth_date: string,
        public nationality: string,
        public position: FootballerPositionsDTO,
        public goalkeeping: number,
        public defence: number,
        public midfield: number,
        public attack: number,
    )
    {}
}

export class FootballerPositionsDTO {
    constructor(
        public gk: number,
        public lb: number,
        public cb: number,
        public rb: number,
        public lwb: number,
        public cdm: number,
        public rwb: number,
        public lm: number,
        public cm: number,
        public rm: number,
        public lw: number,
        public cam: number,
        public rw: number,
        public st: number
    )
    {}
}
