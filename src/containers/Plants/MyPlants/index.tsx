import React, { useCallback, useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  Image,
  Platform,
  FlatList,
  Alert,
} from 'react-native';
import colors from '../../../../styles/colors';
import { HeaderComponent } from '../../../components/Header';
import waterImg from '../../../assets/waterdrop.png';
import fonts from '../../../../styles/fonts';
import {
  getPlants,
  PlantProps,
  removePlant,
  StorageStateProps,
} from '../../../utils/storage';
import { formatDistance } from 'date-fns';
import { pt } from 'date-fns/locale';
import { PlantCardSecundaryComponent } from '../../../components/Plants/Card/PlantCardSecundary';
import { LoadingComponent } from '../../../components/Loading';

export const MyPlantsContainer = () => {
  const [plants, setPlants] = useState<PlantProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [nextWatered, setNextWatered] = useState<string>();

  useEffect(() => {
    async function loadStoragePlants() {
      const plantStorage = await getPlants();

      if (plantStorage.length === 0) {
        return alert('Não há plantas cadastradas!');
      } else {
        const nextTime = formatDistance(
          new Date(plantStorage[0].dateTimeNotification).getTime(),
          new Date().getTime(),
          { locale: pt }
        );

        setNextWatered(
          `Não esqueça de regar a ${plantStorage[0].name} à ${nextTime}.`
        );

        setPlants(plantStorage);
        setLoading(false);
      }
    }

    loadStoragePlants();
  }, []);

  const handleRemove = useCallback((plant: PlantProps) => {
    Alert.alert('Remover', `Deseja remover à ${plant.name} ?`, [
      { text: 'Não 🙏', style: 'cancel' },
      {
        text: 'Sim 😢',
        style: 'cancel',
        onPress: async () => {
          try {
            await removePlant(plant.id);

            setPlants((oldData) =>
              oldData.filter((item) => item.id !== plant.id)
            );
          } catch (error) {
            alert(error.message);
          }
        },
      },
    ]);
  }, []);

  if (loading) return <LoadingComponent />;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <HeaderComponent title='Minhas' subTitle='Plantinhas' />
      </View>

      <View style={styles.spotlight}>
        <Image source={waterImg} style={styles.spotlightImage} />

        <Text style={styles.spotlightText}>{nextWatered}</Text>
      </View>

      <View style={styles.plants}>
        <Text style={styles.textInfo}>Próximas regadas</Text>

        <FlatList
          data={plants}
          keyExtractor={(plant) => String(plant.id)}
          renderItem={({ item }) => (
            <PlantCardSecundaryComponent
              data={item}
              handleRemove={() => handleRemove(item)}
            />
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: Platform.OS === 'android' ? 30 : 0,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: 30,
  },
  spotlight: {
    flexDirection: 'row',
    backgroundColor: colors.blue_light,
    borderRadius: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    marginHorizontal: 30,
  },
  spotlightImage: {
    width: 56,
    height: 56,
  },
  spotlightText: {
    flex: 1,
    fontSize: 15,
    fontFamily: fonts.complement,
    color: colors.blue,
    marginLeft: 20,
  },
  plants: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 30,
  },
  textInfo: {
    fontSize: 24,
    fontFamily: fonts.heading,
    color: colors.heading,
    marginVertical: 20,
  },
});
