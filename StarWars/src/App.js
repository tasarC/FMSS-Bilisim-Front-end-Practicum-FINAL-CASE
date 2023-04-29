// Gerekli modülleri ve bileşenleri import edilir. 
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Products from './components/Products/index.js';
import Detail from './components/Detail/index.js';


function App() {
  return (
    // Router bileşeni, uygulama rotalarını yönetmek için kullanılır.
    <Router>

    {/* Routes bileşeni, uygulamanın her bir rotası için bir Route bileşeni belirler. */}
        <Routes>
          <Route path='/' element={<Products />} />
    
         {/*// "/detail/:detail_id" rotası, Detail bileşenini gösterir ve "detail_id" parametresini kullanır. */}
          <Route path='/detail/:detail_id' element={<Detail />} />
        </Routes>
    </Router>


  );
}

export default App;




