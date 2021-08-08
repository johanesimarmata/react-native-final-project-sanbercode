import { Box, Center, Heading, HStack, Spinner, ScrollView, Image, Text } from 'native-base'
import React, {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import { Linking, TouchableOpacity } from 'react-native'
import { UserContext } from './UserContext'

export default function Home({navigation}) {

    const [data, setData] = useState(null)
    const [user, setUser] = useContext(UserContext)

    useEffect(() => {
        return getData()
    }, [])


    const getData = () => {

        const resultData = []

        axios.get('https://newsapi.org/v2/top-headlines?country=id&apiKey=86758526f7aa4bf68f259f6d4644efc8').then((response) => {
            response.data.articles.map((dataArticle) => {
                resultData.push({
                    author: dataArticle.author,
                    title: dataArticle.title,
                    description: dataArticle.description,
                    publishedAt: dataArticle.publishedAt,
                    source: dataArticle.source.name,
                    image: dataArticle.urlToImage,
                    url: dataArticle.url
                })
            })
            setData(resultData)
        }).catch((error) => {
            console.log(error)
        })
    }

    if(!data){
        return(
            <HStack space={2} style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                <Heading color='warning.500'>Loading data</Heading>
                <Spinner color='warning.500' accessibilityLabel="Loading data..."/>
            </HStack>
        )
    }

    return (
        <ScrollView> 
            <Center
                flex={1}
                style={{justifyContent: 'space-around'}}
                pt={3}
            >
                <Heading size='xl' color='#546E7A' style={{letterSpacing: 1.5}}>Top News Indonesia</Heading>
                {data.map((dataMap, i) => {
                    return(
                        <Box
                            width={'90%'}
                            key={i}
                            border={1}
                            px={3}
                            py={3}
                            borderRadius={20}
                            mt={5}
                            mb={5}
                            backgroundColor={'#E0E0E0'}
                            borderColor={'#616161'}
                        >
                        {
                            dataMap.image ? 
                            <Image
                                rounded="lg"
                                size={300}
                                resizeMode={'contain'}
                                source={{
                                uri: dataMap.image,
                                }}
                                alt="News Image"
                                alignSelf='center'
                            /> :
                            <Image
                                rounded="lg"
                                size={300}
                                resizeMode={'contain'}
                                source={require('../assets/noimage.jpg')}
                                alt="News Image"
                                alignSelf='center'
                            />
                        }
                            <TouchableOpacity onPress={() => {Linking.openURL(dataMap.url)}}>
                            <Text bold underline textAlign='center'>{dataMap.title}</Text>
                            </TouchableOpacity>
                            <Text textAlign='justify' pt={3} fontSize={14}>{dataMap.description}</Text>
                            <Text textAlign='left' pt={3} fontSize={12}>Author: {dataMap.author ? dataMap.author : '-'}</Text>
                            <Text textAlign='left' fontSize={12}>Source: {dataMap.source ? dataMap.source : '-'}</Text>
                            <Text textAlign='left' fontSize={12}>Published at: {dataMap.publishedAt ? new Date(dataMap.publishedAt).toLocaleString() : '-'}</Text>
                        </Box>
                    )
                })}
            </Center>
        </ScrollView>
    )
}