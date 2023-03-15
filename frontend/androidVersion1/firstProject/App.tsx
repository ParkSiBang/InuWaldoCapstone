import React, { useState, useEffect } from 'react';
import { View, Text } from "react-native";
import MapView, { Polyline, PROVIDER_GOOGLE } from "react-native-maps";
import {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { TouchableOpacity, StyleSheet } from "react-native";
import moment from 'moment';
import useInterval from './customHooks/useInterval';
import axios from 'axios';

function App() {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLogitude] = useState(0);
  const [time, setTime] = useState(moment.duration(0,'seconds'));
  const [focus, setFocus] = useState(true);
  const [region, setRegion]=useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.0922, 
    longitudeDelta: 0.0421
  })
  const tick = () => {
    setTime(prevTime => prevTime.clone().add(1, 'seconds'));
  };
  const [route,setRoute] = useState("");
  useEffect(() => {
    setRegion(
      {
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.0922, 
        longitudeDelta: 0.0421
      }
    )
  }, [latitude,longitude]);
  const timer = useInterval(() => {
    if (focus) {
      tick();
    }
    
  }, 1000);

  

  const timerSwitch = () =>{
    if(!focus){
      setFocus(true)
    }
    else{
      setFocus(false);
    }
  }
  const getRoutes = () =>{
    
    /*axios.post("http://localhost:8080/path",
    {
      startLatitude: latitude,
      startLongitude: longitude,
      destLatitude: 37.385805, //임의로 3010노드를 목적지로 삼음
      destLongitude: 126.645977
    }).then(function (res){
      console.log(res);
    }).catch(function (error) {
      console.log(error);
    });
    */
    axios.get("http://localhost:8080/hello").then(function (res){
      console.log(res);
    }).catch(function (error){
      console.log(error);
    });
  
  }
    
  
  

  const geoLocation = () => {
    Geolocation.getCurrentPosition(
        position => {
            const latitude = parseFloat(JSON.stringify(position.coords.latitude));
            const longitude = parseFloat(JSON.stringify(position.coords.longitude));

            setLatitude(latitude);
            setLogitude(longitude);
        },
        error => { console.log(error.code, error.message); },
        //{enableHighAccuracy:true, timeout: 15000, maximumAge: 10000 },
    )
}


  return (
    <>
      <View style={{ flex: 1 }}>
        <TouchableOpacity onPress={() => geoLocation()}>
          <Text> Get GeoLocation </Text>
        </TouchableOpacity>
        
        <Text> latitude: {latitude} </Text>
        <Text> longitude: {longitude} </Text>

        <TouchableOpacity onPress={() => timerSwitch()}>
            <Text>
              Timer
            </Text>
        </TouchableOpacity>
        <Text> time: {time.asMilliseconds()}</Text>
        <Text> route: {route}</Text>

        <TouchableOpacity onPress={() => getRoutes()}>
            <Text>
              현재위치 전송
            </Text>
        </TouchableOpacity>

        <MapView
          showsUserLocation={true}
          region={region}
          style={{ flex: 1 }}
          provider={PROVIDER_GOOGLE}
          
        >
          <Polyline
          strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
          strokeColors={['#7F0000']}
          strokeWidth={6}

          coordinates={[
          {
            latitude: 37.388485,
            longitude: 126.641808,
          },
          {
            latitude: 37.388325            ,
            longitude: 126.642054            ,
          },
          {
            latitude: 37.388436
            ,
            longitude: 126.642309
            ,
          },
          {
            latitude: 37.388494
            ,
            longitude: 126.642259
            ,
          },
          {
            latitude: 37.388334
            ,
            longitude: 126.642515
            ,
          },
          {
            latitude: 37.388127
            ,
            longitude: 126.642338

            ,
          },
          {
            latitude: 37.387006

            ,
            longitude: 126.644011

            ,
          },
          {
            latitude: 37.386044
            ,
            longitude: 126.645713
            ,
          },
          ]}>

          </Polyline>
          
        </MapView>

        
      </View>
    </>
  );
}

export default App;