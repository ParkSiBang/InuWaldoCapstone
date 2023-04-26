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

const Profile = ({navigation}) => {
    return (
        <Container>
            <Text_Welcome>환영합니다</Text_Welcome>
            <Button
                title="start"
                onPress={() => navigation.navigate('Map')}
            />
        </Container>
    );
};

export default Profile;