import React, {useState, forwardRef} from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

const Container = styled.View`
  flex-direction: column;
  width: 100%;
  margin: 10px 0;
`;

const Label = styled.Text`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 6px;
  color: ${({ theme, isFocused }) =>
    isFocused ? theme.text : theme.inputLabel};
`;

const StyledInput = styled.TextInput.attrs(({ theme }) => ({
    placeholderTextColor: theme.inputPlaceholder,
  }))`
    background-color: ${({theme}) => theme.inputBackground};
    color: ${({theme}) => theme.text};
    padding: 20px 10px;
    font-size: 16px;
    border: 1px solid
        ${({ theme, isFocused }) => (isFocused ? theme.text : theme.inputBorder)};
    border-radius: 4px;
`;

const Input = forwardRef(
    ({
            label,
            value,
            onChangeText,
            onSubmitEditing,
            onBlur,
            placeholder,
            returnKeyType,
            maxLength,
            isPassword,
    }, ref) => {
    // 현재 Input 입력 중이면, 하이라이트
    const [isFocused, setIsFocused] = useState(false);
    
    return (
        <Container>
            <Label isFocused={isFocused}>
                {label}
            </Label>
            <StyledInput 
                ref={ref}
                value={value}
                onChangeText={onChangeText}
                onSubmitEditing={onSubmitEditing}
                onBlur={() => {
                    setIsFocused(false);
                    onBlur();
                }}
                placeholder={placeholder}
                returnKeyType={returnKeyType}
                maxLength={maxLength}
                autoCapitalize="none"
                autoCorrect={false}
                // ios에서 이메일이 자동완성으로 출력되는 경우 방지
                textContentType="none"
                isFocused={isFocused}
                onFocus={() => setIsFocused(true)}
                // 특수문자로 비밀번호 출력
                secureTextEntry={isPassword}
            />
        </Container>
        );
    }
);

Input.defaultProps={
    onBlur: () => {},
}

Input.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string.isRequired,
    onChangeText: PropTypes.func,
    onSubmitEditing: PropTypes.func,
    onBlur: PropTypes.func,
    placeholder: PropTypes.string,
    returnKeyType: PropTypes.oneOf(['done', 'next']),
    maxLength: PropTypes.number,
    isPassword: PropTypes.bool,

};

export default Input;