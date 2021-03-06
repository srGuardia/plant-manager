import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import colors from '../../../../styles/colors';
import fonts from '../../../../styles/fonts';
import { EnvironmentButtonComponents } from '../../../components/EnvironmentButton';
import { HeaderComponent } from '../../../components/Header';
import { LoadingComponent } from '../../../components/Loading';
import { PlantCardPrimaryComponent } from '../../../components/Plants/Card/PlantCardPrimary';
import { api } from '../../../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/core';
import { PlantProps } from '../../../utils/storage';
interface EnvironmentsProps {
  key: string;
  title: string;
}

export const ListPlantsContainer = () => {
  const [environments, setEnvironments] = useState<EnvironmentsProps[]>([]);
  const [plants, setPlants] = useState<PlantProps[]>([]);
  const [filteredPlants, setfilteredPlants] = useState<PlantProps[]>([]);
  const [evironmentsSelected, setEvironmentsSelected] = useState('all');
  const [loading, setLoading] = useState(true);
  let [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [userName, setUserName] = useState<string>();

  const navigation = useNavigation();

  useEffect(() => {
    async function getUserName() {
      const user = await AsyncStorage.getItem('@plantmanager:user');

      if (user) setUserName(JSON.parse(user));
    }

    getUserName();
  }, []);

  const handleSelectEnvironment = useCallback(
    (value: string) => {
      setEvironmentsSelected(value);

      if (value === 'all') return setfilteredPlants(plants);
      else {
        const newArrayPlants = plants.filter((item) =>
          item.environments.includes(value)
        );

        setfilteredPlants(newArrayPlants);
      }
    },
    [plants]
  );

  const handleSavePlants = useCallback((plant: PlantProps) => {
    navigation.navigate('SavePlants', { plant });
  }, []);

  async function getPlants() {
    const { data } = await api.get(
      `plants?_sort=name&_order=asc&_page=${page}&_limit=8`
    );

    if (!data) return setLoading(true);

    if (page > 1) {
      setPlants((oldValues) => [...oldValues, ...data]);
      setfilteredPlants((oldValues) => [...oldValues, ...data]);
    } else {
      setPlants(data);
      setfilteredPlants(data);
    }

    setLoading(false);
    setLoadingMore(false);
  }

  const handleFetchMore = useCallback(
    (distance: number) => {
      if (distance < 1) return;

      setLoadingMore(true);
      setPage(page++);
      getPlants();
    },
    [page]
  );

  useEffect(() => {
    async function getPlantsEnvironments() {
      const { data } = await api.get(
        'plants_environments?_sort=title&_order=asc'
      );

      setEnvironments([{ key: 'all', title: 'Todos' }, ...data]);
    }

    getPlantsEnvironments();
  }, []);

  useEffect(() => {
    getPlants();
  }, []);

  if (loading) return <LoadingComponent />;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <HeaderComponent title='Ol??,' subTitle={userName} />

        <Text style={styles.title}>Em qual ambiente</Text>
        <Text style={styles.subTitle}>voc?? quer colocar sua planta?</Text>
      </View>

      <View style={styles.listEnvironments}>
        <FlatList
          data={environments}
          keyExtractor={(item) => String(item.key)}
          renderItem={({ item }) => (
            <EnvironmentButtonComponents
              key={item.key}
              title={item.title}
              active={item.key === evironmentsSelected}
              onPress={() => handleSelectEnvironment(item.key)}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <View style={styles.listPlants}>
        <FlatList
          data={filteredPlants}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <PlantCardPrimaryComponent
              data={item}
              onPress={() => handleSavePlants(item)}
            />
          )}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          onEndReachedThreshold={0.1}
          onEndReached={({ distanceFromEnd }) =>
            handleFetchMore(distanceFromEnd)
          }
          ListFooterComponent={loadingMore ? <ActivityIndicator /> : <></>}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingVertical: Platform.OS === 'android' ? 30 : 0,
  },
  header: {
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 17,
    color: colors.heading,
    fontFamily: fonts.heading,
    lineHeight: 20,
    marginTop: 15,
  },
  subTitle: {
    fontSize: 17,
    fontFamily: fonts.text,
    color: colors.heading,
    lineHeight: 20,
  },
  listEnvironments: {
    height: 60,
    justifyContent: 'center',
    marginVertical: 32,
    marginLeft: 30,
  },
  listPlants: {
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: 'center',
  },
});
