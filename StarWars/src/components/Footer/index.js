// Gerekli modülleri ve bileşenleri import edilir. 
import { Box, Center, Text, Button } from '@chakra-ui/react'
import React from 'react'
import { FaFacebook, FaTwitter } from 'react-icons/fa';


function Footer() {

    return (
        //Footer arayüzü için gerekli veriler elde edilerek tasarım oluşturuldu.
        <Box mt='20%' bgGradient='linear-gradient(88deg, rgba(55,42,51,1) 0%, rgba(17,20,35,1) 100%)' >
            <Center>
                <Text fontSize={25} color='black' mb={2} fontFamily={"DINNnext"}>
                    More From Star Wars:
                </Text>
            </Center>
            <Center>
                <ul style={{ paddingLeft: "20px", marginBottom: "20px", display: "flex" }}>
                    <li >
                        <Button
                            target='_blank'
                            as='a'
                            href='https://www.facebook.com/StarWars' bgGradient='linear-gradient(88deg, rgba(55,42,51,1) 0%, rgba(17,20,35,1) 100%)' color='blue.200' leftIcon={<FaFacebook />}></Button>
                        <Button
                            target='_blank'
                            as='a'
                            href="https://twitter.com/starwars"
                            bgGradient='linear-gradient(88deg, rgba(55,42,51,1) 0%, rgba(17,20,35,1) 100%)' color='blue.300' leftIcon={<FaTwitter />}></Button>
                           
                        <Button
                            borderRadius={20}
                            ml={15}
                            target='_blank'
                            as='a'
                            href="https://starwarskids.com"
                            bgGradient='linear-gradient(88deg, rgba(55,42,51,1) 0%, rgba(17,20,35,1) 100%)' color='blue.300'>KIDS</Button>

                    </li>
                </ul>
            </Center>
            <Center>
                <Text color={'white'} mb={10}>TM &amp; © Lucasfilm Ltd. All Rights Reserved</Text>
            </Center>
        </Box>

    )
}

export default Footer
