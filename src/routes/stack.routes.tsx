import React, { FC } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import colors from '../../styles/colors';
import { WelcomeContainer } from '../containers/Welcome';
import { UserIdentificationContainer } from '../containers/User/Identification';
import { UserConfirmationContainer } from '../containers/User/Confirmation';
import { ListPlantsContainer } from '../containers/Plants/ListPlants';

const RotasStack = createStackNavigator();

export const AppRoutesStack: FC = () => (
  <RotasStack.Navigator
    headerMode='none'
    screenOptions={{ cardStyle: { backgroundColor: colors.white } }}
  >
    <RotasStack.Screen name='Welcome' component={WelcomeContainer} />
    <RotasStack.Screen
      name='Identification'
      component={UserIdentificationContainer}
    />
    <RotasStack.Screen
      name='Confirmation'
      component={UserConfirmationContainer}
    />
    <RotasStack.Screen name='ListPlants' component={ListPlantsContainer} />
  </RotasStack.Navigator>
);
