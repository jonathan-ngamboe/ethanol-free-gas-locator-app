import Auth from '../components/Auth';
import React, {useState} from 'react';
import { StyleSheet, View  } from 'react-native'
import { List, Text, Button } from 'react-native-paper'
import { useAuth } from '../context/AuthContext';
import { useGlobalStyles } from '../styles/globalStyles';
import { useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { privacyPolicyUrl, termsOfServiceUrl } from '../constants/generalConstants';
import { openLink } from '../navigation/ExternalNavigation';

export default function AuthScreen({ route }) {
    const { session } = useAuth();
    const styles = useGlobalStyles();
    const theme = useTheme();

    const { screen } = route.params;
    

    return (
        <View style={[styles.container, localStyles.container, styles.contentPaddingHorizontal]}>
            <List.Item
                title={screen}
                titleEllipsizeMode='tail'
                titleStyle={localStyles.title}
                description={screen === 'Sign up' ? 'Become a new user' : 'Sign in to your account'}
                descriptionStyle={[localStyles.description,{color: theme.colors.outline}]}
                left={props => <Icon 
                                    name={screen === 'Sign up' ? 'account-plus' : 'account'} 
                                    size={50} 
                                    color={theme.colors.primary} 
                                    style={localStyles.icon}
                                />}
            />
            <Auth screen={screen} />
            {session && session.user && <Text>{session.user.id}</Text>}

            <Text style={[{ color: theme.colors.outline }, localStyles.bottomLabel]}>
                {screen === 'Sign up' ? 'By signing up, you agree to our ' : 'By signing in, you agree to our '}
                <Text onPress={() => openLink(termsOfServiceUrl)} style={{ color: theme.colors.primary }}>
                terms of service
                </Text> and{' '} 
                <Text onPress={() => openLink(privacyPolicyUrl)} style={{ color: theme.colors.primary }}>
                privacy policy
                </Text>
            </Text>
        </View>
    )
}

const localStyles = StyleSheet.create({
    title: {
        fontSize: 40,
        fontWeight: 'bold',
    },

    description: {
        fontSize: 15,
        marginTop: 10,
    },

    container: {
        alignItems: 'stretch',
        paddingBottom: 50,
    },

    bottomLabel: {
        textAlign: 'center',
        alignSelf: 'center',
        position: 'absolute', 
        bottom: 0, 
    },
})