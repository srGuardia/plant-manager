import { useNavigation, useRoute } from '@react-navigation/core';
import React, { useCallback, useState } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SvgFromUri } from 'react-native-svg';
import DateTimePicker, { Event } from '@react-native-community/datetimepicker';
import { format, isBefore } from 'date-fns';

import colors from '../../../../styles/colors';
import fonts from '../../../../styles/fonts';
import waterImg from '../../../assets/waterdrop.png';
import { ButtonComponent } from '../../../components/Button';
import { PlantProps, savePlants } from '../../../utils/storage';

interface ParamsProps {
  plant: PlantProps;
}

export const SavePlantsContainer = (props: any) => {
  const route = useRoute();
  const { plant } = route.params as ParamsProps;
  const navigation = useNavigation();
  const [selectedDateTime, setSelectedDateTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(Platform.OS === 'ios');

  const handleChangeDate = useCallback(
    (event: Event, dateTime: Date | undefined) => {
      if (Platform.OS === 'android') {
        setShowDatePicker((oldState) => !oldState);
      }

      if (dateTime && isBefore(dateTime, new Date())) {
        setSelectedDateTime(new Date());
        return Alert.alert('Escolha uma hora no futuro !');
      }

      if (dateTime) {
        setSelectedDateTime(dateTime);
      }
    },
    []
  );

  const handleDatePickAndroid = useCallback(() => {
    setShowDatePicker((oldState) => !oldState);
  }, []);

  const handleConfirmSave = useCallback(async () => {
    try {
      await savePlants({ ...plant, dateTimeNotification: selectedDateTime });

      navigation.navigate('Confirmation', {
        title: 'Tudo certo',
        text: `Fique tranquilo que sempre vamos ${'\n'} lembrar você de cuidar da sua plantinha ${'\n'} com bastante amor.`,
        nextScreen: 'MyPlants',
        icon: 'hug',
        buttonTitle: 'Muito obrigado :D',
      });
    } catch (error) {
      return alert(error.message);
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentPlant}>
        <SvgFromUri uri={plant.photo} width={150} height={150} />

        <Text style={styles.namePlant}>{plant.name}</Text>
        <Text style={styles.infoPlant}>{plant.about}</Text>
      </View>

      <View style={styles.controller}>
        <View style={styles.tipContainer}>
          <Image source={waterImg} style={styles.tipImage} />
          <Text style={styles.tipText}>{plant.water_tips}</Text>
        </View>

        <Text style={styles.alertLabel}>
          Escolha o melhor horáriopara ser lembrado:
        </Text>

        {showDatePicker && (
          <DateTimePicker
            value={selectedDateTime}
            mode='time'
            display='spinner'
            onChange={handleChangeDate}
          />
        )}

        {Platform.OS === 'android' && (
          <TouchableOpacity
            style={styles.datePickerButton}
            onPress={handleDatePickAndroid}
            activeOpacity={0.7}
          >
            <Text style={styles.datePickerText}>{`Mudar ${format(
              selectedDateTime,
              'HH:mm'
            )}`}</Text>
          </TouchableOpacity>
        )}

        <ButtonComponent title='Cadastrar Planta' onPress={handleConfirmSave} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: colors.shape,
  },
  contentPlant: {
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  namePlant: {
    fontSize: 24,
    fontFamily: fonts.heading,
    color: colors.heading,
    marginTop: 15,
  },
  infoPlant: {
    fontSize: 17,
    fontFamily: fonts.text,
    color: colors.heading,
    textAlign: 'center',
    marginTop: 10,
  },
  controller: {
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  tipContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.blue_light,
    padding: 20,
    borderRadius: 20,
    position: 'relative',
    bottom: 60,
  },
  tipImage: {
    width: 56,
    height: 56,
  },
  tipText: {
    flex: 1,
    marginLeft: 20,
    fontFamily: fonts.text,
    color: colors.blue,
    fontSize: 17,
    textAlign: 'justify',
  },
  alertLabel: {
    textAlign: 'center',
    fontFamily: fonts.complement,
    color: colors.heading,
    fontSize: 12,
    marginBottom: 5,
  },
  datePickerText: {
    color: colors.heading,
    fontSize: 24,
    fontFamily: fonts.text,
  },
  datePickerButton: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 40,
    justifyContent: 'center',
    borderRadius: 20,
  },
});
