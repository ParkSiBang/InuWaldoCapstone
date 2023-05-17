import React, { useEffect } from 'react';
import { StatusBar, View, Text, Image, Alert } from 'react-native';
import {Signup, profileName} from './Signup'
import styled from 'styled-components/native';
import { Button } from '../components';
import axios from 'axios';
import { SERVER_ADDRESS } from '../../global';
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


const Profile = ({navigation, route}) => {
    const email = route.params.email;
    const reqLogin = async () => {
        try {
            console.log(route.params)
            const response = await axios.post(SERVER_ADDRESS + '/isLogin', {
               userId: route.params.email,
            });
            console.log(response.data);
            if(response.data == "success"){
                //성공 시 통과
                console.log("로그인 검증 성공");
                
            }
            else{ //실패시
                Alert.alert('signing Error:'+response.data);
                navigation.navigate('Signin');
            }
            
            
        }
        catch (error) {
            //실패시 경고 출력
            Alert.alert('sigining Error', error.message)
        }
    }

    useEffect(()=>{
        reqLogin(); //페이지 시작 시 로그인 검증
    },[]);

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
                    onPress={() => navigation.navigate('FreeMap')}
                    textStyle={{fontSize: 18,}}
                />
                <Button
                    title="길 찾기"
                    onPress={() => navigation.navigate('Map',{email})}
                    textStyle={{fontSize: 18,}}
                />
            </View>
        </Container>
    );
};

export default Profile;