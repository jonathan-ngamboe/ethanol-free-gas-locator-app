import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, TextInput } from 'react-native-paper'
import { useAuth } from '../context/AuthContext'
import { useGlobalStyles } from '../styles/globalStyles';

export default function Auth() {
    const { signUpWithEmail, signInWithEmail, email, setEmail, password, setPassword, loading } = useAuth();
    const styles = useGlobalStyles();

    return (
        <View>
            <View style={[styles.verticallySpaced, styles.mt20]}>
                <TextInput
                label="Email"
                leftIcon={{ type: 'font-awesome', name: 'envelope' }}
                onChangeText={(text) => setEmail(text)}
                value={email}
                placeholder="email@address.com"
                autoCapitalize={'none'}
                />
            </View>
            <View style={styles.verticallySpaced}>
                <TextInput
                label="Password"
                leftIcon={{ type: 'font-awesome', name: 'lock' }}
                onChangeText={(text) => setPassword(text)}
                value={password}
                secureTextEntry={true}
                placeholder="Password"
                autoCapitalize={'none'}
                />
            </View>
            <View style={[styles.verticallySpaced, styles.mt20]}>
                <Button disabled={loading || !email || !password} onPress={() => signInWithEmail()}>Sign in</Button>
            </View>
            <View style={styles.verticallySpaced}>
                <Button disabled={loading || !email || !password} onPress={() => signUpWithEmail()}>Sign up</Button>
            </View>
        </View>
  )
}

const styles = StyleSheet.create({
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },

  mt20: {
    marginTop: 20,
  },
})