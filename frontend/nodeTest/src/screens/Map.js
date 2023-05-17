import React, {useState, useEffect, useRef} from 'react';
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
import { SERVER_ADDRESS } from '../../global';
import { speedingNum } from './FreeMap';

export default function FreeMap({navigation}) {
    const [links, setLinks] = useState([]);
    const [nodes, setNodes] = useState([]);
    
    const postNodes = async () => { //경로 받아오기
       
            try {
                const response = await axios.post(SERVER_ADDRESS + '/test',{userId:"jo1234"});
                
                var array = [];
                
                var path = response.data.testLinks;
                var nodes = response.data.testNodes;
                path.map(route=>{
                    let color = 0;
                    if(route.score <10) color=0;
                    else if (route.score < 20) color =100;
                    else color = 200;
                    array = [...array,{coord : [{latitude: route.startLatitude,longitude:route.startLongitude},{latitude: route.destLatitude,longitude:route.destLongitude}], color:color,score:route.score}];
                })
                
                setLinks(array);
                setNodes(nodes);
                
            }

            catch (error) {
                console.error(error);
            
        }
    }
    const handlePolylinePress = () => {
        // Polyline을 터치했을 때 실행할 함수
        console.log('Polyline Pressed');
        
      };
    useEffect(()=>{postNodes();},[]);
  
     

    
    // if (!initialRegion) {
    //     return (
    //       <View>
    //         <Text>Splash Screen</Text>
    //       </View>
    //     );
    // }


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
                style={styles.mapContainer}
                
                followsUserLocation={true}
                zoomEnabled={true}
                minZoomLevel={10}  // 클수록 조금밖에 축소안됨
                showsUserLocation={true}
                LoadingEnabled={true}
                
            >
                
                {
                   nodes && nodes.map((node,index)=>{
                   return (<Marker  coordinate={node} key={index} onPress={()=>console.log(node)}/> )
                   
                })
                }
                
                {
                   
                    links && links.map((l,index)=>{
                        return(<Polyline
                        key={index}
                    coordinates={l.coord}
                    strokeColor={"rgb("+l.color+",100,0)"}
                    strokeWidth={6}
                    onPress={()=>console.log(l)}
                    tappable={true}
                    />);

                    }
                    )
                    /*
                    <Polyline
                    coordinates={coordinates}
                    strokeColor="#6E6E6E"
                    strokeWidth={6}
                    />
                    */
                }
                
                
                
            
            </MapView>
            
            {/* 속도와 button 상태창 */}

         
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