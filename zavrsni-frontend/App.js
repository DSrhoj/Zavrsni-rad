import React from 'react';
import { UserProvider } from './components/UserContex';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import Index from './Index'

export default function App() {

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#39C426',
      accent: '#3498db',
    },
  }

  return (
    // Wrap everything with user provider so every component can reach it
    <UserProvider>
      <PaperProvider theme={theme}>
        <Index />
      </PaperProvider>
    </UserProvider>
  );
}

