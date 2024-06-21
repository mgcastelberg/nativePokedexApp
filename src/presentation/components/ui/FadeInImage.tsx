import {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Animated,
  ImageStyle,
  StyleProp,
  View
} from 'react-native';
import {useAnimation} from '../../hooks/useAnimation';

interface Props {
  uri: string;
  style?: StyleProp<ImageStyle>;
}

export const FadeInImage = ({uri, style}: Props) => {
  const {animatedOpacity, fadeIn} = useAnimation();
  const [isLoading, setIsLoading] = useState(true);

  //Mofificacion para prevenir is loading cuando el objeto ya esta destruido   
  const isDisposed = useRef(false); //useRef no hace un rerender del componente
  useEffect(() => {
    return () => {
        isDisposed.current=true;
    };
  }, []);
  const onLoadEnd = () => {
    if( isDisposed.current ) return;
    fadeIn({});
    setIsLoading(false);
  }
  // End prevent isLoading when object destroyed on infiniteScroll

  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      {isLoading && (
        <ActivityIndicator
          style={{position: 'absolute'}}
          color="grey"
          size={30}
        />
      )}

      <Animated.Image
        source={{uri}}
        onLoadEnd={onLoadEnd}
        style={[style, {opacity: animatedOpacity, resizeMode:'contain'}]}
      />
    </View>
  );
};