import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { SvgFromUri } from 'react-native-svg';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';

import colors from '../../../../styles/colors';
import fonts from '../../../../styles/fonts';
import { color } from 'react-native-reanimated';

interface PlantCardPrimaryProps extends RectButtonProps {
  data: {
    name: string;
    photo: string;
  };
}

export const PlantCardPrimaryComponent = ({
  data: { name, photo },
  ...rest
}: PlantCardPrimaryProps) => (
  <RectButton style={styles.container} {...rest}>
    <SvgFromUri uri={photo} height={100} width={100} />
    <Text style={styles.textName}>{name}</Text>
  </RectButton>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxWidth: '45%',
    backgroundColor: colors.shape,
    borderRadius: 20,
    paddingVertical: 10,
    alignItems: 'center',
    margin: 10,
  },
  textName: {
    fontFamily: fonts.heading,
    color: colors.heading,
    fontSize: 13,
  },
});
