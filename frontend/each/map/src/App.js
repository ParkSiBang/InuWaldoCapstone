import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Platform, PermissionsAndroid, Dimensions} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

const {width, height} = Dimensions.get('screen');

export default function App() {
    const [region, setRegion] = useState(null); 
    const [markers, setMarkers] = useState([]);

    useEffect(() => {
        getMyLocation()
    }, [])

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

    function newMarker(e){
        console.log(e.nativeEvent.coordinate.latitude);
        console.log(e.nativeEvent.coordinate.longitude);

        let data = {
            key: markers.length,
            coords:{
                latitude: e.nativeEvent.coordinate.latitude,
                longitude: e.nativeEvent.coordinate.longitude
            },
            pinColor: '#FF0000'
        }

        setRegion({
            latitude: e.nativeEvent.coordinate.latitude,
            longitude: e.nativeEvent.coordinate.longitude,
            latitudeDelta: 0.922,
            longitudeDelta: 0.0421
        })

        setMarkers(oldArray => [...oldArray, data])
    }

    return (
        <View style={styles.container}>
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
                minZoomLevel={10}  // 클수록 조금 밖에 축소안됨
                showsUserLocation={true}
                LoadingEnabled={true}
                onPress={(e) => newMarker(e)}
            >
                {markers.map(marker => {
                    return (
                        <Marker key={marker.key} coordinate={marker.coords} pinColor={marker.position}/>
                    )
                } )}
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