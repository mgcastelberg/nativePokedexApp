import { pokeApi } from "../config/api/pokeApi";
import type { Pokemon } from "../domain/entities/pokemon";
import type { PokeAPIPaginatedResponse, PokeAPIPokemon } from "../infraestructure/interfaces/pokeapi.interfaces";
import { PokemonMapper } from "../infraestructure/mappers/pokemon.mapper";

// Solo para simular retraso en una respuesta
export const sleep = async() => {
    return new Promise( resolve => setTimeout(resolve,2000));
}

export const getPokemons = async ( page: number, limit: number=20 ):Promise<Pokemon[]> => {

    await sleep(); //solo para pruebas intentando mostrar un retraso

    try {
        const url = `/pokemon?offset=${ page * 10 }&limit=${ limit }`;
        const { data } = await pokeApi.get<PokeAPIPaginatedResponse>(url);
        
        // data.results[0].name

        // No usar async y await por que necesitamos las 20 peticiones en paralelo
        const pokemonPromises = data.results.map( (info) => {
            return pokeApi.get<PokeAPIPokemon>(info.url);
        });

        // Esperar a que todas las promesas se terminen
        const pokeApiPokemons = await Promise.all(pokemonPromises);

        // Como trae mucha data crearemos un mapper para que filtremos solo la data necesaria
        const pokemons = pokeApiPokemons.map( (item) => PokemonMapper.pokeApiPokemonToEntity(item.data) );
        console.log(JSON.stringify( pokemons[0],null,2 ));

        // console.log(JSON.stringify(pokeApiPokemons,null,2));
        // console.log(JSON.stringify(data,null,2));

        return [];
    } catch (error) {
        throw new Error('Error getting pokemons')
    }

}