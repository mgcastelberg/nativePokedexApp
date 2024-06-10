
import { View } from 'react-native'
import { ActivityIndicator, Button, Text } from 'react-native-paper'
import { getPokemons } from '../../../actions'
import { useQuery } from '@tanstack/react-query'

export const HomeScreen = () => {

    const { isLoading, data = [] } = useQuery({
        queryKey:['pokemons'],
        queryFn: () => getPokemons(0),
        staleTime: 1000 * 60 * 10, // 60 minutos considerada como fresca 
    });
    
    return (
        <View>
            <Text variant='headlineSmall'>
                HomeScreen
            </Text>

            {
                isLoading ? ( 
                    <ActivityIndicator/> 
                ) : ( 
                    <Button mode="contained" onPress={() => console.log('Pressed')}>
                        Press me
                    </Button>
                )
            }
        </View>
    )
}