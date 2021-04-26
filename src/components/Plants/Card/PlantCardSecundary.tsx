import React from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { SvgFromUri } from 'react-native-svg';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import colors from '../../../../styles/colors';
import fonts from '../../../../styles/fonts';
import { Feather } from '@expo/vector-icons';

interface PlantCardSecundaryProps extends RectButtonProps {
  data: {
    name: string;
    photo: string;
    hour: string;
  };
  handleRemove: () => void;
}

export const PlantCardSecundaryComponent = ({
  data: { name, photo, hour },
  handleRemove,
  ...rest
}: PlantCardSecundaryProps) => (
  <Swipeable
    overshootRight={false}
    renderRightActions={() => (
      <Animated.View>
        <View>
          <RectButton style={styles.remove} onPress={handleRemove}>
            <Feather name='trash' size={32} color={colors.white} />
          </RectButton>
        </View>
      </Animated.View>
    )}
  >
    <RectButton style={styles.container} {...rest}>
      <SvgFromUri uri={photo} height={80} width={80} />
      <Text style={styles.textName}>{name}</Text>

      <View style={styles.details}>
        <Text style={styles.timeLabel}>Regar às</Text>
        <Text style={styles.time}>{hour}</Text>
      </View>
    </RectButton>
  </Swipeable>
);

const styles = StyleSheet.create({
  remove: {
    width: 100,
    height: 125,
    marginTop: 5,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: colors.red,
    position: 'relative',
    right: 20,
    paddingRight: 30,
  },
  container: {
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 25,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.shape,
    marginVertical: 5,
  },
  textName: {
    flex: 1,
    marginLeft: 10,
    fontFamily: fonts.heading,
    color: colors.heading,
    fontSize: 17,
  },
  details: {
    alignItems: 'flex-end',
  },
  timeLabel: {
    fontFamily: fonts.text,
    color: colors.body_light,
    fontSize: 16,
  },
  time: {
    marginTop: 5,
    fontFamily: fonts.heading,
    color: colors.body_dark,
    fontSize: 16,
  },
});
