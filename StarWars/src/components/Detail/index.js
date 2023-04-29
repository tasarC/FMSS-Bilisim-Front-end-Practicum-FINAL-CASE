// Gerekli modülleri ve bileşenleri import edilir. 
import { useParams } from "react-router-dom"
import { useQuery } from "react-query"
import {
    CardBody,
    Heading,
    Box,
    Stack,
    Card,
    Text,
    Image,
    Container,
    Button,
    Center,
} from "@chakra-ui/react"
import { ArrowBackIcon } from "@chakra-ui/icons";
import axios from "axios";
import { Link } from "react-router-dom";
import img from '../../img.json'

// fetchStarWars() fonksiyonu, veriyi almak için kullanılan özelleştirilmiş bir fonksiyondur.
const fetchStarWars = async (id) => {
    const { data } = await axios.get(`https://swapi.dev/api/starships/${id}`);
    return data;
};

function Detail() {

    // useParams() fonksiyonu React Router kütüphanesinden gelir ve URL'deki parametreleri alır.
    // Bu kodda, "detail_id" isimli bir parametreyi aldığımızı varsayalım.
    const { detail_id } = useParams();

    // useQuery() fonksiyonu, React Query kütüphanesinden gelir ve asenkron bir fonksiyon alarak bir veri sorgusunu temsil eder.
    // Bu kodda, "starships" anahtar kelimesi ve "detail_id" değeri kullanılarak bir veri sorgusu yapılır.
    const { isLoading, error, data } = useQuery(["starships", detail_id], async () => {
        const result = await fetchStarWars(detail_id)
        return result;
    });

     // Yükleme durumunu gösterir
    if (isLoading) {
        return <div>Loading...</div>;
    }

    // Hata durumunu gösterir
    if (error) {
        return <div>Error fetching data</div>;
    }

    return (
        //Deatail arayüzü için yapılan işlemler
        <Box bgGradient='linear-gradient(88deg, rgba(55,42,51,1) 0%, rgba(17,20,35,1) 100%)' height='100vh'>
            
            {/*Anasayfaya yönlendirilmek için oluşturulan link */}
            <Link to='/' ><Button mt={3} ml={3} borderRadius='full' bgColor='green.900' size='xl'><ArrowBackIcon boxSize={20} color='white' /></Button> </Link>

            <Container justifyContent={"center"} textAlign={"center"}  maxW='2xl'>
                <Card
                    mt={10}
                    borderRadius={30}
                >
                    <CardBody >
                        <Box  border={'outset'}  borderRadius={30} borderColor={'black'} borderStyle={"double"} pl={20} pr={20} pt={5} pb={5}>
                            <Center>
                                <Heading color='purple.300' size='lg' mb={0.5}>{data.name}</Heading>
                            </Center>
                            <Center>
                                <hr style={{ width: "95%", marginBottom: "20px", size: "20%",borderColor:'grey' }} />
                            </Center>
                            <Image
                                src={img.find((item) => item.name === data.name)?.img}
                                borderRadius={30}
                            />
                            <Center>
                                <Stack textAlign={"left"} mt='6' ml={20} spacing='4' >

                                    <Text><Text as='b'>Model: </Text> {data.model}</Text>

                                    <Text><Text as='b'>Hyperdrive_rating: </Text> {data.hyperdrive_rating}</Text>

                                    <Text><Text as='b'>Passengers: </Text> {data.passengers}</Text>

                                    <Text><Text as='b'>Max_atmosphering_speed: </Text> {data.max_atmosphering_speed}</Text>

                                    <Text><Text as='b'>Manufacturer: </Text>{data.manufacturer}</Text>

                                    <Text><Text as='b'>Crew:</Text>: {data.crew}</Text>

                                    <Text><Text as='b'>Cargo_capacity:</Text>: {data.cargo_capacity}</Text>

                                </Stack>
                            </Center>
                        </Box>
                    </CardBody>
                </Card>
            </Container>
        </Box>

    );
}

export default Detail
