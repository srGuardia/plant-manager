import { useNavigation } from '@react-navigation/core';
import React, { useCallback } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { ButtonComponent } from '../../../components/Button';
import { styles } from './styles';

export const UserConfirmationContainer = (props: any) => {
  const navigation = useNavigation();

  const handleListPlants = useCallback(() => {
    navigation.navigate('ListPlants', {
      userName: props.route.params.userName,
    });
  }, [props.route.params.userName]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.emoji}>🥳</Text>

        <Text style={styles.title}>
          Prontinho{' '}
          <Text style={styles.textName}>{props.route.params.userName}</Text>
        </Text>

        <Text style={styles.text}>
          Agora vamos começar a cuidar das suas {'\n'}
          plantinhas com muito cuidado.
        </Text>

        <View style={styles.footer}>
          <ButtonComponent title='Começar' onPress={handleListPlants} />
        </View>
      </View>
    </SafeAreaView>
  );
};
