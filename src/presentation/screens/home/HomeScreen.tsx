
import { StyleSheet, View } from 'react-native'
import { ActivityIndicator, Text } from 'react-native-paper'
import { getPokemons } from '../../../actions'
import { useInfiniteQuery, useQuery, QueryClient, useQueryClient } from '@tanstack/react-query';
import { PokeballBg } from '../../components/ui/PokeballBg'
import { FlatList } from 'react-native-gesture-handler'
import { globalTheme } from '../../../config/theme/global-theme'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { PokemonCard } from '../../components/pokemons/PokemonCard'

export const HomeScreen = () => {

    const { top } = useSafeAreaInsets();
    const queryClient = useQueryClient(); //cargar la cache de antemano

    // Hook Poderoso StakTankQuery - Forma tradicional http
    // const { isLoading, data: pokemons = [] } = useQuery({
    //     queryKey:['pokemons'],
    //     queryFn: () => getPokemons(0),
    //     staleTime: 1000 * 60 * 10, // 60 minutos considerada como fresca 
    // });

    // fetchNextPage: nos permite llamar la siguiente data

    const { isLoading, data, fetchNextPage } = useInfiniteQuery({
        queryKey:['pokemons', 'infinite'],
        initialPageParam: 0,
        staleTime: 1000 * 60 * 60, // 60 minutos considerada como fresca 
        queryFn: async( params ) => {
            const pokemons = await getPokemons(params.pageParam); 
            pokemons.forEach( pokemon => {
                queryClient.setQueryData( ['pokemon', pokemon.id] , pokemon );
            });
            return pokemons;
        },
        getNextPageParam: ( lastPage, pages ) => pages.length,
    });
    
    return (
        <View style={ globalTheme.globalMargin }>
            <PokeballBg style={ styles.imgPosition }/>
            <FlatList
                data={ data?.pages.flat() ?? [] }
                keyExtractor={ (pokemon, index) => `${pokemon.id}-${index}`}
                numColumns={ 2 }
                style={{ paddingTop: top + 20 }}
                ListHeaderComponent={ () => (
                    <Text variant='displayMedium'>Pokedex</Text>
                )}
                renderItem={ ({item}) => <PokemonCard pokemon={ item }/> }
                onEndReachedThreshold={ 0.6 } // 60% de scroll para hacer infiniteScroll
                onEndReached={ () => fetchNextPage() } // manda llamar la sig pagina
                showsVerticalScrollIndicator={false} //quita la barra scoll Vertical
            />
        </View>
    )
}

const styles = StyleSheet.create({
    imgPosition: {
        position:'absolute',
        top:-100,
        right:-100,
    }
});