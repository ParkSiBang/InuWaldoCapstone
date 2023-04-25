import React from 'react';
import { StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components/native';
import Navigation from './navigations';
import { theme } from './theme';

const App = () => {
    return (
    <ThemeProvider theme={theme}>
        <StatusBar backgroundColor={theme.background} barStyle="dark-content" />
        <Navigation />
    </ThemeProvider>
    );
};

export default App;