import React, {useEffect} from 'react';
import { StatusBar, View, Text, Image, Alert} from 'react-native';
import {Map, Signup} from './'
import styled from 'styled-components/native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Button, Card } from '@rneui/themed';
import axios from 'axios';
import { SERVER_ADDRESS } from '../../global';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon1 from 'react-native-vector-icons/Foundation';

const Tab = createBottomTabNavigator();

const UserPage = ({navigation, route}) => {
    console.log(11)
    console.log(route.params)
    console.log('!' + route.params.email)

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

        console.log(route.params.sharpSpeedingNum),
        console.log(route.params.accidentNum),
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
                        
                        style={{fontSize: 16,
                            color: '#000000'
                                
                        }}
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
                        5월 8일 10시 39분 출발 | {route.params.drivingDistance}km 주행 | 총 39분
                    </Text>

                    {/* 잘 주행할 때 띄워주는 Card */}

                    { route.params.speedingNum === 0 &&
                      route.params.speedingNum === 0 &&
                      route.params.sharpCurvingNum === 0 &&
                      route.params.accidentNum === 0 &&
                        <Card
                            // containerStyle={{
                            //     alignItems: 'center',
                            //     height: 28,
                            //     width: 80,
                            //     padding: 2,
                            //     borderRadius: 6,
                            //     backgroundColor: '#00BFFF',
                            //     marginTop: 12,
                            //     marginLeft: 1,
                            //     marginRight: 6,
                            //     }}   
                            >
                            <Text
                                style={{
                                    fontSize: 13, 
                                    padding: 1,
                                    fontWeight: 700,
                                    color: '#1C1C1C',
                                }}>
                                완벽했어요! 
                            </Text>
                        </Card> 
                    }

                    {/* 잘못 주행한 것들 띄워주는 Card */}
                    <View 
                        style={{
                            flexDirection: 'row',
                        }}>

                        {/* 과속 Card */}
                        {route.params.speedingNum > 0 &&
                            <Card
                                containerStyle={{
                                    alignItems: 'center',
                                    height: 24,
                                    width: 50,
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
                            >과속 | {route.params.speedingNum} </Text>
                            </Card>
                        }

                        {/* 급변속 Card */}

                        {route.params.sharpSpeedingNum > 0 &&
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
                            >급변속 | {route.params.sharpSpeedingNum} </Text>
                                </Card>
                        }

                        {route.params.sharpCurvingNum > 0 &&
                            <Card
                                containerStyle={{
                                    alignItems: 'center',
                                    height: 24,
                                    width: 50,
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
                                >급회전 | {route.params.sharpCurvingNum} </Text>
                            </Card>
                        }

                        {/* 사고 Card */}

                        {route.params.accidentNum > 0 &&
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
                                >사고 | {route.params.accidentNum} </Text>
                            </Card>
                        }

                        {/* 급회전 Card */}

                              
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
                                color: '#000000'

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
                    onPress={() => navigation.navigate('Profile',{email})}
                >
                    <Icon1 style={{color: 'white',}} name="home" size={25} />
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
                >
                    <Icon1 style={{color: 'white',}} name="torso" size={25} />
                    <Text style={{color: 'white',}}>User</Text>
                </Button>
            </View>  
        </View>
    );
};

export default UserPage;