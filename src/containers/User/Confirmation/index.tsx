import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { ButtonComponent } from '../../../components/Button';
import { styles } from './styles';

export const UserConfirmationContainer = (props: any) => {
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
          <ButtonComponent title='Começar' />
        </View>
      </View>
    </SafeAreaView>
  );
};
