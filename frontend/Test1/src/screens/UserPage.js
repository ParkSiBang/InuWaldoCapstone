import React from 'react';
import { StatusBar, View, Text, Image, } from 'react-native';
import {Map, Signup} from './'
import styled from 'styled-components/native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Button, Card } from '@rneui/themed';


const Tab = createBottomTabNavigator();

const Container = styled.View`
    flex: 1;
    //justify-content: center;
    //align-items: center;
    //background-color: ${({ theme }) => theme.background};
    //padding: 10px 20px;
`;

const Text_Welcome = styled.Text`
    font-size: 50px;
    font-weight: 600;
    margin-top: 50px;
    margin-bottom: 50px;
`;

const UserPage = ({navigation}) => {
    return (
        <Container>
            <View
                style={{
                    flex: 1, 
                    flexDirection: 'row',
                    alignItems: 'center',
                }}
            >
                <View
                    style={{flex: 2,}}
                >
                    <Text style={{
                        paddingLeft: 30,
                        paddingTop: 30,
                        fontWeight: 'bold',
                    }}>내 운전점수
                    </Text>
                    <Text style={{
                        paddingLeft: 30,
                        fontSize: 50,
                    }}>
                        92점
                    </Text>
                </View>
                <View
                    style={{ flex: 1,}}
                >
                    <Button
                        title="자세히 보기" 
                        type="outline" 
                        containerStyle={{
                            width: 100,
                        }}
                    />
                </View>
            </View>
            <View
                    style={{
                        marginBottom: 10,
                        borderBottomColor: '#d5d5d5',
                        borderBottomWidth: 1,
                    }}
            />
            <View
                style={{flex: 3, }}
            >
                <Card
                    containerStyle={{
                        backgroundColor:'#F2F2F2'
                    }}
                >
                    <Text
                        style={{
                            fontSize: 20,
                            fontWeight: 'bold',
                            paddingBottom: 20,
                            color: '#000000'
                        }}
                    >
                        최근 주행 기록
                        <Button  
                            type="clear"
                            icon={{
                                name: 'home',
                                type: 'font-awesome',
                                size: 15,
                                color: 'white',
                            }}
                        >
                        </Button>
                    </Text>
                    <Card.Divider color={'#585858'}/>
                </Card> 
            </View>           
        </Container>
    );
};

export default UserPage;