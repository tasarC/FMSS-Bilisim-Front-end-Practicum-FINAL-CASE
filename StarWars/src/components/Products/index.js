// Gerekli modülleri ve bileşenleri import edilir. 
import {
  Grid,
  Center,
  Box,
  Card,
  Input,
  Text,
  Button,
  Image,
  CardBody,
  Stack,
  Heading,
  GridItem,
  Container
} from '@chakra-ui/react';
import img from '../../img.json'

import { Link } from 'react-router-dom';
import { useInfiniteQuery } from "react-query";
import axios from "axios";
import React, { useState,useEffect } from 'react';
import Footer from '../Footer';


function Products() {

// Arama işlevselliği için state yönetimi
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredStarships, setFilteredStarships] = useState([]);

// useInfiniteQuery hook'unu çağırıyoruz, bu sayede sonsuz liste ile çalışabiliriz.
// "starships" adlı bir anahtarı (key) ve bir asenkron fonksiyonu alır.
// Bu fonksiyon sayfaları çağırmak için kullanılacak.
  const { isLoading, error, data, hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    "starships",
    async ({ pageParam = 1 }) => {
       // Belirtilen sayfadaki yıldız gemilerinin verilerini çağırıyoruz.
      const { data } = await axios.get(`https://swapi.dev/api/starships/?page=${pageParam}`);
      return data;
    },
    {
      // Sayfa parametresini döndüren bir fonksiyon belirliyoruz.
      // Sonraki sayfayı çağırmak için kullanılacak.
      getNextPageParam: (lastPage) => {
        if (!lastPage.next) {
          // Son sayfada olduğumuz için bir sonraki sayfa yok.
          // undefined döndürüyoruz.
          return undefined;
        }
        // Sonraki sayfanın URL'sinden sayfa parametresini alıyoruz.
        return new URL(lastPage.next).searchParams.get("page");
      }
    }
  );

  useEffect(() => {
    // Verilerin yüklenmesinden sonra, tüm gemilerin birleştirilmiş listesini
    if (data) {
      const allStarships = data.pages.flatMap((page) => page.results);
      setFilteredStarships(allStarships);
    }
  }, [data]);


    // Yükleme durumunu gösterir
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Hata durumunu gösterir
  if (error) {
    return <div>Error fetching data</div>;
  }

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

 // Arama terimine göre filtrelenmiş gemi verilerinin alınması
 const handleFilter = () => {
  const filteredStarships = data.pages.flatMap((page) =>
    page.results.filter(
      (starship) =>
        starship.name.toLowerCase().includes(searchTerm.toLowerCase()) || starship.model.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );
  setFilteredStarships(filteredStarships);
  setSearchTerm("")
};

  return (
    <>
      {/*Başlangıç için oluşturulmuş arayüz tasarımı*/}
      <Box bgGradient='linear-gradient(88deg, rgba(55,42,51,1) 0%, rgba(17,20,35,1) 100%)'>
        <Center>
          <Text fontSize='6xl' as={'i'}  color={'yellow'} fontFamily={'emoji'}>
            STAR WARS
          </Text>
        </Center>
        <Box mb={3}>
          <Center>
            <Text color='white' mr={4}>Name/Model</Text>
            <Input
              color={'white'}
              width='15%'
              height='30px'
              bg='#582425'
              mr={4}
              borderRadius={10}
              placeholder="Name/Model"
              value={searchTerm}
              onChange={handleSearch}
            />
            <Button bg='#25a2a2' width={40} borderRadius={30} onClick={handleFilter}>Filter</Button>
          </Center>
        </Box >
        <Center>
          <hr style={{ width: "31%", marginBottom: '60px', borderColor:'yellow' }}></hr>
        </Center>
      </Box>

     {/* Gemi kartlarının gösterildiği bölüm */}
      <Box height='100vh' >
        <Container maxW='full' bgGradient='linear-gradient(88deg, rgba(55,42,51,1) 0%, rgba(17,20,35,1) 100%)'>
          <Grid templateColumns="repeat(5, 1fr)" gap={10} >
            {filteredStarships.map((starship) => (
              <GridItem key={starship.name}  >
                <Link to={`/detail/${starship.url.split('/')[5]}`}>{/* Link kullanarak herbir card için detay sayfasına geçiş sağlanır*/} 
                  <Card 
                    background='#111423'
                    borderRadius={30}
                    _hover={{
                      transform: 'translate(8px)',
                      boxShadow: '8xl',
                    }} h={350}
                  >
                    <Image
                          h={160}
                          w={500}
                            src={img.find((item) => item.name === starship.name)?.img}
                            borderRadius={30}
                          />
                    <CardBody>
                      <Stack spacing="3">
                        <Center>
                          <Heading color={"grey"} size={"md"}> {starship.name}</Heading>
                        </Center >
                        <Center>
                          <Text color={"grey"}><Text as='b'>Model:</Text>: {starship.model}</Text>
                        </Center >
                        <Center>
                          <Text color={"grey"}><Text as='b'>Hyperdrive_rating:</Text>: {starship.hyperdrive_rating}</Text>
                        </Center >
                      </Stack>
                    </CardBody>
                  </Card>
                </Link>
              </GridItem>
            ))}
          </Grid>
        </Container>
        
        {/*daha fazla geminin yüklenebilmesi için yapılması gereken işlemler*/}
        <Center>
          <Button mt={"10"} mb={"10"}
            bgColor={"black"}
            color={"white"}
             // Eğer daha fazla sayfa varsa ve şu an yükleme yapılmıyorsa, tıklandığında "fetchNextPage()" fonksiyonunu çalıştır
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage || isFetchingNextPage}
          >
            {isFetchingNextPage
            // Eğer yükleme yapıyorsa, butonun metnini "Loading more..." olarak ayarla
              ? 'Loading more...'
               // Eğer daha fazla sayfa varsa, butonun metnini "Load More" olarak ayarla; aksi takdirde "Nothing more to load" olarak ayarla
              : hasNextPage
                ? 'Load More'
                : 'Nothing more to load'}
          </Button>
        </Center>
        <Footer />
      </Box>

    </>
  )
}

export default Products;