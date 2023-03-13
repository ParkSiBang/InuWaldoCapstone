import React, { useEffect } from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import { MaterialIcons } from '@expo/vector-icons';
import { Alert, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

{/*
    showButton : 사진아이콘이 출력여부 결정

    ImagePicker
      launchimagelibraryasync : 기계 사진 조회, 선택 사진 반환
      mediatype : 가져올 파일 유형(여기서 image)
      allowediting : 수정 가능 여부
      aspect: 사진 자르는 비율 결정 (Android만)
      quality: 압축 품질 설정 (0~1)
*/}

const ButtonContainer = styled.TouchableOpacity`
    background-color: ${({theme}) => theme.imgBtnBackground};
    position: absolute;
    bottom: 0;
    right: 0;
    width: 30px;
    height: 30px;
    border-radius: 15px;
    justify-content: center;
    align-items: center;
`;

const ButtonIcon = styled(MaterialIcons).attrs(({ theme }) => ({
    name: 'photo-camera',
    size: 22,
    color: theme.imgBtnIcon,
}))``;

const PhotoButton = ({ onPress }) => {
    return (
      <ButtonContainer onPress={onPress}>
        <ButtonIcon />
      </ButtonContainer>
    );
};
  

const Container = styled.View`
    margin-bottom: 30px;
`;

const ProfileImage = styled.Image`
    background-color: ${({ theme }) => theme.imgBackground};
    width: 100px;
    height: 100px;
    border-radius: 50px;
`;

const Image = ({url, showButton, onChangePhoto}) => {
    // 사진 접근 코드
    useEffect(() => {
        (async () => {
          if (Platform.OS !== 'web') {
            const {
              status,
            } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
              Alert.alert(
                'Photo Permission',
                'Please turn on the camera permission.'
              );
            }
          }
        })();
    }, []);

    const _handlePhotoBtnPress = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.cancelled) {
        onChangePhoto(result.uri);
      }
    };


    return (
        <Container>
            <ProfileImage source={{ uri: url}} />
            {showButton && <PhotoButton onPress={_handlePhotoBtnPress}/>}
        </Container>
    );
};

Image.propTypes = {
    url: PropTypes.string,
    showButton: PropTypes.bool,
    onChangePhoto: PropTypes.func,
};

export default Image;