import React,{useEffect} from 'react';
import { StatusBar, Text, View,Alert } from 'react-native';
import { Button } from '../components';
import styled from 'styled-components/native';
import { Card } from '@rneui/themed';
import { drivingDistance } from './FreeMap';
import axios from 'axios';
import { SERVER_ADDRESS } from '../../global';

const Container = styled.View`
    flex: 1;
    font-weight: bold;
    justify-content: center;
    //align-items: center;
    background-color: ${({ theme }) => theme.background};
    padding: 0 20px;
`;

const Text_Welcome = styled.Text`
    text-align: center
    justify-content: center;
    align-items: center;
    font-size: 40px;
    font-weight: 600;
    margin-bottom: 50px;
`;

const Text_Normal = styled.Text`
    font-size : 14px;
    font-weight: bold;
    color: #000000;

`

const MapResult = ({navigation, route}) => {
    // 어떤 것을 위반했는지 알려주는 함수
    // function Exist ({ drivingDistance, speedingNum, sharpLowSpeedNum, sharpHighSpeedNum, accidentNum }) {
    //     let existResult = [];
    //     { drivingDistance > 0 ? existResult[0]=1 : existResult[0]=0 };
    //     { speedingNum > 0 ? existResult[1]=1 : existResult[1]=0 };    
    //     { sharpLowSpeedNum > 0 ? existResult[2]=1 : existResult[2]=0 };
    //     { sharpHighSpeedNum > 0 ? existResult[3]=1 : existResult[3]=0 }; 
    //     { accidentNum > 0 ? existResult[4]=1 : existResult[4]=0 };
    //     return existResult;
    // }
    // existResult = Exist({ drivingDistance, speedingNum, sharpLowSpeedNum, sharpHighSpeedNum, accidentNum });
    
    //speedingNum sharpCurvingNum accidentNum drivingDistance sharpSpeedingNum
    // 마일리지 최종값

    console.log("측정 끝 최종 결과");
    
    console.log(route.params)

    let ResultMile = route.params.drivingDistance - route.params.speedingNum*100 - route.params.sharpSpeedingNum*10 
    - route.params.accidentNum*50 - route.params.sharpCurvingNum*10;

    const email=route.params.email;
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
            <Text_Welcome>안내종료</Text_Welcome>

            {/* 마일리지 정산 카드 */}

            <Card
                containerStyle={{
                    backgroundColor:'#F2F2F2'
            }}
            >

                {/* 최종 결과 */}

                <View style={{flexDirection: 'row',}}>
                    <View>
                        <Text_Normal>운전거리  : </Text_Normal>
                        <Text_Normal></Text_Normal>
                        <Text_Normal>위반사항  : </Text_Normal>
                    </View>
                    <View>
                        <Text_Normal>  {route.params.drivingDistance}m </Text_Normal>
                        <Text_Normal>
                            { route.params.speedingNum === 0 &&
                              route.params.speedingNum === 0 &&
                              route.params.sharpCurvingNum === 0 &&
                              route.params.accidentNum === 0 &&
                              '  없음'
                            }
                        </Text_Normal>
                        <Text_Normal>  {route.params.speedingNum >=1 && '과속('+route.params.speedingNum+')'}  
                                {route.params.sharpSpeedingNum >=1 && '급변속('+route.params.sharpSpeedingNum+')'}  
                        </Text_Normal>
                        <Text_Normal> 
                            {route.params.sharpCurvingNum >= 1&& '  급회전('+route.params.sharpCurvingNum+')'} 
                            {route.params.accidentNum >= 1&& '  사고('+route.params.accidentNum+')'} 
                        </Text_Normal>
                    </View>
                </View>
                <View style={{ marginTop: 10, marginBottom: 10, borderBottomColor: 'black', borderBottomWidth: 1,}}/>

                {/* 마일리지 계산 */}

                <View style={{flexDirection: 'row',}}>
                    <View style={{flex: 1}}> 
                        <Text_Normal >마일리지  : </Text_Normal>
                    </View>
                    <View style={{alignItems: 'flex-end'}}>
                        <Text_Normal >   +{route.params.drivingDistance}</Text_Normal>
                        <Text_Normal>   {route.params.speedingNum >= 1 && '-'+route.params.speedingNum*10}</Text_Normal>
                        <Text_Normal>   {route.params.sharpSpeedingNum >= 1 && '-'+route.params.sharpSpeedingNum*10}</Text_Normal>
                        <Text_Normal>   {route.params.sharpCurvingNum >= 1 && '-'+route.params.sharpCurvingNum*10}</Text_Normal>
                        <Text_Normal>   {route.params.accidentNum  >= 1 && '-'+route.params.accidentNum*50}</Text_Normal>
                        </View>
                    </View>

                    <View style={{ marginTop: 10, marginBottom: 10, borderBottomColor: 'black', borderBottomWidth: 1,}}/>
                
                    {/* 최종 마일리지 값 */}

                    <Text_Normal style={{textAlign: 'right', fontSize: 25, fontWeight: 500}}>{ResultMile > 0 ? '+'+ResultMile : 0}</Text_Normal>
                    <View style={{ marginTop: 20,  marginRight: 100, marginLeft: 100}}>
                        <Button 
                            title="적립" 
                            onPress={() => navigation.navigate('UserPage', {
                                drivingDistance: route.params.drivingDistance, 
                                speedingNum: route.params.speedingNum, 
                                sharpSpeedingNum: route.params.sharpSpeedingNum,
                                accidentNum: route.params.accidentNum,
                                sharpCurvingNum: route.params.sharpCurvingNum,
                            })}
                            textStyle={{fontSize: 18,}}
                        />
                </View>
            </Card>
        </Container>
    );
};

export default MapResult;