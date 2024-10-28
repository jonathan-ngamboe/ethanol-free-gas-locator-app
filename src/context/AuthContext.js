import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase'
import { Alert } from 'react-native'
import { Session } from '@supabase/supabase-js'

const AuthContext = React.createContext();

// AuthProvider component to wrap the entire app with the auth context
export const AuthProvider = ({ children }) => {
    //
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [session, setSession] = useState(null);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
          setSession(session)
        })
    
        supabase.auth.onAuthStateChange((_event, session) => {
          setSession(session)
        })
    }, [])
  
    async function signInWithEmail() {
      setLoading(true)
      const { error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      })
  
      if (error) Alert.alert(error.message)
      setLoading(false)
    }
  
    async function signUpWithEmail() {
      setLoading(true)
      const {
        data: { session },
        error,
      } = await supabase.auth.signUp({
        email: email,
        password: password,
      })
  
      if (error) Alert.alert(error.message)
      if (!session && !error) Alert.alert('Please check your email for the confirmation')
      setLoading(false)
    }

    return(
        <AuthContext.Provider value={{ email, setEmail, password, setPassword, loading, session, signInWithEmail, signUpWithEmail }}>
            {children}
        </AuthContext.Provider>
    );

}

export const useAuth = () => {
    const context = React.useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within a AuthProvider');
    }
    return context;
}