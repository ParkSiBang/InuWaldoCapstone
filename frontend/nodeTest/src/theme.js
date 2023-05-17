const Colors = {
    white: '#ffffff',
    black: '#111111',
    main: '#3679fe',
    grey_0: '#d5d5d5',
    grey_1: '#a6a6a6',
};

export const theme = {
    background: Colors.white,
    text: Colors.black,

    //Button
    btnBackground: Colors.main,
    btnTitle: Colors.white,
    
    // 배경색이 없는 버튼을 위한 색 정의
    btnTextLink: Colors.main,

    // 이미지가 없을 때 출력할 빈 공간, 
    imgBackground: Colors.grey_0,
    // 사진 입력버튼 아이콘, 배경색
    imgBtnBackground: Colors.grey_1,
    imgBtnIcon: Colors.white,

    inputBackground: Colors.white,
    inputLabel: Colors.grey_1,
    inputPlaceholder: Colors.grey_1,
    inputBorder: Colors.grey_1,
};