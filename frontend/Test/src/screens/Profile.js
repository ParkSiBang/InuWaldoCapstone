import React, { useEffect, useState } from 'react';
import { StatusBar, View, Text, Image, Alert } from 'react-native';
import {Signup, profileName} from './Signup'
import styled from 'styled-components/native';
import {  Button } from '@rneui/themed';
import axios from 'axios';
import { SERVER_ADDRESS } from '../../global';
import Icon from 'react-native-vector-icons/Foundation';


const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => theme.background};
`;

const Text_Welcome = styled.Text`
    font-size: 50px;
    font-weight: 600;
    margin-top: 30px;
`;


const Profile = ({navigation, route}) => {
    const email = route.params.email;

    const [data, setData]=useState({
        name : []
    });
    
    const backDownload = async () => {
        try {
            const response = await axios.post(SERVER_ADDRESS + '/userInfo', {
                userId: route.params.email,
            });
            setData(response.data)
        }
        catch (error) {
            //실패시 경고 출력
            Alert.alert('Data Error', error.message)
        }
    }
    
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
        backDownload();
    },[]);

    return (
        <Container>
            <Image
                style={{marginTop: 100, }}
                source={require('Test/assets/images/face.jpg')}/>
            <Text_Welcome>환영합니다</Text_Welcome>

            <View
                style={{  
                    flex: 6, 
                    //backgroundColor: 'green', 
                    padding: 20, 
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Button
                    title="자유 주행"
                    buttonStyle={{
                        borderRadius: 3,
                        margin: 20,
                        backgroundColor : '#3679fe',
                    }}
                    containerStyle={{
                        width: 150,
                        marginHorizontal: 50,
                        marginVertical: 10,
                    }}
                    onPress={() => navigation.navigate('FreeMap', {email} )}
                />
                <Button
                    title={'경로 안내'}
                    buttonStyle={{
                        borderRadius: 3,
                        margin: 20,
                        backgroundColor : '#3679fe',
                    }}
                    containerStyle={{
                        width: 150,
                        marginHorizontal: 50,
                        marginVertical: 10,
                    }}
                    onPress={() => navigation.navigate('Map',{email})}
                />
            </View>
            <View
                style={{
                    height: 60,
                    //backgroundColor: 'purple',
                    flexDirection: 'row',
                    //justifyContent: 'space-around',
                }}
            >
                <Button
                    buttonStyle={{
                        backgroundColor : '#6B9CFF',
                        width: 180,
                        flex: 1,
                        flexDirection: 'column',
                    }}
                    type="solid"
                    titleStyle={{ color: 'white' }}
                >
                    <Icon style={{color: 'white',}} name="home" size={25} />
                    <Text style={{color: 'white',}}>Home</Text>
                </Button>

                <Button
                    buttonStyle={{
                        backgroundColor : '#6B9CFF',
                        width: 180,
                        flex: 1,
                        flexDirection: 'column',
                    }}
                    type="solid"
                    titleStyle={{ color: 'white' }}
                    onPress={() => navigation.navigate('UserPage',{email})}
                >
                    <Icon style={{color: 'white',}} name="torso" size={25} />
                    <Text style={{color: 'white',}}>User</Text>
                </Button>
            </View>
        </Container>
    );
};

export default Profile;