import React, { useContext, useState, useRef } from 'react';
import { ThemeContext } from 'styled-components/native';
import styled from 'styled-components/native';
import { Button, Input } from '../components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Alert, Image } from 'react-native';
import { validateEmail, removeWhitespace } from '../utils';

// 로그인 화면

{/*
    insets : 위로 올리는 과정
    contentContainerStyle : 그냥 keyboardscroll 만 쓰면 로그인화면이 위로 올라감
    returnkeytype : enter 자리에 해당 행동 실행 next = 다음 인풋으로 / done : input 종료
    onSubmitEditing : enter 누를 때, 실행되는 함수
    focus : 해당 부분으로 이동
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


const Signin = ({navigation}) => {

    const insets = useSafeAreaInsets();
    const theme = useContext(ThemeContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const refPassword = useRef(null);



    // 이 두 개는 모두 공백을 없애는 역할
    const _handleEmailChange = email => {
        const changedEmail = removeWhitespace(email);
        setEmail(changedEmail);
    };

    const _handlePasswordChange = password => {
        setPassword(removeWhitespace(password));
    };


    // email과 password 확인 후, 이상없으면 profile 화면으로 이동
    const _handleSigninBtnPress = async () => {
        
        // signin은 firebase에서 규명, 백엔드 연동시 참조

        // try{
        //     const user= await signin({email, password});
        //     navigation.navigate('Profile', {user});
        // } catch (e) {
        //     Alert.alert('Signin Error', e.message)
        // }

        // 이메일 비밀번호 간단히 확인
        // 현재 이메일 비번 : jobob981218@gmail.com / sun981218

        // if (email == 'jobob981218@gmail.com'){
        //     if (password == 'sun981218'){
        //         navigation.navigate('Profile', {email, password});
        //     }
        //     else {
        //         alert('비밀번호 틀림');
        //     }
        // }
        // else {
        //     alert('이메일 틀림');
        // }

        navigation.navigate('Profile', {email, password});
    };

    return (
        <KeyboardAwareScrollView 
            extraScrollHeight={20}
            contentContainerStyle={{ flex: 1 }} 
        >
            <Container insets={insets}>
                <Image
                    source={require('Test/assets/images/icon1.png')}/>
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
                
                {/* 테스트용 버튼
                
                <Button 
                    title="test button to profile" 
                    onPress={() => navigation.navigate('Profile')}
                />
                <Button 
                    title="test button to UserPage" 
                    onPress={() => navigation.navigate('UserPage')}
                /> */}
            </Container>
        </KeyboardAwareScrollView>
    );
};

export default Signin;