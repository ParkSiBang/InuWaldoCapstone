import React from 'react';
import { StatusBar, Text, Button } from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => theme.background};
    padding: 0 20px;
`;

const Text_Welcome = styled.Text`
    font-size: 50px;
    font-weight: 600;
    margin-bottom: 50px;
`;

const App = () => {
    return (
    <Container>
        <Text_Welcome>환영합니다</Text_Welcome>
        <Button title='시작하기'></Button>
    </Container>
    );
};

export default App;