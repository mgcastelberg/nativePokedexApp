
import { StyleSheet, View } from 'react-native'
import { ActivityIndicator, Button, Text } from 'react-native-paper'
import { getPokemons } from '../../../actions'
import { useQuery } from '@tanstack/react-query'
import { PokeballBg } from '../../components/ui/PokeballBG'

export const HomeScreen = () => {

    const { isLoading, data = [] } = useQuery({
        queryKey:['pokemons'],
        queryFn: () => getPokemons(0),
        staleTime: 1000 * 60 * 10, // 60 minutos considerada como fresca 
    });
    
    return (
        <View >
            <PokeballBg style={ styles.imgPosition }/>
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