import React, {useState} from 'react'
import { View, Text, SafeAreaView, StyleSheet, TextInput, Button, TouchableOpacity, ImageBackground } from 'react-native'
import * as firebase from 'firebase'

export default function Register({navigation}) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    var firebaseConfig = {
        apiKey: "AIzaSyAYCPa7cW2-W_qGCDiIu7HBVfhsivGcbYo",
        authDomain: "react-native-sanbercode.firebaseapp.com",
        projectId: "react-native-sanbercode",
        storageBucket: "react-native-sanbercode.appspot.com",
        messagingSenderId: "659847564055",
        appId: "1:659847564055:web:509356a9684b079456c552"
      };
      // Initialize Firebase
    if(!firebase.apps.length){
        firebase.initializeApp(firebaseConfig);
    }

    const submitRegister = () => {
        firebase.auth().createUserWithEmailAndPassword(email, password).then((response) => {
            setEmail('')
            setPassword('')
            navigation.navigate('Login')
            alert('Account created successfully! Please login to continue.')
        }).catch((error) => {
            setEmail('')
            setPassword('')
            alert(error)
        });
    }

    return(
        <ImageBackground 
            style={styles.container}
            source={require('../assets/background.jpg')}
            resizeMode='cover'
        >
            <Text style={styles.title}>Sign Up</Text>
            <View style={styles.inputContainer}>
            
            </View>
            <TextInput
                style={styles.textInput}
                placeholder= 'Email'
                placeholderTextColor='#ffffff'
                value={email}
                onChangeText={text => setEmail(text)}
            />
            <TextInput
                style={styles.textInput}
                placeholder= 'Password'
                placeholderTextColor='#ffffff'
                value={password}
                onChangeText={text => setPassword(text)}
                secureTextEntry={true}
            />
            <TouchableOpacity style={styles.buttonRegister} onPress={submitRegister}>
                <Text style={styles.textButton}>REGISTER</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {navigation.navigate('Login')}}>
                <Text style={styles.textButton}>Already have an account?</Text>
            </TouchableOpacity>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#003f5c",
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10
    },
    title: {
        fontWeight: 'bold',
        fontSize: 40,
        color: "#EEEEEE",
        marginBottom: 50,
        textTransform: 'uppercase',
        letterSpacing: 3
    },
    textInput: {
        backgroundColor: 'transparent',
        width: '80%',
        padding: 20,
        borderRadius: 20,
        marginVertical: 10,
        justifyContent:"center",
        fontSize: 17,
        color: '#ffffff',
        borderBottomWidth: 1,
        borderBottomColor: '#ffffff'
    },
    buttonRegister: {
        width: '80%',
        borderRadius: 20,
        padding: 15,
        marginTop: 40,
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#152238'
    },
    textButton: {
        color: '#EEEEEE',
        fontSize: 18,
        letterSpacing: 2
    }
})
