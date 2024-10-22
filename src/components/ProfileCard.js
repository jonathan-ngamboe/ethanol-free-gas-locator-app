import { useTheme, Chip, Card, Avatar } from 'react-native-paper';
import { StyleSheet, View, Text } from 'react-native';
import React from 'react';

export default function ProfileCard({user}) {
    const theme = useTheme();
    const randomNum = Math.floor(Math.random() * 1000);

    return(
        <View style={localStyles.container}>
            <Card.Cover 
                style={localStyles.cover} 
                source={{ 
                    uri: user?.bannerImage 
                        ? user.bannerImage 
                        : `https://picsum.photos/seed/${randomNum}/500/200` 
                }} 
            />
            <View style={localStyles.contentContainer}>
                <Avatar.Image 
                    style={localStyles.avatar} 
                    size={80} 
                    source={{ 
                        uri: user?.avatar 
                            ? user.avatar 
                            : `https://avatar.iran.liara.run/public` 
                    }} 
                />
                <View style={localStyles.textContainer}>
                    <Text style={{
                        ...localStyles.title, 
                        color: theme.colors.onBackground 
                    }}>
                        {user?.firstName} {user?.lastName}
                    </Text>
                    <Chip
                        style={{
                            backgroundColor: theme.colors.accent,
                            ...localStyles.chip
                        }}
                        textStyle={{
                            color: theme.colors.onAccent,
                            fontSize: 12
                        }}
                    >
                        {user?.isPro ? 'Pro' : 'Free'}
                    </Chip>
                </View>
            </View>
        </View>
    );
}

const localStyles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    
    contentContainer: {
        alignItems: 'center',
        paddingTop: 200,
        paddingBottom: 20,
    },

    textContainer: {
        alignItems: 'center',
        marginTop: 50, 
    },

    title: {
        fontWeight: 'bold',
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 10,
    },

    avatar: {
        position: 'absolute',
        top: 160, 
        alignSelf: 'center',
        borderColor: 'white',
    },

    cover: {
        position: 'absolute',
        width: '100%',
        height: 200,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },

    chip: {
        marginTop: 5,
    },
});