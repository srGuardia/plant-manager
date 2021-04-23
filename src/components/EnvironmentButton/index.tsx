import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import colors from '../../../styles/colors';
import fonts from '../../../styles/fonts';

interface EnvironmentProps extends RectButtonProps {
  title: string;
  active?: boolean;
}

export const EnvironmentButtonComponents = ({
  title,
  active = false,
  ...rest
}: EnvironmentProps) => (
  <RectButton
    style={[styles.container, active && styles.containerActive]}
    {...rest}
  >
    <Text style={[styles.text, active && styles.textActive]}>{title}</Text>
  </RectButton>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.shape,
    alignItems: 'center',
    justifyContent: 'center',
    width: 76,
    height: 50,
    marginRight: 15,
    borderRadius: 12,
  },
  containerActive: {
    backgroundColor: colors.green_light,
  },
  textActive: {
    fontFamily: fonts.heading,
    color: colors.green_dark,
  },
  text: {
    fontFamily: fonts.text,
    color: colors.heading,
  },
});
