import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import colors from '../../../styles/colors';
import fonts from '../../../styles/fonts';

import avatarImg from '../../assets/avatar.jpeg';

interface HeaderProps {
  title: string;
  subTitle?: string;
}

export const HeaderComponent = ({ title, subTitle }: HeaderProps) => (
  <View style={styles.container}>
    <View>
      <Text style={styles.header}>{title}</Text>
      <Text style={styles.subTitle}>{subTitle}</Text>
    </View>

    <Image source={avatarImg} style={styles.image} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  header: {
    fontSize: 32,
    fontFamily: fonts.text,
    color: colors.heading,
  },
  subTitle: {
    fontSize: 32,
    fontFamily: fonts.heading,
    color: colors.heading,
    lineHeight: 40,
  },
  image: { width: 86, height: 86, borderRadius: 43 },
});
