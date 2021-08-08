import React, {useState, useEffect, useContext} from 'react'
import { Text } from 'react-native'
import axios from 'axios'
import { ScrollView, Center, Heading, Box, FormControl, Stack, Select, CheckIcon, HStack, Spinner } from 'native-base'
import {CountUp} from 'use-count-up'
import { UserContext } from './UserContext'

export default function Indonesia({navigation}) {

    const [data, setData] = useState(null)
    const [province, setProvince] = useState('')
    const [listProvince, setListProvince] = useState([])
    
    useEffect(() => {
        if(province !== 'all' && province !== ''){
            return getDataByProvince()
        }
        return getData()
    }, [province])

    const getData = () => {
        const dataKasus = []
        const dataProvinsi = []
        axios.get('https://api.kawalcorona.com/indonesia/provinsi/').then((response) => {
            response.data.map((dataMap) => {
                dataProvinsi.push(dataMap['attributes']['Provinsi'])
            })
            setListProvince(dataProvinsi.sort())
        }).catch((error) => {
            console.log(error)
        })

        const dataIndonesia = {
            provinsi: null,
            infected: null,
            recovered: null,
            deaths: null
        }

        axios.get('https://api.kawalcorona.com/indonesia').then((result) => {
            dataIndonesia.infected = parseInt(result.data[0]['positif'].replace(/,/g, ''))
            dataIndonesia.recovered = parseInt(result.data[0]['sembuh'].replace(/,/g, ''))
            dataIndonesia.deaths = parseInt(result.data[0]['meninggal'].replace(/,/g, ''))
            setData(dataIndonesia)
        }).catch((err) => {
            console.log(err)
        });
    }

    const getDataByProvince = () => {
        const dataProvinsi = {
            provinsi: null,
            infected: null,
            recovered: null,
            deaths: null
        }

        axios.get('https://api.kawalcorona.com/indonesia/provinsi/').then((response) => {
            response.data.map((dataMap) => {
                if(dataMap['attributes']['Provinsi'] === province){
                    dataProvinsi.provinsi = dataMap['attributes']['Provinsi']
                    dataProvinsi.infected = dataMap['attributes']['Kasus_Posi']
                    dataProvinsi.recovered = dataMap['attributes']['Kasus_Semb']
                    dataProvinsi.deaths = dataMap['attributes']['Kasus_Meni']
                    setData(dataProvinsi)
                }
            })
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
                <Heading size='xl' color='#546E7A' style={{letterSpacing: 1.5, textAlign: 'center'}}>
                {
                    province !== '' && province !== 'all' ? `Provinsi ${province}` : 'Indonesia'
                }
                </Heading>
                <FormControl>
                    <Stack
                        py={5}
                    >
                        <FormControl.Label
                            alignSelf='center'
                        >Search by Province
                        </FormControl.Label>
                        <Select
                            width={'80%'}
                            alignSelf='center'
                            selectedValue={province}
                            minWidth={200}
                            accessibilityLabel="Select Province"
                            placeholder="Select Province"
                            onValueChange={(itemValue) => {
                                setProvince(itemValue)
                            }}
                            _selectedItem={{
                                bg: "teal.600",
                                endIcon: <CheckIcon size={5} />,
                            }}
                            mt={1}
                        >
                            <Select.Item label="All" value="all" />
                            {listProvince.map((provinsi, i) => {
                                return(
                                    <Select.Item key={i} label={provinsi} value={provinsi}/>
                                )
                            })}
                        </Select>
                    </Stack>
                </FormControl>
            </Center>
            <Center
                flex={1}
                style={{justifyContent: 'space-around'}}
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
            </Center>
        </ScrollView>
    )
}