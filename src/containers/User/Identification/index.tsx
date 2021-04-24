import { useNavigation } from '@react-navigation/core';
import React, { useCallback, useState } from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import colors from '../../../../styles/colors';
import { ButtonComponent } from '../../../components/Button';
import { identificationStyles } from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const UserIdentificationContainer = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [name, setName] = useState<string>();

  const navigation = useNavigation();

  const handleSubmit = useCallback(async () => {
    if (!name) return alert('Insira o seu nome');

    try {
      await AsyncStorage.setItem('@plantmanager:user', JSON.stringify(name));

      navigation.navigate('Confirmation', {
        title: 'Prontinho',
        text: `Agora vamos começar a cuidar das suas ${'\n'} plantinhas com muito cuidado.`,
        nextScreen: 'ListPlants',
        icon: 'smile',
        buttonTitle: 'Começar',
      });
    } catch (error) {
      return alert(error.message);
    }
  }, [name]);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    setIsFilled(!!name);
  }, [name]);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputChange = useCallback((value: string) => {
    setName(value);
    setIsFilled(!!value);
  }, []);

  return (
    <SafeAreaView style={identificationStyles.container}>
      <KeyboardAvoidingView
        style={identificationStyles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={identificationStyles.content}>
            <View style={identificationStyles.form}>
              <View style={identificationStyles.header}>
                <Text style={identificationStyles.emoji}>
                  {isFilled ? '😄' : '🧐'}
                </Text>
                <Text style={identificationStyles.title}>
                  Como podemos {'\n'}
                  chamar você?
                </Text>
              </View>

              <TextInput
                style={[
                  identificationStyles.input,
                  (isFocused || isFilled) && {
                    borderColor: name ? colors.green : colors.red,
                  },
                ]}
                placeholder='Digite o nome'
                onBlur={handleInputBlur}
                onFocus={handleInputFocus}
                onChangeText={handleInputChange}
              />

              <View style={identificationStyles.footer}>
                <ButtonComponent title='Confirmar' onPress={handleSubmit} />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
