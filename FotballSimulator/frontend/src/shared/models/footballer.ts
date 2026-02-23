export class Footballer {
    constructor(
        public id: number,
        public first_name: string,
        public last_name: string,
        public position: string,
    )
    {}
}

export class CreateFootballerDTO {
    constructor(
        public first_name: string,
        public last_name: string,
    )
    {}
}
