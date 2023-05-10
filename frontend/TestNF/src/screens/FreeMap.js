import React, {useState, useEffect} from 'react';
import {View, Text,ImageBackground, StyleSheet, TouchableOpacity, Platform, PermissionsAndroid, Dimensions} from 'react-native';
import MapView, {Marker, Polyline, AnimatedRegion, MarkerAnimated, Overlay} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { Divider, Button } from '@rneui/themed';
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
    const [now,setNow] =useState(null);
    const [destination, setDestination] = useState(null); //목적지 좌표
    const [accData,setAccData]=useState({px:0,py:0,pz:0,x:0,y:0,z:0}); //가속센서 데이터
    const [gyroTimeStamp,setGyroTimeStamp]=useState(null); //방향센서 데이터
    const [accMessage,setAccMessage]=useState(false); //급가속 경고 메시지 on off
    const [gyroMessage,setGyroMessage]=useState(false); //급커브 경고 메시지 on off
    const [speedMessage,setSpeedMessage]=useState(false); //과속 경고 메시지 on off
    const [accidentMessage,setAccidentMessage]=useState(false); //과속 경고 메시지 on off
    const [coordinates, setCoordinates] = useState([]); //이동경로
    const [distance, setDistance] = useState(null); //이동거리
    const [speed,setSpeed]=useState(0);
    const [prevLocation, setPrevLocation] = useState(null);
    const [prevTimestamp,setPrevTimeStamp]=useState(null); //속도측정용 timestamp
    const [naviMode,setNaviMode] = useState({routes:[],accCheckMode:false,gyroCheckMode:false});


    setUpdateIntervalForType(SensorTypes.accelerometer, 500); // defaults to 100ms
    setUpdateIntervalForType(SensorTypes.gyroscope, 500); // defaults to 100ms

    //가속
    let px=0;
    let py=0;
    let pz=9.8; 
    let previousTimestamp = 0; // 이전 측정 시간
    

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
                    if(nowSpeed>30) {
                        //setSpeedMessage(true);
                        //console.log("과속 감지!")
                    }
                    

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
            //enableHighAccuracy: true,
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
                    const prevAcc = Math.sqrt(px*px+py*py+pz*pz)
                    const nowAcc = Math.sqrt(x*x+y*y+z*z)
                    if(prevAcc+2 < nowAcc && prevAcc + 8 > nowAcc ) {
                        setAccMessage(true); //2m/ss 이상 가속시 경고
                        console.log('급가속 감지!: '+ (prevAcc-nowAcc));
                    }else if(prevAcc + 8 <= nowAcc){
                        setAccidentMessage(true); //2m/ss 이상 가속시 경고
                        console.log('사고 감지!(급가속): '+ (prevAcc-nowAcc));

                    }
                    px=x;
                    py=y;
                    pz=z;
                    setAccData({x:x,y:y,z:z});
                });
        }
        if(naviMode.gyroCheckMode){
            subscription = gyroscope.subscribe(({ x, y, z, timestamp }) =>
                {
                    const dt = (timestamp - previousTimestamp) / 1000; // 시간 변화량 (s)
                    const dz = z * dt; // x 축 회전 각도 변화량 (rad)
                    const rotate = Math.abs(dz) / dt * (180 / Math.PI);
                    if (dt && rotate > 120 && rotate < 240) {
                        setGyroMessage(true);
                        console.log('급커브 감지!: '+rotate);
                    }else if(rotate >= 240){
                        setAccidentMessage(true);
                        console.log('사고 감지!(급커브): '+rotate);
                    }
                    previousTimestamp = timestamp;

                });
        }

    },[naviMode])
    const [initialRegion, setInitialRegion] = useState(null);

    useEffect(() => {
      Geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          console.log(longitude)
          console.log(latitude)
          setNow({latitude: latitude, longitude:longitude});
          setInitialRegion({
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.0166,
            longitudeDelta: 0.0010,
          });
        },
        error => console.log(error),
        { //enableHighAccuracy: true, 
            timeout: 20000, 
            maximumAge: 1000 }
      );
    }, []);
    
    const postNodes = async () => { //경로 받아오기
        if(destination == null || now == null){
            console.log(now)
            console.log(destination)
            console.log("좌표설정이 안되어있습니다.")
        }else{
            try {
                const response = await axios.post('http://192.168.35.227:8080/path', {
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
    // if (!initialRegion) {
    //     return (
    //       <View>
    //         <Text>Splash Screen</Text>
    //       </View>
    //     );
    // }


    return (
        <View style={styles.container}>
             {gyroMessage? 
                    <TouchableOpacity
                        onPress={()=>setGyroMessage(false)}
                        style={styles.warning}
                        >
                        <Text style={styles.warningText}>급커브 경고</Text>
                    </TouchableOpacity>: null
                }
                {speedMessage? 
                    <TouchableOpacity
                        onPress={()=>setSpeedMessage(false)}
                        style={styles.warning}
                        >
                        <Text style={styles.warningText}>과속 경고</Text>
                    </TouchableOpacity>: null
                }
                {accMessage? 
                    <TouchableOpacity
                        onPress={()=>setAccMessage(false)}
                        style={styles.warning}
                        >
                        <Text style={styles.warningText}>급가속 경고</Text>
                        
                    </TouchableOpacity>: null
                }
                {accidentMessage? 
                    <TouchableOpacity
                        onPress={()=>setAccidentMessage(false)}
                        style={[styles.warning,{backgroundColor:"#FF6D60"}]}
                        >
                        <Text style={styles.warningText}>사고 감지</Text>
                        
                    </TouchableOpacity>: null
                }
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
                style={styles.mapContainer}
                initialRegion={initialRegion}
                followsUserLocation={true}
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

            {/* 속도와 button 상태창 */}

           <View 
                style={{
                    flex: 1,
                    backgroundColor: '#0080FF',
                    margin: 0,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    borderRadius: 2,
                }}
            >

                {/* 속도창 */}
                

                <View
                    style={{
                        flex: 2,
                        //backgroundColor: 'green',
                        margin: 0,
                        //alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'row',
                    }}
                >
                    <Text style={{
                        color: 'white',
                        //backgroundColor: 'orange',
                        fontSize: 35,

                        fontWeight: 600,
                    }}> 
                        23
                    </Text>
                    <View
                        style={{
                            justifyContent: 'flex-end',
                            paddingBottom: 4,
                        }}    
                    >
                        <Text style={{
                            color: 'white',
                            //backgroundColor: 'red',
                            fontSize: 23,
                            fontWeight: 500,
                            }}
                            
                        >
                            km
                        </Text>
                    </View>
                </View>

                <Divider color='white' orientation="vertical" width={3} />

                {/* 경로 안내와 주행 종료 버튼 */}

                <View
                    style={{
                        flex: 3,
                        //backgroundColor: 'purple',
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        margin: 2,
                    }}
                >
                    <Button
                        title="경로 안내"
                        buttonStyle={{
                            backgroundColor : 'rgba(111, 202, 186, 1)',
                            borderRadius: 5,
                        }}
                        type="solid"
                        titleStyle={{ color: 'white' }}
                        onPress={postNodes}
                    />

                    <Button
                        title="주행 종료"
                        buttonStyle={{
                            backgroundColor : 'rgba(255, 193, 7, 1)',
                            borderRadius: 5,
                        }}
                        type="solid"
                        titleStyle={{ color: 'white' }}
                    />
                </View>
            </View>
            
            
            
        </View>
        
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        margin:5,
        //alignItems: 'center',
        backgroundColor:"white",

    },
    mapContainer: {
        width: '100%',
        height: '90%',
        
      },
    warning:{
        position:"absolute",
        left: "20%",
        marginLeft:-50,
        zIndex:3,
        width:130,
        height:100,
        justifyContent:"center",
        backgroundColor: "#FFD95A",
        borderColor:"#4C3D3D",
        borderBottomWidth:15,
        borderTopWidth:15,
        borderWidth:2,
        borderRadius:5
        
    },
    warningText:{
        color:"black",
        left: "20%",
        marginLeft:-15,
        zIndex:3,
        fontSize:20
    },
    
    interface:{
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        height: '10%',
        width:'100%'
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
    speedStyle:{
        width:50,
        height:50,
        display:"flex",
        marginHorizontal:30,
        backgroundColor:"white",
        borderRadius:50,
        borderColor:"black",
        borderWidth:2,

    },
    buttonText:{
        color:"black",
        fontSize:15
    },
    buttonContainer:{
        display:"flex",
        padding:10,
        backgroundColor:"white",
        marginHorizontal:5,
        borderRadius:10,
        borderColor:"black",
        borderWidth:2,
    }
    
})

export { drivingDistance, speedingNum, sharpLowSpeedNum, sharpHighSpeedNum, accidentNum }