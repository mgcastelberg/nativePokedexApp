import { pokeApi } from "../config/api/pokeApi";
import { Pokemon } from "../domain/entities/pokemon";

// Solo para simular retraso en una respuesta
export const sleep = async() => {
    return new Promise( resolve => setTimeout(resolve,2000));
}

export const getPokemons = async ():Promise<Pokemon[]> => {

    await sleep(); //solo para pruebas intentando mostrar un retraso

    try {
        const url = '/pokemon';
        const { data } = await pokeApi.get(url);

        console.log(JSON.stringify(data,null,2));

        return [];
    } catch (error) {
        throw new Error('Error getting pokemons')
    }

}