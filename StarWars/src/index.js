import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

//Bu, React Query tarafından sunulan bir önbellek yöneticisi olan ve bir REST API'ye veri isteklerinde bulunmamızı sağlayan bir araçtır
const queryClient = new QueryClient({
  //defaultOptions içindeki queries ayarları, önbellek davranışlarını değiştirir.
  defaultOptions:{
    queries:{
      //refetchOnMount ve refetchOnWindowFocus ayarları, bileşen ilk render edildiğinde ve pencere odak kaybettiğinde yeniden yükleme işlemlerinin gerçekleşmemesini sağlar
      refetchOnMount:false,
      refetchOnWindowFocus:false
    }
  }
})


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <App />
      </ChakraProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);


