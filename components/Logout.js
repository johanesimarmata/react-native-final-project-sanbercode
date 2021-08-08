import React, {useContext, useEffect} from 'react'
import { StyleSheet, View } from 'react-native'
import { UserContext } from './UserContext'
import * as firebase from 'firebase'

export default function Logout({navigation}) {
    const [user, setUser] = useContext(UserContext)

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

    useEffect(() => {
        const logout = navigation.addListener('focus', ()=> {
            firebase.auth().signOut().then(() => {
                setUser(null)
                navigation.navigate('Login')
            }).catch((error) => {
                alert(error)
            })
        })
        return logout
    }, [navigation])

    return <View/>
}

const styles = StyleSheet.create({})
