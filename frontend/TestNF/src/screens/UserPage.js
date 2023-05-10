import React from 'react';
import { StatusBar, View, Text, Image, } from 'react-native';
import {Map, Signup} from './'
import styled from 'styled-components/native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Button, Card } from '@rneui/themed';
import Icon from 'react-native-vector-icons/Ionicons';
import { drivingDistance, speedingNum, sharpLowSpeedNum, sharpHighSpeedNum, accidentNum } from './Map';


const Tab = createBottomTabNavigator();



const Text_Welcome = styled.Text`
    font-size: 50px;
    font-weight: 600;
    margin-top: 50px;
    margin-bottom: 50px;
`;

const UserPage = ({navigation}) => {
    return (
        <View style={{flex:1}}>

            {/* 내 운전 점수 출력 및 '자세히 보기' 버튼 */}

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
                        color: '#000000'
                    }}>
                        92점
                    </Text>

                </View>
                <View style={{ flex: 1,}}
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
                    style={{marginBottom: 10, borderBottomColor: '#d5d5d5', borderBottomWidth: 1, }}/>

            {/* 주행 기록과 마일리지 결과 View */}

            <View
                style={{flex: 3,}}
            >

                {/* 최근 주행 기록 Card */}

                <Card
                    containerStyle={{
                        backgroundColor:'#F2F2F2',
                        marginBottom: 5,
                        borderRadius: 3,
                    }}
                >
                    <View style={{flexDirection:'row'}}>
                        <Text
                            style={{
                                flex: 9,
                                fontSize: 20,
                                fontWeight: 'bold',
                                paddingBottom: 20,
                                color: '#000000'
                            }}
                        >
                            최근 주행 기록
                        </Text>

                        {/* 자세히 보기 button 및 Icon */}

                        <Button  
                            type="clear"
                            containerStyle={{
                                height: 34,
                                width: 37,
                            }}
                            style={{paddingBottom: 20}}
                            alignItems= 'right'
                            onPress={() => navigation.navigate('RecentRecord')}
                        >
                            <Icon name="ios-arrow-down" size={20}/>
                        </Button>
                    </View>
                    <Card.Divider color={'#585858'}/>

                    {/* 도착 지점 */}

                    <Text
                        style={{fontSize: 16,}}
                    >
                        인천대학교 송도캠퍼스
                    </Text>

                    {/* 주행한 날짜 | 주행 거리 | 주행 시간 */}

                    <Text
                        style={{
                            fontSize: 12,
                            color: '#BDBDBD'
                        }}
                    >
                        5월 8일 10시 39분 출발 | {drivingDistance}km 주행 | 총 39분
                    </Text>

                    {/* 잘못 주행한 것들 띄워주는 Card */}
                    
                    <View 
                        style={{
                            flexDirection: 'row',
                        }}>

                        {/* 과속 Card */}

                        <Card
                            containerStyle={{
                                alignItems: 'center',
                                height: 24,
                                width: 66,
                                padding: 2,
                                borderRadius: 6,
                                backgroundColor: '#F78181',
                                marginTop: 12,
                                marginLeft: 1,
                                marginRight: 6,
                            }}   
                        >
                            <Text
                                style={{
                                    fontSize: 10, 
                                    padding: 1,
                                    fontWeight: 500,
                                    color: '#1C1C1C',
                                }}
                            >과속 | {speedingNum}km </Text>
                        </Card>

                        {/* 급가속 Card */}
                        
                        <Card
                            containerStyle={{
                                alignItems: 'center',
                                height: 24,
                                width: 53,
                                padding: 2,
                                borderRadius: 6,
                                backgroundColor: '#F78181',
                                marginTop: 12,
                                marginLeft: 1,
                                marginRight: 6,
                            }}   
                        >
                            <Text
                                style={{
                                    fontSize: 10, 
                                    padding: 1,
                                    fontWeight: 500,
                                    color: '#1C1C1C',
                                }}
                            >급가속 | {sharpHighSpeedNum} </Text>
                        </Card>

                        {/* 급감속 Card */}

                        <Card
                            containerStyle={{
                                alignItems: 'center',
                                height: 24,
                                width: 53,
                                padding: 2,
                                borderRadius: 6,
                                backgroundColor: '#F78181',
                                marginTop: 12,
                                marginLeft: 1,
                                marginRight: 6,
                            }}   
                        >
                            <Text
                                style={{
                                    fontSize: 10, 
                                    padding: 1,
                                    fontWeight: 500,
                                    color: '#1C1C1C',
                                }}
                            >급감속 | {sharpLowSpeedNum} </Text>
                        </Card>

                        {/* 사고 Card */}

                        <Card
                            containerStyle={{
                                alignItems: 'center',
                                height: 24,
                                width: 45,
                                padding: 2,
                                borderRadius: 6,
                                backgroundColor: '#F78181',
                                marginTop: 12,
                                marginLeft: 1,
                            }}   
                        >
                            <Text
                                style={{
                                    fontSize: 10, 
                                    padding: 1,
                                    fontWeight: 500,
                                    color: '#1C1C1C',
                                }}
                            >사고 | {accidentNum} </Text>
                        </Card>
                    </View>
                </Card>

                {/* 마일리지 Card */}

                <Card
                    containerStyle={{
                        backgroundColor:'#F2F2F2',
                        marginBottom: 5,
                        borderRadius: 3,
                    }}
                >
                    <View style={{flexDirection:'row'}}>
                        <Text
                            style={{
                                flex: 9,
                                fontSize: 20,
                                fontWeight: 'bold',
                                paddingBottom: 20,
                                color: '#000000'
                            }}
                        >
                            마일리지
                        </Text>

                        {/* 자세히 보기 button 및 Icon */}

                        <Button  
                            type="clear"
                            containerStyle={{
                                height: 34,
                                width: 37,
                            }}
                            style={{paddingBottom: 20}}
                            alignItems= 'right'
                            onPress={() => navigation.navigate('RecentRecord')}
                        >
                            <Icon name="ios-arrow-down" size={20}/>
                        </Button>
                    </View>
                        <Card.Divider color={'#585858'}/>
                    <View style={{flexDirection:'row'}}>
                        <View>
                            <Text style={{
                                fontWeight: 'bold',
                            }}>
                                총 마일리지
                            </Text>
                            <Text
                                style={{
                                    fontSize: 35,
                                    fontWeight: 'bold',
                                    //paddingBottom: 20,
                                    color: '#000000'
                                }}
                            >1,050 원</Text>
                        </View>
                    </View>
                </Card>
                {/* <Button title="Solid" 
                        containerStyle={{
                            alignItems: 'center',
                            width: 100,
                            marginLeft: 130,
                        }}
                /> */}
            </View>  
        </View>
    );
};

export default UserPage;