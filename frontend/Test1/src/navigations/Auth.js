import React, {useContext} from "react";
import { ThemeContext } from "styled-components/native";
import {createStackNavigator} from '@react-navigation/stack';
import { Signin, Signup, Profile, Map, MapResult, UserPage } from '../screens';


{/*
    화면이동 경로 설정

    headerTitleAlign : 타이틀 중앙 정렬
    headerBackTitleVisible : 백 부분 타이틀 출력 X
    screenOptions - cardStyle : 
*/}

const Stack = createStackNavigator();

const Auth = () => {
    const theme = useContext(ThemeContext);

    return (
        <Stack.Navigator screenOptions={{
            cardStyle: { backgroundColor : theme.background},
        }}>
            <Stack.Screen 
                name="Signin" 
                component={Signin} 
                options={{headerShown: false}} 
            />
            <Stack.Screen 
                name="Signup" 
                component={Signup}
                options={{
                    headerTitleAlign: 'center',
                    headerBackTitleVisible: false,
                    headerTintColor: theme.text,
                    
                }}
            />
            <Stack.Screen 
                name="Profile" 
                component={Profile}  
            />
            <Stack.Screen 
                name="Map" 
                component={Map}  
            />
            <Stack.Screen 
                name="MapResult" 
                component={MapResult}  
            />
            <Stack.Screen 
                name="UserPage" 
                component={UserPage}  
            />
        </Stack.Navigator>
    );
};

export default Auth;