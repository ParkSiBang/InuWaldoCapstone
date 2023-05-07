import React from 'react';
import { StatusBar, View, Text, Image } from 'react-native';
import {Signup, profileName} from './Signup'
import styled from 'styled-components/native';
import { Button } from '../components';

const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => theme.background};
    padding: 10px 20px;
`;

const Text_Welcome = styled.Text`
    font-size: 50px;
    font-weight: 600;
    margin-top: 50px;
    margin-bottom: 50px;
`;

const Profile = ({navigation}) => {
    return (
        <Container>
            <Image
                source={require('Test/assets/images/face.jpg')}/>
            <Text_Welcome>환영합니다</Text_Welcome>
            <View
                style={{ width: 100, }}
            >
                <Button
                    title="자율 주행"
                    onPress={() => navigation.navigate('Map')}
                    textStyle={{fontSize: 18,}}
                />
                <Button
                    title="길 찾기"
                    onPress={() => navigation.navigate('Map')}
                    textStyle={{fontSize: 18,}}
                />
            </View>
        </Container>
    );
};

export default Profile;