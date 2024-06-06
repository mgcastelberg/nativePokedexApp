
import { View } from 'react-native'
import { Button, Text } from 'react-native-paper'
import { getPokemons } from '../../../actions'

export const HomeScreen = () => {

    getPokemons();
    
    return (
        <View>
            <Text variant='headlineSmall'>
                HomeScreen
            </Text>
            <Button mode="contained" onPress={() => console.log('Pressed')}>
                Press me
            </Button>
        </View>
    )
}