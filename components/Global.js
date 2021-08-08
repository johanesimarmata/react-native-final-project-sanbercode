import React, {useState, useEffect, useContext} from 'react'
import { Text, View } from 'react-native'
import axios from 'axios'
import { ScrollView, Center, Heading, Box, FormControl, Stack, Select, CheckIcon, HStack, Spinner } from 'native-base'
import {CountUp} from 'use-count-up'
import { UserContext } from './UserContext'

export default function Global({navigation}) {

    const [data, setData] = useState(null)
    const [country, setCountry] = useState('')
    const [listCountries, setListCountries] = useState([])


    useEffect(() => {
        if(country !== 'all' && country !== ''){
            return getDataByCountry()
        }
        return getData()
    }, [country])

    const getData = () => {

        const dataCountries = []

        //Get List Countries
        axios.get('https://covid19.mathdro.id/api/countries').then((result) => {
            result.data.countries.map((dataMap) => {
                dataCountries.push(dataMap.name)
            })
            setListCountries(dataCountries)
        }).catch((err) => {
            console.log(err)
        });

        const result = {
            infected: null,
            recovered: null,
            deaths: null,
            lastUpdate: null
        }
        axios.get('https://covid19.mathdro.id/api').then((response) => {
            result.infected = parseInt(response.data.confirmed.value) <= 0 ? 'No data' : parseInt(response.data.confirmed.value)
            result.recovered = parseInt(response.data.recovered.value) <= 0 ? 'No data' : parseInt(response.data.recovered.value)
            result.deaths = parseInt(response.data.deaths.value) <= 0 ? 'No data' : parseInt(response.data.deaths.value)
            result.lastUpdate = response.data.lastUpdate
            setData(result)
        }).catch((error) => {
            console.log(error)
        })
    }

    const getDataByCountry = () => {
        const dataCountry = {
            country: null,
            infected: null,
            recovered: null,
            deaths: null,
            lastUpdate: null
        }

        axios.get(`https://covid19.mathdro.id/api/countries/${country}`).then((result) => {
            dataCountry.country = country
            dataCountry.infected = parseInt(result.data.confirmed.value) > 0 ? parseInt(result.data.confirmed.value) : 'No data'
            dataCountry.recovered = parseInt(result.data.recovered.value) > 0 ? parseInt(result.data.recovered.value) : 'No data'
            dataCountry.deaths = parseInt(result.data.deaths.value) > 0 ? parseInt(result.data.deaths.value) : 'No data'
            dataCountry.lastUpdate = result.data.lastUpdate
            setData(dataCountry)
        }).catch((err) => {
            console.log(err)
        });
    }

    if(!listCountries || !data){
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
            {
                country !== '' && country !== 'all' ?  <Heading size='xl' color='#546E7A' style={{letterSpacing: 1.5, textAlign: 'center'}}>{country} Data</Heading> : 
                <Heading size='xl' color='#546E7A' style={{letterSpacing: 1.5, textAlign: 'center'}}>World Data</Heading>
            }
                <FormControl>
                    <Stack
                        py={5}
                    >
                        <FormControl.Label
                            alignSelf='center'
                        >Search by Country
                        </FormControl.Label>
                        <Select
                            width={'80%'}
                            alignSelf='center'
                            selectedValue={country}
                            minWidth={200}
                            accessibilityLabel="Select Country"
                            placeholder="Select Country"
                            onValueChange={(itemValue) => {
                                setCountry(itemValue)
                            }}
                            _selectedItem={{
                                bg: "teal.600",
                                endIcon: <CheckIcon size={5} />,
                            }}
                            mt={1}
                        >
                            <Select.Item label={'All'} value={'all'}/>
                            {listCountries.map((negara, i) => {
                                return(
                                    <Select.Item key={i} label={negara} value={negara}/>
                                )
                            })}
                        </Select>
                    </Stack>
                </FormControl>
            </Center>
            {data !== null ? 
            <Center
                flex={1}
                style={{justifyContent: 'space-around'}}
                pt={3}
            >
                <Box
                    width={'80%'}
                    shadow={3}
                    backgroundColor='#FFB300'
                    marginX={3}
                    marginY={3}
                    paddingY={5}
                    borderRadius={20}
                >
                    <Stack
                        p={2}
                    >
                        <Center
                            _text={{
                                color: 'white',
                                fontWeight: '700',
                                fontSize: '2xl',
                                textTransform: 'uppercase',
                                letterSpacing: 2
                            }}
                        >
                            Infected
                        </Center>
                        <Center
                            _text={{
                                color: 'gray.500',
                                fontSize: 'xs'
                            }}
                        >
                        Last Updated: {new Date(data.lastUpdate).toLocaleString()}
                        </Center>
                    </Stack>
                    <Center
                        py={3}
                    >
                        <Text style={{fontSize: 23, fontWeight: 'bold', color: '#E3F2FD', letterSpacing: 1.8}}>
                        {data.infected !== 'No data' ?
                            <CountUp isCounting shouldUseToLocaleString start={0} end={data.infected} duration={2.75} autoResetKey={data.infected}/> : 'No data'
                        }
                        </Text>
                    </Center>
                </Box>
                <Box
                    width={'80%'}
                    shadow={3}
                    backgroundColor='#66BB6A'
                    marginX={3}
                    marginY={3}
                    paddingY={5}
                    borderRadius={20}
                >
                    <Stack
                        p={2}
                    >
                        <Center
                            _text={{
                                color: 'white',
                                fontWeight: '700',
                                fontSize: '2xl',
                                textTransform: 'uppercase',
                                letterSpacing: 2
                            }}
                        >
                            Recovered
                        </Center>
                        <Center
                            _text={{
                                color: 'gray.500',
                                fontSize: 'xs'
                            }}
                        >
                        Last Updated: {new Date(data.lastUpdate).toLocaleString()}
                        </Center>
                    </Stack>
                    <Center
                        py={3}
                    >
                        <Text style={{fontSize: 23, fontWeight: 'bold', color: '#E3F2FD', letterSpacing: 1.8}}>
                        {data.recovered !== 'No data' ?
                            <CountUp isCounting shouldUseToLocaleString start={0} end={data.recovered} duration={2.75} autoResetKey={data.recovered}/> : 'No data'
                        }
                        </Text>
                    </Center>
                </Box>
                <Box
                    width={'80%'}
                    shadow={3}
                    backgroundColor='#FF7043'
                    marginX={3}
                    marginY={3}
                    paddingY={5}
                    borderRadius={20}
                >
                    <Stack
                        p={2}
                    >
                        <Center
                            _text={{
                                color: 'white',
                                fontWeight: '700',
                                fontSize: '2xl',
                                textTransform: 'uppercase',
                                letterSpacing: 2
                            }}
                        >
                            Deaths
                        </Center>
                        <Center
                            _text={{
                                color: 'gray.500',
                                fontSize: 'xs'
                            }}
                        >
                        Last Updated: {new Date(data.lastUpdate).toLocaleString()}
                        </Center>
                    </Stack>
                    <Center
                        py={3}
                    >
                        <Text style={{fontSize: 23, fontWeight: 'bold', color: '#E3F2FD', letterSpacing: 1.8}}>
                        {data.deaths !== 'No data' ?
                            <CountUp isCounting shouldUseToLocaleString start={0} end={data.deaths} duration={2.75} autoResetKey={data.deaths}/> : 'No data'
                        }
                        </Text>
                    </Center>
                </Box>
            </Center> : null}
        </ScrollView>
    )
}
