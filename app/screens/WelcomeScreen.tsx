import React from 'react';
import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native';

function WelcomeScreen(props) {
    return (
        <ImageBackground
            source={require('../../assets/images/background.jpg')}
            style={styles.background}
        >
            <View style={styles.logoContainer}>
                <Image
                    source={require('../../assets/images/pinpoint.png')}
                    style={styles.logo}
                />
                <Text style={styles.tagline}>Helping Out The Local Community</Text>
            </View>
            <View style={styles.loginButton}></View>
            <View style={styles.registerButton}></View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    loginButton: {
        width: "100%",
        height: 70,
        backgroundColor: "#fc5c65"
    },
    logo: {
        width: 100,
        height: 100,
    },
    logoContainer: {
        position: "absolute",
        top: 70,
        alignItems: "center"
    },
    tagline: {
        marginTop: 20,
        fontSize: 16,
        fontWeight: "600",
        textAlign: "center",
    },
    registerButton: {
        width: "100%",
        height: 70,
        backgroundColor: "#4ECDC4"
    }
});

export default WelcomeScreen;