import { Center, Heading, Image, ScrollView, Text, Stack, Avatar, Divider } from 'native-base'
import React, {useContext} from 'react'
import { StyleSheet } from 'react-native'
import { UserContext } from './UserContext'

export default function AboutMe({navigation}) {
    return (
        <ScrollView
            m={5}
        >
            <Center>
                <Heading size='md' style={{letterSpacing: 1.5}}>
                    Hello, it's me.
                </Heading>
                <Image
                    size={250}
                    resizeMode={'contain'}
                    borderRadius={200}
                    source={require('../assets/myphoto.jpg')}
                    alt={'My Photo'}
                    mt={3}
                    mb={3}
                />
                <Text bold italic>Johanes Marihot Perkasa Simarmata</Text>
                <Text>20 years old</Text>
            </Center>
            <Divider my={2} />
            <Stack
                mt={4}
            >
                <Heading size='sm' style={{letterSpacing: 1.3}}>Interest</Heading>
                <Stack
                    alignItems='center'
                    py={5}
                    px={3}
                >
                    <Text>Web/Mobile Developer</Text>
                </Stack>
                <Divider my={2} />
                <Heading size='sm' style={{letterSpacing: 1.3}}>Programming Language/Tools</Heading>
                <Stack
                    alignItems='center'
                    py={5}
                >
                    <ScrollView
                        horizontal={true}
                    >
                        <Avatar
                            size='xl'
                            source={require('../assets/programmingIcon/python.png')}
                        />
                        <Divider orientation="vertical" mx={3}/>
                        <Avatar
                            size='xl'
                            source={require('../assets/programmingIcon/java.png')}
                        />
                        <Divider orientation="vertical" mx={3}/>
                        <Avatar
                            size='xl'
                            bg='white'
                            source={require('../assets/programmingIcon/javascript.webp')}
                        />
                        <Divider orientation="vertical" mx={3}/>
                        <Avatar
                            size='xl'
                            bg='white'
                            source={require('../assets/programmingIcon/react.png')}
                        />
                        <Divider orientation="vertical" mx={3}/>
                        <Avatar
                            size='xl'
                            bg='white'
                            source={require('../assets/programmingIcon/vue.png')}
                        />
                        <Divider orientation="vertical" mx={3}/>
                        <Avatar
                            size='xl'
                            source={require('../assets/programmingIcon/bootstrap.png')}
                        />
                        <Divider orientation="vertical" mx={3}/>
                        <Avatar
                            size='xl'
                            source={require('../assets/programmingIcon/tailwind.jpg')}
                        />
                        <Divider orientation="vertical" mx={3}/>
                        <Avatar
                            size='xl'
                            source={require('../assets/programmingIcon/django.png')}
                        />
                        <Divider orientation="vertical" mx={3}/>
                        <Avatar
                            size='xl'
                            source={require('../assets/programmingIcon/spring-boot.jpg')}
                        />
                        <Divider orientation="vertical" mx={3}/>
                        <Avatar
                            size='xl'
                            source={require('../assets/programmingIcon/sql.png')}
                        />
                    </ScrollView>
                </Stack>
                <Divider my={2} />
                <Heading size='sm' style={{letterSpacing: 1.3}}>Programming Experience</Heading>
                <Stack
                    alignItems='flex-start'
                    py={5}
                    px={4}
                >
                    <Text>Front End Developer Internship at PT. Inspirasi Mandiri Nusantara</Text>
                    <Divider my={1} />
                    <Text>Front End Developer Course Dicoding</Text>
                    <Divider my={1} />
                    <Text>React Native Bootcamp Sanbercode</Text>
                    <Divider my={1} />
                    <Text>VueJS Bootcamp Sanbercode</Text>
                    <Divider my={1} />
                    <Text>React Bootcamp Sanbercode</Text>
                    <Divider my={1} />
                    <Text>Data Science Bootcamp Sanbercode</Text>
                </Stack>
            </Stack>
        </ScrollView>
    )
}


const styles = StyleSheet.create({})
