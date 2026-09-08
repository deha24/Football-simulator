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
        public cb1: boolean,
        public cb2: boolean,
        public cb3: boolean,
        public rb: boolean,
        public lwb: boolean,
        public cdm1: boolean,
        public cdm2: boolean,
        public cdm3: boolean,
        public rwb: boolean,
        public lm: boolean,
        public cm1: boolean,
        public cm2: boolean,
        public cm3: boolean,
        public rm: boolean,
        public lw: boolean,
        public cam1: boolean,
        public cam2: boolean,
        public cam3: boolean,
        public rw: boolean,
        public st1: boolean,
        public st2: boolean,
        public st3: boolean
    ) {}
}