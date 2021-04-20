import React, { FC } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { AppRoutesStack } from './stack.routes';

export const Rotas: FC = () => (
  <NavigationContainer>
    <AppRoutesStack />
  </NavigationContainer>
);
