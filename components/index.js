import React, {useContext, useEffect} from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import 'react-native-gesture-handler'
import {Ionicons} from '@expo/vector-icons'
import Login from './Login'
import Register from './Register'
import Logout from './Logout'
import HomeScreen from './Home'
import Indonesia from './Indonesia'
import Global from './Global'
import AboutMe from './AboutMe'
import { UserProvider } from './UserContext'

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

export default function index(){
    return(
        <UserProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName='Home'>
                    <Stack.Screen name='Login' component={Login} options={{headerShown: false}}/>    
                    <Stack.Screen name='Register' component={Register} options={{headerShown: false}}/>
                    <Stack.Screen name='MainApplication' component={mainApplication} options={{headerTitle: 'Covid-19 Application', headerTitleAlign: 'center'}}/>
                </Stack.Navigator>
            </NavigationContainer>
        </UserProvider>
    )
}

const mainApplication = () => {
    return(
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: 'red',
                tabBarInactiveTintColor: 'gray'
            }}
        >
            <Tab.Screen 
                name='HomeScreen' 
                component={HomeScreen} 
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({focused, color, size}) => (
                        <Ionicons name={focused ? 'home' : 'home-outline'} size={size} color={color}/>
                    ),
                    headerShown: false
                }}
            />
            <Tab.Screen 
                name='GlobalScreen' 
                component={Global} 
                options={{
                    tabBarLabel: 'World',
                    tabBarIcon: ({focused, color, size}) => (
                        <Ionicons name={focused ? 'globe' : 'globe-outline'} size={size} color={color}/>
                    ),
                    headerShown: false
                }}
            />
            <Tab.Screen 
                name='IndonesiaScreen' 
                component={Indonesia} 
                options={{
                    tabBarLabel: 'Indonesia',
                    tabBarIcon: ({focused, color, size}) => (
                        <Ionicons name={focused ? 'flag' : 'flag-outline'} size={size} color={color}/>
                    ),
                    headerShown: false
                }}
            />
            <Tab.Screen 
                name='AboutMeScreen' 
                component={AboutMe} 
                options={{
                    tabBarLabel: 'Creator',
                    tabBarIcon: ({focused, color, size}) => (
                        <Ionicons name={focused ? 'person-circle' : 'person-circle-outline'} size={size} color={color}/>
                    ),
                    headerShown: false
                }}
            />
            <Tab.Screen 
                name='Logout'
                component={Logout}
                options={{
                    tabBarLabel: 'Logout',
                    tabBarIcon: ({color, size}) => (
                        <Ionicons name={'log-out'} size={size} color={color}/>
                    )
                }}
                
                
            />
        </Tab.Navigator>
    )
}