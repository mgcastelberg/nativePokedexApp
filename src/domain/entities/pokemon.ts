
export interface Pokemon {
    id: number;
    name: string;
    types: string[];
    avatar: string;
    sprites: string[];

    // toDo: parte de la entidad
    color: string;

    games: string[];
    abilities: string[];
    stats: Stat[];
    moves: Move[];
}

export interface Stat {
    name: string;
    value: number;
}

export interface Move {
    name: string;
    level: number;
}