import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Platform, PermissionsAndroid, Dimensions} from 'react-native';
import MapView, {Marker, Polyline} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { Button } from './components';
import axios from 'axios';
const {width, height} = Dimensions.get('screen');

export default function App() {
    const [region, setRegion] = useState(null); 
    const [now,setNow] =useState(null);
    const [destination, setDestination] = useState(null);
    const [routes,setRoutes] = useState([]);

    useEffect(() => {
        geoLocation();
    }, [])
    /*

    function getMyLocation(){
        Geolocation.getCurrentPosition(
            (position) => {
                console.log('LAT: ', position.coords.latitude);
                console.log('LONG: ', position.coords.longitude);

                setRegion({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: 0.922,
                    longitudeDelta: 0.0421
                })
            },
            () => { console.log("에러")}, {
                enableHighAccuracy: true,
                timeout: 2000,
            }
        );
    }
    */
    
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
    const postNodes = async () => {
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
            <Button title="hello" onPress={postNodes}>
            </Button>
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
                   
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center'
    },
})