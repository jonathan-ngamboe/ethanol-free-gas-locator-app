import React, { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import { Alert } from "react-native";
import LoadingScreen from "../screens/LoadingScreen";

const AuthContext = React.createContext();

// AuthProvider component to wrap the entire app with the auth context
export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });
  }, []);

  async function signInWithEmail(data) {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  async function signUpWithEmail(data) {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          first_name: data.first_name,
          last_name: data.last_name,
        },
      },
    });

    if (error) Alert.alert(error.message);
    if (!session && !error)
      Alert.alert("Please check your email for the confirmation");
    setLoading(false);
  }

  async function signOut() {
    await supabase.auth.signOut();
  }

  async function resetPassword(email) {
    const { error } = await supabase.auth.api.resetPasswordForEmail(email);
    if (error) Alert.alert(error.message);
    else Alert.alert("Password recovery email sent");
  }

  return (
    <AuthContext.Provider
      value={{
        loading,
        session,
        signInWithEmail,
        signUpWithEmail,
        signOut,
        resetPassword,
      }}
    >
      {loading ? <LoadingScreen /> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};
