
import { FlatList, View } from 'react-native'
import { globalTheme } from '../../../config/theme/global-theme'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { ActivityIndicator, Text, TextInput } from 'react-native-paper';
import { Pokemon } from '../../../domain/entities/pokemon';
import { PokemonCard } from '../../components/pokemons/PokemonCard';
import { getPokemonNamesWithId, getPokemonsByIds } from '../../../actions';
import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { FullScreenLoader } from '../../components/ui/FullScreenLoader';
import { useDebouncedValue } from '../../hooks/useDebouncedValue';

export const SearchScreen = () => {

    const { top } = useSafeAreaInsets();

    const { isLoading, data: pokemonNameList  = []} = useQuery({
        queryKey:['pokemons','all'],
        queryFn: () => getPokemonNamesWithId()
    })

    // console.log(pokemonNameList);

    const [term, setTerm] = useState('');

    // toDO: Aplicar debounce
    const debouncedValue = useDebouncedValue(term);

    const pokemonNameIdList = useMemo( () => {
        // Es un número
        if ( !isNaN(Number(debouncedValue)) ) {
            const pokemon = pokemonNameList.find( pokemon => pokemon.id === Number(debouncedValue) );
            return pokemon ? [pokemon] : [];
        }

        if (debouncedValue.length === 0) return [];

        if( debouncedValue.length < 3 ) return [];

        return pokemonNameList.filter( pokemon =>
            pokemon.name.toLocaleLowerCase().includes(debouncedValue.toLocaleLowerCase())
        );

    },[debouncedValue])

    // UseQuery para los pokeIds
    const { isLoading: isloadingPokemos, data: pokemons = [] } = useQuery({
        queryKey: ['pokemons', 'by', pokemonNameIdList],
        queryFn: () => getPokemonsByIds( pokemonNameIdList.map( pokemon => pokemon.id ) ),
        staleTime: 1000 * 60 * 5 // 5 mins
    })

    if ( isLoading ) {
        return (<FullScreenLoader/>);
    }

    return (
        <View style={[ globalTheme.globalMargin, { paddingTop: top + 10 }]}>
            <TextInput 
                placeholder='Buscar Pokemon'
                mode="flat"
                autoFocus
                autoCorrect={false}
                onChangeText={ setTerm }
                value={term}
            />

            {isloadingPokemos && <ActivityIndicator style={{ paddingTop:20 }}/>}

            {/* <Text>{ JSON.stringify( pokemonNameIdList,null,2) }</Text> */}

            <FlatList
                data={ pokemons }
                keyExtractor={ (pokemon, index) => `${pokemon.id}-${index}`}
                numColumns={ 2 }
                style={{ paddingTop: top + 20 }}
                renderItem={ ({item}) => <PokemonCard pokemon={ item }/> }
                showsVerticalScrollIndicator={false} //quita la barra scoll Vertical
                ListFooterComponent={ <View style={{ height:120 }} />}
            />

        </View>
    )
}