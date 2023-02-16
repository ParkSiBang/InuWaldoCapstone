import React, { useContext, useState, useRef } from 'react';
import { ThemeContext } from 'styled-components/native';
import styled from 'styled-components/native';
import { Button, Image, Input } from '../components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { signin } from '../firebase';
import { Alert } from 'react-native';
import { validateEmail, removeWhitespace } from '../utils';

// 로그인 화면

{/*
    insets : 위로 올리는 과정
    contentContainerStyle : 그냥 keyboardscroll 만 쓰면 로그인화면이 위로 올라감

*/}
const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => theme.background};
    padding: 0 20px;
    padding-top: ${({ insets: { top } }) => top}px;
    padding-bottom: ${({ insets: { bottom } }) => bottom}px;
`;

// firebase 저장소에서 logo.png 불러온 부분
const LOGO=
    'https://firebasestorage.googleapis.com/v0/b/login-dba07.appspot.com/o/logo.png?alt=media';

const Signin = ({navigation}) => {

    const insets = useSafeAreaInsets();
    const theme = useContext(ThemeContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const refPassword = useRef(null);

    const _handleEmailChange = email => {
        const changedEmail = removeWhitespace(email);
        setEmail(changedEmail);
    };

    const _handlePasswordChange = password => {
        setPassword(removeWhitespace(password));
    };

    // email과 password 확인 후, 이상없으면 profile 화면으로 이동
    const _handleSigninBtnPress = async () => {
        try{
            const user= await signin({email, password});
            navigation.navigate('Profile', {user});
        } catch (e) {
            Alert.alert('Signin Error', e.message)
        }
    };

    return (
        <KeyboardAwareScrollView 
            extraScrollHeight={20}
            contentContainerStyle={{ flex: 1 }} 
        >
            <Container insets={insets}>
                <Image url={LOGO} />
                <Input
                    label="Email"
                    placeholder="Email"
                    returnKeyType="next"
                    value={email}
                    onChangeText={_handleEmailChange}
                    onSubmitEditing={() => refPassword.current.focus()}           
                />
                <Input
                    ref={refPassword}
                    label="Password"
                    placeholder="Password"
                    returnKeyType="done"
                    value={password}
                    onChangeText={_handlePasswordChange}
                    isPassword={true}
                    onSubmitEditing={_handleSigninBtnPress}
                />
                <Button 
                    title="Sign in" 
                    onPress={_handleSigninBtnPress} 
                />
                <Button 
                    title="or sign up" 
                    onPress={() => navigation.navigate('Signup')}
                    containerStyle={{ marginTop: 0, backgroundColor: 'transparent' }}
                    textStyle={{ color: theme.btnTextLink, fontSize: 18 }}
                />
            </Container>
        </KeyboardAwareScrollView>
    );
};

export default Signin;