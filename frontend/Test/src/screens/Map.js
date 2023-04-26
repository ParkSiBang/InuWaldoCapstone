import React, {useState, useEffect} from 'react';
import {View, Text,Image, StyleSheet, TouchableOpacity, Platform, PermissionsAndroid, Dimensions} from 'react-native';
import MapView, {Marker, Polyline, AnimatedRegion, MarkerAnimated, Overlay} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { Button } from './components';
import axios from 'axios';
const {width, height} = Dimensions.get('screen');
import { 
    accelerometer,
    gyroscope,
    setUpdateIntervalForType,
    SensorTypes 
    } from "react-native-sensors";
import { getDistance } from 'geolib'; //좌표 사이거리 계산

let drivingDistance = 3.5;
let speedingNum = 1.2;      // 과속
let sharpLowSpeedNum = 2;   // 급감속
let sharpHighSpeedNum = 3;  // 급과속
let accidentNum = 1;        // 사고 횟수

export default function Map({navigation}) {
    const [region, setRegion] = useState(null); 
    const [now,setNow] =useState(null);
    const [destination, setDestination] = useState(null); //목적지 좌표
    const [accData,setAccData]=useState({px:0,py:0,pz:0,x:0,y:0,z:0}); //가속센서 데이터
    const [gyroData,setGyroData]=useState({px:0,py:0,pz:0,x:0,y:0,z:0}); //방향센서 데이터
    const [accMessage,setAccMessage]=useState(false); //급가속 경고 메시지 on off
    const [gyroMessage,setGyroMessage]=useState(false); //급커브 경고 메시지 on off
    const [coordinates, setCoordinates] = useState([]); //이동경로
    const [distance, setDistance] = useState(null); //이동거리
    const [speed,setSpeed]=useState(0);
    const [prevLocation, setPrevLocation] = useState(null);
    const [prevTimestamp,setPrevTimeStamp]=useState(null); //속도측정용 timestamp
    const [naviMode,setNaviMode] = useState({routes:[],accCheckMode:false,gyroCheckMode:false});


    setUpdateIntervalForType(SensorTypes.accelerometer, 500); // defaults to 100ms
    setUpdateIntervalForType(SensorTypes.gyroscope, 500); // defaults to 100ms
    let px=0;
    let py=0;
    let pz=9.8;
    let subscription = null; //가속
    let subscription2 = null; //자이로
    
    

    useEffect(() => {
        const watchId = Geolocation.watchPosition(
          position => {
            const { latitude, longitude } = position.coords;
            const timestamp= position.timestamp;
            const newCoordinate = { latitude, longitude };
            if(coordinates.length < 10000){// 메모리 방지.
            setCoordinates([...coordinates, newCoordinate]);
            }

            if (prevLocation) {
                const newDistance = getDistance(prevLocation, position.coords);
                const timeDiff = timestamp-prevTimestamp
                const nowSpeed= (newDistance/timeDiff)*3600000; //km/hr
                if(prevTimestamp){
                    
                    setSpeed(nowSpeed);
                }
                
                setDistance(distance + newDistance);
              }
            setNow({
                latitude: latitude,
                longitude: longitude
            })
            setPrevTimeStamp(timestamp);
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

    
    
    useEffect(()=>{
        if(naviMode.accCheckMode){
            subscription = accelerometer.subscribe(({ x, y, z, timestamp }) =>
                {
                    if(Math.sqrt(px*px+py*py+pz*pz)+2 < Math.sqrt(x*x+y*y+z*z)) setAccMessage(true); //2m/ss 이상 가속시 경고
                    px=x;
                    py=y;
                    pz=z;
                    setAccData({x:x,y:y,z:z});
                });
        }
        if(naviMode.gyroCheckMode){
            subscription = gyroscope.subscribe(({ x, y, z, timestamp }) =>
                {
                    setGyroData({x:x,y:y,z:z});
                });
        }

    },[naviMode])
    
    const geoLocation = () => {
        Geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude, timestamp } = position.coords;
                
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
                setNaviMode({routes:array,accCheckMode:true,gyroCheckMode:true});

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
            
            <View style={styles.interface}>
                {accMessage? 
                    <TouchableOpacity
                        onPress={()=>setAccMessage(false)}
                        style={styles.warning}
                        >
                        <Text style={styles.warningText}>급가속 경고</Text>
                    </TouchableOpacity>: null
                }
                <View style={styles.states}>
                    <Text style={styles.text}>가속도: {Math.sqrt(accData.x*accData.x+accData.y*accData.y+accData.z*accData.z) - 9.8 }</Text>
                    <Text style={styles.text}>속도: {speed} </Text>
                    <Text style={styles.text}>방향: {gyroData.x}, {gyroData.y}, {gyroData.z} </Text>
                    <Text style={styles.text}>이동거리: {distance} </Text>
                </View>

                <View style={styles.buttons}>
                    {/*<Button title="경로안내" onPress={postNodes} textStyle={styles.buttonText} containerStyle={styles.buttonContainer}></Button>
                    <Button title="급가속체크" onPress={()=>{
                        if(accCheckMode){
                            setAccCheckmode(false)
                        }else{
                            setAccCheckmode(true)
                        }
                        }} textStyle={styles.buttonText} containerStyle={styles.buttonContainer}>
                    </Button>
                    <Button title="방향체크" onPress={()=>{
                        if(accCheckMode){
                            setGyroCheckMode(false)
                        }else{
                            setGyroCheckMode(true)
                        }
                        }} textStyle={styles.buttonText} containerStyle={styles.buttonContainer}>
                    </Button>*/}
                    <TouchableOpacity
                        onPress={postNodes}
                        style={styles.buttonContainer}
                    >
                        <Text style={styles.buttonText}>경로안내</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        
                        style={styles.buttonContainer}
                    >
                        <Text 
                            style={styles.buttonText}
                            onPress={() => navigation.navigate('MapResult')}
                        >안내종료</Text>
                    </TouchableOpacity>
                    

                </View>
                
                

            </View>
            
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
                coordinates={naviMode.routes}
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
        margin:5,
        alignItems: 'center',
        backgroundColor:"white",
        
        
    },
    warning:{
        position:"absolute",
        left: "50%",
        marginLeft:-50,
        zIndex:3,
        width:100,
        height:100,
        justifyContent:"center",
        backgroundColor: "orange",
        borderColor:"black",
        borderWidth:3,
    },
    warningText:{
        color:"black",
        fontSize:20
    },
    interface:{
        display:"flex",
        flexDirection:"column",
        margin:10,
        padding:10,
        height: 200,
        width:400,
        borderRadius:30,
        border:"solid",
        backgroundColor:"white",
        borderColor:"black",
        borderWidth:3,
        
    },
    text:{
        color:"black",
        fontSize:10,
    },
    states:{
        display:"flex",
        padding:5,
        margin:5,
        height:90,
        borderRadius:10,
        borderColor:"black",
        borderWidth:3,
        backgroundColor:"white"
    },
    buttons:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"center",
        padding:10,
        margin:5,
        borderRadius:10,
        height:70,
        backgroundColor:"white",
        borderColor:"black",
        borderWidth:3,
        
    },
    buttonText:{
        color:"black",
        fontSize:15
    },
    buttonContainer:{
        display:"flex",
        marginHorizontal:30,
        padding:10,
        
        backgroundColor:"white",
        borderRadius:10,
        borderColor:"black",
        borderWidth:2,
    }
})

export { drivingDistance, speedingNum, sharpLowSpeedNum, sharpHighSpeedNum, accidentNum }