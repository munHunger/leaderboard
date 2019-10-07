import { Outcome } from './outcome.model';

export class Team {
    avatar: string = "";
    name: string;
    owner: string;
    wins: Outcome[];
    losses: Outcome[];
    score: number;
    plays: number;
}