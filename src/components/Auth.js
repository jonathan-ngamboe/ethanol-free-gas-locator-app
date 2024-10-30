import React, { useState } from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { useAuth } from '../context/AuthContext';
import { useGlobalStyles } from '../styles/globalStyles';
import { useTheme } from 'react-native-paper';
import DividerText from './DividerText';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


export default function Auth({ screen }) {
  const { signUpWithEmail, signInWithEmail, loading } = useAuth();
  const styles = useGlobalStyles();
  const theme = useTheme();
  
  // Local state
  const [signInWithSocialMedia, setSignInWithSocialMedia] = useState(true);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [isConfirmPasswordHidden, setIsConfirmPasswordHidden] = useState(true);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const isFormValid = () => {
    if (screen === 'Sign up') {
      return (
        formData.email &&
        formData.password &&
        formData.confirmPassword &&
        formData.password === formData.confirmPassword &&
        formData.first_name &&
        formData.last_name
      );
    }
    return formData.email && formData.password;
  };

  const commonInputProps = {
    dense: true,
    mode: 'outlined',
    autoCapitalize: 'none',
    outlineColor: 'transparent',
    outlineStyle: { borderRadius: 20 },
    style: [localStyles.textInput, styles.shadow]
  };

  const SocialButton = ({ icon, textColor, color, onPress, children }) => (
    <Button
      icon={icon}
      mode="contained"
      buttonColor={color}
      textColor={textColor || theme.colors.onBackground}
      style={localStyles.socialButton}
      onPress={onPress}
    >
      {children}
    </Button>
  );

  const handleSubmit = () => {
    if (screen === 'Sign up') {
      signUpWithEmail(formData);
    } else {
      signInWithEmail(formData.email, formData.password);
    }
  };

  return (
    <View style={localStyles.container}>
      <Text style={[{ color: theme.colors.outline }, localStyles.topLabel]}>
        {screen} with
      </Text>

      {signInWithSocialMedia ? (
        <View style={localStyles.socialButtonsContainer}>
          {Platform.OS === 'ios' && (
            <SocialButton icon="apple" color={theme.colors.onBackground} textColor={theme.colors.background} onPress={() => console.log('Apple')}>
              Apple
            </SocialButton>
          )}
          <SocialButton icon="google" color="#db4437" textColor="white" onPress={() => console.log('Google')}>
            Google
          </SocialButton>
          <SocialButton icon="facebook" color="#3b5998" textColor="white" onPress={() => console.log('Facebook')}>
            Facebook
          </SocialButton>

          <DividerText text="or" style={localStyles.divider} backgroundColor={theme.colors.outline} textColor={theme.colors.outline} />
          
          <Button 
            onPress={() => setSignInWithSocialMedia(false)} 
            mode="text" 
            icon="email"
          >
            Sign with email
          </Button>
        </View>
      ) : (
        <View>
          {screen === 'Sign up' && (
            <>
              <TextInput
                {...commonInputProps}
                label="First name"
                value={formData.first_name}
                onChangeText={(text) => handleInputChange('first_name', text)}
                placeholder="First name"
              />
              <TextInput
                {...commonInputProps}
                label="Last name"
                value={formData.last_name}
                onChangeText={(text) => handleInputChange('last_name', text)}
                placeholder="Last name"
              />
            </>
          )}

          <TextInput
            {...commonInputProps}
            label="Email"
            value={formData.email}
            onChangeText={(text) => handleInputChange('email', text)}
            placeholder="email@address.com"
            keyboardType="email-address"
            textContentType="username"
            autoComplete="email"
          />

          <TextInput
            {...commonInputProps}
            label="Password"
            value={formData.password}
            onChangeText={(text) => handleInputChange('password', text)}
            placeholder="Password"
            secureTextEntry={isPasswordHidden}
            textContentType={screen === 'Sign up' ? "newPassword" : "password"}
            autoComplete={screen === 'Sign up' ? "new-password" : "current-password"}
            right={
              <TextInput.Icon
                icon={isPasswordHidden ? "eye" : "eye-off"}
                onPress={() => setIsPasswordHidden(!isPasswordHidden)}
              />
            }
          />

          {screen === 'Sign up' && (
            <>
              <TextInput
                {...commonInputProps}
                label="Confirm password"
                value={formData.confirmPassword}
                onChangeText={(text) => handleInputChange('confirmPassword', text)}
                placeholder="Confirm Password"
                secureTextEntry={isConfirmPasswordHidden}
                textContentType="none"                
                autoComplete="off"
                style={[localStyles.textInput, styles.shadow]}
                right={
                  <TextInput.Icon
                    icon={isConfirmPasswordHidden ? "eye" : "eye-off"}
                    onPress={() => setIsConfirmPasswordHidden(!isConfirmPasswordHidden)}
                  />
                }
              />
              {formData.password !== formData.confirmPassword && (
                <Text style={localStyles.errorText}>
                  Passwords do not match
                </Text>
              )}
            </>
          )}

          <View style={localStyles.submitButton}>
            <Button
              disabled={loading || !isFormValid()}
              mode="contained"
              onPress={handleSubmit}
            >
              {screen}
            </Button>
          </View>

          {screen === 'Sign in' && (
            <View style={localStyles.forgetPassword}>
              <Button onPress={() => console.log('Forgot password')} mode="text">
                Forgot password?
              </Button>
            </View>
          )}

          <DividerText text="or" style={localStyles.divider} backgroundColor={theme.colors.outline} textColor={theme.colors.outline} />

          <Button
            onPress={() => setSignInWithSocialMedia(true)}
            mode="text"
          >
            Sign with social media
          </Button>

          <View style={localStyles.socialIconsContainer}>
            {Platform.OS === 'ios' && (
              <Icon style={localStyles.socialIcon} name="apple" size={30} color={theme.colors.onBackground} />
            )}
            <Icon style={localStyles.socialIcon} name="google" size={30} color="#db4437" />
            <Icon style={localStyles.socialIcon} name="facebook" size={30} color="#3b5998" />
          </View>
        </View>
      )}
    </View>
  );
}

const localStyles = StyleSheet.create({
  textInput: {
    marginBottom: 12,
  },

  socialButtonsContainer: {
    marginTop: 20,
  },

  socialButton: {
    marginBottom: 12,
  },

  topLabel: {
    marginTop: 20,
    marginBottom: 12,
    marginLeft: 10,
  },

  submitButton: {
    marginTop: 40,
  },

  forgetPassword: {
    marginTop: 8,
  },

  divider: {
    marginTop: 30,
    marginBottom: 20,
  },

  socialIconsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },

  socialIcon: {
    marginHorizontal: 12,
  },

  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 4,
  }
});