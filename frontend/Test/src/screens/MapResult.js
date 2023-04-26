import React from 'react';
import { StatusBar, Text, Button, View } from 'react-native';
import styled from 'styled-components/native';
import { drivingDistance, speedingNum, sharpLowSpeedNum, sharpHighSpeedNum, accidentNum } from './Map';

const Container = styled.View`
    flex: 1;
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

const MapResult = ({navigation}) => {
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
    
    // 마일리지 최종값
    let ResultMile = speedingNum*100 - sharpLowSpeedNum*10 - sharpHighSpeedNum*10 - accidentNum*10
    return (
        <Container>
        <Text_Welcome>안내종료</Text_Welcome>
        <Text style={{fontWeight: "bold"}}>운전거리  :  {drivingDistance}km</Text>
        <Text style={{fontWeight: "bold"}}>위반사항  :  {speedingNum && '과속('+speedingNum+'km)'}  
                               {sharpLowSpeedNum && '  급감속('+sharpLowSpeedNum+')'}  
                               {sharpHighSpeedNum && '  급가속('+sharpHighSpeedNum+')'}  
                               {accidentNum && '  사고('+accidentNum+')'}
            </Text>
            <View
                style={{
                    marginTop: 10,
                    marginBottom: 10,
                    borderBottomColor: 'black',
                    borderBottomWidth: 1,
                }}
            />
            <Text style={{fontWeight: "bold"}}>마일리지  :  +{drivingDistance*100}</Text>
            <Text style={{fontWeight: "bold"}}>                    {speedingNum && '-'+speedingNum*100}</Text>
            <Text style={{fontWeight: "bold"}}>                    {sharpLowSpeedNum && '-'+sharpLowSpeedNum*10}</Text>
            <Text style={{fontWeight: "bold"}}>                    {sharpHighSpeedNum && '-'+sharpHighSpeedNum*10}</Text>
            <Text style={{fontWeight: "bold"}}>                    {accidentNum && '-'+accidentNum*10}</Text>
            <View
                style={{
                    marginTop: 10,
                    marginBottom: 10,
                    borderBottomColor: 'black',
                    borderBottomWidth: 1,
                }}
            />
            <Text style={{fontWeight: "bold"}}>                     {ResultMile > 0 ? '+'+ResultMile : null}</Text>
            <View style={{ marginTop: 40,  marginRight: 100, marginLeft: 100}}>
                <Button title="적립" onPress={() => navigation.navigate('Map')}/>
            </View>
        </Container>
    );
};

export default MapResult;