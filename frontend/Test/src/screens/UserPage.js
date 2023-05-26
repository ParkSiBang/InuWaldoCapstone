import React, {useEffect, useState} from 'react';
import { StatusBar, View, Text, Image, Alert} from 'react-native';
import {Map, Signup} from './'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Button, Card, Dialog } from '@rneui/themed';
import axios from 'axios';
import { SERVER_ADDRESS } from '../../global';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon1 from 'react-native-vector-icons/Foundation';
import Icon2 from 'react-native-vector-icons/Octicons';

const Tab = createBottomTabNavigator();

const UserPage : React.FunctionComponent<DialogComponentProps> = ({navigation, route}) => {
    
    console.log('userpage');

    const [visible1, setVisible1] = useState(false);
    const [visible2, setVisible2] = useState(false);
    const [checked, setChecked] = useState(1);

    const toggleDialog1 = () => {
        setVisible1(!visible1);
    };

    const toggleDialog2 = () => {
        setVisible2(!visible2);
    };

    // 여기서 부터 복붙해서 
    const email = route.params.email;

    const [data, setData]=useState({
        drivingScore: 0,
        recentSpeedingNum: 0,
        recentSharpSpeedingNum: 0,
        recentAccidentNum: 0,
        recentSharpCurvingNum: 0,
        recentSharpBrakingNum: 0,
        mileage: 0,
        recentDistance: 0,
        totalDistance: 0,
        totalSpeedingNum: 0,
        totalSharpSpeedingNum: 0,
        totalAccidentNum: 0,
        totalSharpCurvingNum: 0,
        totalSharpBrakingNum: 0,
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

    console.log(data)

    const reqLogin = async () => {
        try {
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

    // 백엔드 데이터 낱개 출력
    console.log('distance :' + data.recentDistance)

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
                        {parseInt(data.drivingScore)}
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
                                height: 40,
                                width: 40,
                            }}
                            style={{paddingBottom: 20}}
                            alignItems= 'right'
                            onPress={toggleDialog1}
                        >
                            <Icon2 name="question" style={{color: '#0080FF'}}size={20}/>
                        </Button>

                        {/* 급감속 Dialog */}

                        { data.recentSharpBrakingNum > 0 &&

                            <Dialog
                                isVisible={visible1}
                                onBackdropPress={toggleDialog1}
                                borderRadius= '10'
                                >
                                <Dialog.Title title="급감속이 감지됐어요" titleStyle={{ color: 'black' }}/>

                                <View style={{ marginBottom: 10, borderBottomColor: 'black', borderBottomWidth: 1,}}/>
                                
                                <View style={{flexDirection: 'row', }}>
                                    <Image
                                        style={{width: 113, height: 113, marginRight: 3, }}
                                        source={require('Test/assets/images/beforeBraking.jpg')}/>
                                    <Image
                                        style={{width: 113, height: 113, }}
                                        source={require('Test/assets/images/afterBraking.jpg')}/>
                                </View>

                                <View style={{ marginTop: 10 ,marginBottom: 10, borderBottomColor: 'black', borderBottomWidth: 1,}}/>

                                <View style={{flexDirection: 'row', }}>
                                    <Text style={{fontWeight: 'bold', color: 'black',}}>1. </Text>
                                    <Text style={{fontWeight: 'bold', color: 'black',}}>저속주행을 하면서  항상 주변을 둘러보  세요.</Text>
                                </View>
                                <View style={{flexDirection: 'row', marginTop: 10,}}>
                                    <Text style={{fontWeight: 'bold', color: 'black',}}>2. </Text>
                                    <Text style={{fontWeight: 'bold', color: 'black',}}>브레이크를 천천히 눌러주세요.</Text>
                                </View>
                                <View style={{flexDirection: 'row', marginTop: 10,}}>
                                    <Text style={{fontWeight: 'bold', color: 'black',}}>3. </Text>
                                    <Text style={{fontWeight: 'bold', color: 'black',}}>거리가 충분하다면, 가속 버튼을 누르지  않는 것만으로도 속도는 줄어들어요.</Text>
                                </View> 
                            </Dialog>
                        }
                    </View>
                    <Card.Divider color={'#585858'}/>

                    {/* 도착 지점 */}

                    {/* <Text
                        
                        style={{fontSize: 16,
                            color: '#000000'
                                
                        }}
                    >
                        인천대학교 송도캠퍼스
                    </Text> */}

                    {/* 주행한 날짜 | 주행 거리 | 주행 시간 */}

                    <Text
                        style={{
                            fontSize: 12,
                            // color: '#BDBDBD'
                            color: 'black'
                        }}
                    >
                        5월 26일 | {data.recentDistance}m 주행 
                    </Text>

                    {/* 잘 주행할 때 띄워주는 Card */}

                    { data.recentSharpSpeedingNum === 0 &&
                      data.recentSpeedingNum === 0 &&
                      data.recentSharpCurvingNum === 0 &&
                      data.recentAccidentNum === 0 &&
                      data.recentSharpBrakingNum === 0 &&
                      
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
                        {data.recentSpeedingNum > 0 &&
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
                            >과속 | {data.recentSpeedingNum} </Text>
                            </Card>
                        }

                        {/* 급가속 Card */}

                        {data.recentSharpSpeedingNum > 0 &&
                            <Card
                                containerStyle={{
                                    alignItems: 'center',
                                    height: 24,
                                    width: 57,
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
                            >급가속 | {data.recentSharpSpeedingNum} </Text>
                                </Card>
                        }

                        {/* 급감속 Card */}

                        {data.recentSharpBrakingNum > 0 &&
                            <Card
                                containerStyle={{
                                    alignItems: 'center',
                                    height: 24,
                                    width: 57,
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
                            >급감속 | {data.recentSharpBrakingNum} </Text>
                                </Card>
                        }

                        {data.recentSharpCurvingNum > 0 &&
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
                                >급회전 | {data.recentSharpCurvingNum} </Text>
                            </Card>
                        }

                        {/* 사고 Card */}

                        {data.recentAccidentNum > 0 &&
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
                                >사고 | {data.recentAccidentNum} </Text>
                            </Card>
                        }

                              
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
                            //onPress={() => navigation.navigate('RecentRecord')}
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
                            >{data.mileage} 원</Text>
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