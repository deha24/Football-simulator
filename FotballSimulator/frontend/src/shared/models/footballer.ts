export class Footballer {
    constructor(
        public id: number,
        public first_name: string,
        public last_name: string,
        public birth_date: string,
        public nationality: string,
        public position: string,
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
        public position: string,
        public goalkeeping: number,
        public defence: number,
        public midfield: number,
        public attack: number,
    )
    {}
}
