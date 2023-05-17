import React, { useState, useRef } from 'react';
import styled from 'styled-components/native';
import { Button, Input } from '../components';
import {Image, Alert} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios';
import { SERVER_ADDRESS } from '../../global';


{/*
    회원 가입 화면
    extraScrollHeight : 자판과 input 부분 거리 설정

*/}

const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => theme.background};
    padding: 50px 20px;
`;

export const Signup = () => {
    // 갤러리에서 불러온 사진 정보
    const [name, setName] = useState('');    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const refEmail = useRef(null);
    const refPassword = useRef(null);
    const refPasswordConfirm = useRef(null);

    const _handleSignupBtnPress = async () => {
        try {
            const response = await axios.post(SERVER_ADDRESS + '/join', {
               userId: email,
               password:password,
               name:name
            });
            console.log(response.data);
            if(response.data == "success"){
                //성공시 홈화면으로
            }
            else{
                Alert.alert('Join Error');
            }
            
            
        }

        catch (error) {
            //실패시 경고 출력
            Alert.alert('Join Error', error.message)
        }
    }
    
  

    // 잘못된 회원가입입니다.

    // try {
    //     const response = await axios.post(SERVER_ADDRESS + '/join', {
    //        userID : ${Email}
    //        password : ${PassWord}
    //        Name : ${Name}     
    //     });
    // catch (error){
    //    console.error(error);
    // }

    return (
        <KeyboardAwareScrollView extraScrollHeight={20}>
            <Container>
                <Image
                    source={require('Test/assets/images/face.jpg')}/>
                <Input
                    label="Name"
                    placeholder="Name"
                    returnKeyType="next"
                    value={name}
                    onChangeText={setName}
                    onSubmitEditing={() => refEmail.current.focus()}
                />
                <Input
                    ref={refEmail}
                    label="Email"
                    placeholder="Email"
                    returnKeyType="next"
                    value={email}
                    onChangeText={setEmail}
                    onSubmitEditing={() => refPassword.current.focus()}           
                />
                <Input
                    ref={refPassword}
                    label="Password"
                    placeholder="Password"
                    returnKeyType="next"
                    value={password}
                    onChangeText={setPassword}
                    isPassword={true}
                    onSubmitEditing={() => refPasswordConfirm.current.focus()}
                />
                <Input
                    ref={refPasswordConfirm}
                    label="Password Confirm"
                    placeholder="Password"
                    returnKeyType="done"
                    value={passwordConfirm}
                    onChangeText={setPasswordConfirm}
                    isPassword={true}
                    onSubmitEditing={_handleSignupBtnPress}
                />
                <Button 
                    title="Sign up" 
                    onPress={_handleSignupBtnPress}
                />
            </Container>
        </ KeyboardAwareScrollView>
    );
};

export default Signup;