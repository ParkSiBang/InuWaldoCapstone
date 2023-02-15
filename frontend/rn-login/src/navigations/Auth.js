import React, {useContext} from "react";
import { ThemeContext } from "styled-components/native";
import {createStackNavigator} from '@react-navigation/stack';
import { Signin, Signup } from '../screens';
import {MaterialIcons} from '@expo/vector-icons';

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
                    headerleft: ({onPress, tintColor}) => (
                        <MaterialIcons 
                            name='keyboard-arrow-left'
                            size={38}
                            color={tintColor}
                            onPress={onPress}
                        />
                    ),
                }}
            />
        </Stack.Navigator>
    );
};

export default Auth;