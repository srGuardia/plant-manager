import React, { useCallback } from 'react';
import {
  TouchableOpacity,
  Image,
  Text,
  SafeAreaView,
  View,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import welcomeImg from '../../assets/watering.png';
import { styleWelcome } from './styles';
import { useNavigation } from '@react-navigation/core';

export const WelcomeContainer = () => {
  const navigation = useNavigation();

  const handleStart = useCallback(() => {
    navigation.navigate('Identification');
  }, []);

  return (
    <SafeAreaView style={styleWelcome.container}>
      <View style={styleWelcome.wrapper}>
        <Text style={styleWelcome.title}>
          Gerencie {'\n'}
          suas plantas de {'\n'}
          forma fácil
        </Text>

        <Image
          source={welcomeImg}
          style={styleWelcome.image}
          resizeMode='contain'
        />

        <Text style={styleWelcome.subTitle}>
          Não esqueça mais de regar suas plantas. Nós cuidamos de lembrar você
          sempre que precisar.
        </Text>

        <TouchableOpacity
          style={styleWelcome.button}
          activeOpacity={0.8}
          onPress={handleStart}
        >
          <AntDesign name='right' style={styleWelcome.buttonIcon} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
