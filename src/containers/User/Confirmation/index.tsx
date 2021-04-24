import { useNavigation, useRoute } from '@react-navigation/core';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { ButtonComponent } from '../../../components/Button';
import { styles } from './styles';

interface Params {
  icon: 'smile' | 'hug';
  title: string;
  text: string;
  buttonTitle: string;
  nextScreen: string;
}

const emojis = {
  hug: '🤗',
  smile: '😁',
};

export const UserConfirmationContainer = () => {
  const navigation = useNavigation();
  const routes = useRoute();

  const {
    nextScreen,
    icon,
    title,
    text,
    buttonTitle,
  } = routes.params as Params;

  const handleListPlants = useCallback(() => {
    navigation.navigate(nextScreen);
  }, [nextScreen]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.emoji}>{emojis[icon]}</Text>

        <Text style={styles.title}>{title}</Text>

        <Text style={styles.text}>{text}</Text>

        <View style={styles.footer}>
          <ButtonComponent title={buttonTitle} onPress={handleListPlants} />
        </View>
      </View>
    </SafeAreaView>
  );
};
