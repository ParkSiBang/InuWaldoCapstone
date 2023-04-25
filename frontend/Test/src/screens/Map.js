import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Platform, PermissionsAndroid, Dimensions} from 'react-native';
import MapView, {Marker, Polyline, AnimatedRegion, MarkerAnimated} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { Button } from '../components';
import axios from 'axios';
const {width, height} = Dimensions.get('screen');
import { 
    accelerometer,
    gyroscope,
    setUpdateIntervalForType,
    SensorTypes 
    } from "react-native-sensors";
import { getDistance } from 'geolib'; //좌표 사이거리 계산

const Map = ({navigation}) => {
    const [region, setRegion] = useState(null); 
    const [now,setNow] =useState(null);
    const [destination, setDestination] = useState(null); //목적지 좌표
    const [routes,setRoutes] = useState([]); //안내 경로
    const [accCheckMode,setAccCheckmode]=useState(false); //가속체크 on off
    const [gyroCheckMode,setGyroCheckMode]=useState(false); //방향체크 on off
    const [accData,setAccData]=useState({px:0,py:0,pz:0,x:0,y:0,z:0}); //가속센서 데이터
    const [gyroData,setGyroData]=useState({px:0,py:0,pz:0,x:0,y:0,z:0}); //방향센서 데이터
    const [accMessage,setAccMessage]=useState(false); //급가속 경고 메시지 on off
    const [gyroMessage,setGyroMessage]=useState(false);
    const [coordinates, setCoordinates] = useState([]); //이동경로
    const [distance, setDistance] = useState(0); //이동거리
    const [prevLocation, setPrevLocation] = useState(null);

    setUpdateIntervalForType(SensorTypes.accelerometer, 100); // defaults to 100ms
    setUpdateIntervalForType(SensorTypes.gyroscope, 100); // defaults to 100ms
    let px=0;
    let py=0;
    let pz=9.8;
    let subscription = null; //가속
    let subscription2 = null; //자이로

    
    
    useEffect(() => {
        geoLocation();
            }
    , [])

    useEffect(() => {
        const watchId = Geolocation.watchPosition(
          position => {
            const { latitude, longitude } = position.coords;
            const newCoordinate = { latitude, longitude };
            setCoordinates([...coordinates, newCoordinate]);

            if (prevLocation) {
                const newDistance = getDistance(prevLocation, position.coords);
                setDistance(distance + newDistance);
              }
            setPrevLocation(position.coords);
          },
          error => {
            console.log(error);
          },
          {
            enableHighAccuracy: true,
            distanceFilter: 10,
            interval: 1000,
            fastestInterval: 1000
          }
        );
        return () => {
          Geolocation.clearWatch(watchId);
        };
      }, [coordinates]);

    useEffect(() => {
        if(accCheckMode){
            subscription = accelerometer.subscribe(({ x, y, z, timestamp }) =>
                {
                    if(Math.sqrt(px*px+py*py+pz*pz)+2 < Math.sqrt(x*x+y*y+z*z)) setAccMessage(true); //2m/ss 이상 가속시 경고
                    px=x;
                    py=y;
                    pz=z;
                    setAccData({x:x,y:y,z:z});
                });
        }
        
        
    }, [accCheckMode])
    useEffect(() => {
        if(gyroCheckMode){
            subscription2 = gyroscope.subscribe(({ x, y, z, timestamp }) =>
                {
                    setGyroData({x:x,y:y,z:z});
                });
        }

    }, [gyroCheckMode])
    
    
    const geoLocation = () => {
        Geolocation.getCurrentPosition(
            position => {
                
                const latitude = parseFloat(JSON.stringify(position.coords.latitude));
                const longitude = parseFloat(JSON.stringify(position.coords.longitude));
                console.log('LAT: ', position.coords.latitude);
                console.log('LONG: ', position.coords.longitude);
                setNow({
                    latitude: position.coords.latitude,
                    longitude: position.coords.latitude,
                    
                })
                

            },
            error => { console.log(error.code, error.message); },
            //{enableHighAccuracy:true, timeout: 15000, maximumAge: 10000 },
        )
    }
    const postNodes = async () => { //경로 받아오기
        if(destination == null || now == null){
            console.log("좌표설정이 안되어있습니다.")
        }else{
            try {
                const response = await axios.post('http://192.168.55.240:8080/path', {
                   startLatitude: `${now.latitude}`,
                   startLongitude: `${now.longitude}`,
                   destLatitude: `${destination.coords.latitude}`,
                   destLongitude: `${destination.coords.longitude}`
                });
                
                var array = [];
                
                var path = response.data.fastestPath;
                
                path.map(route=>{
                    array = [...array,{latitude: route.startLatitude,longitude:route.startLongitude}];
                    array = [...array,{latitude: route.destLatitude,longitude:route.destLongitude}];
                })
                console.log(array);
                setRoutes(array);

                }

              catch (error) {
                console.error(error);
             }
        }
    }
  
     

    function newMarker(e){ //목적지 설정
        console.log(e.nativeEvent.coordinate.latitude);
        console.log(e.nativeEvent.coordinate.longitude);
        let data = {
            coords:{
                latitude: e.nativeEvent.coordinate.latitude,
                longitude: e.nativeEvent.coordinate.longitude
            },
            pinColor: '#FF0000'
        }

        setDestination(data);
        
    }



    return (
        <View style={styles.container}>
            {accMessage? <Button title="급가속 경고" onPress={()=>setAccMessage(false)} containerStyle={styles.warining}></Button> : null}
            <Button title="경로안내" onPress={postNodes}></Button>
            <Button title="급가속체크" onPress={()=>{
                if(accCheckMode){
                    setAccCheckmode(false)
                }else{
                    setAccCheckmode(true)
                }
                }}></Button>
            <Button title="방향체크" onPress={()=>{
                if(accCheckMode){
                    setGyroCheckMode(false)
                }else{
                    setGyroCheckMode(true)
                }
                }}></Button>
            <Text>가속도: {Math.sqrt(accData.x*accData.x+accData.y*accData.y+accData.z*accData.z) - 9.8 }</Text>
            <Text>방향: {gyroData.x}, {gyroData.y}, {gyroData.z} </Text>
            <Text>이동거리: {distance} </Text>
            <MapView
                onMapReady={() => {
                    Platform.OS === 'android' ?
                    PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
                        .then(() => {
                            console.log("asdf")
                        })
                    : ''
                }}
                style={{width: width, height: height}}
                region={region}
                zoomEnabled={true}
                minZoomLevel={10}  // 클수록 조금밖에 축소안됨
                showsUserLocation={true}
                LoadingEnabled={true}
                onPress={(e) => newMarker(e)}
            >
                
                {
                    destination ? <Marker  coordinate={destination.coords} pinColor={destination.pinColor}/> : null
                }
                <Polyline
                strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
                strokeColors={['#7F0000']}
                strokeWidth={6}
                coordinates={routes}
                >
                </Polyline>
                <Polyline
                    coordinates={coordinates}
                    strokeColor="#FF0000"
                    strokeWidth={2}
                />
                
            
            </MapView>
            
        </View>
        
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center'
    },
    warining:{
        backgroundColor: "orange"
    }
})

export default Map;