
import './App.css';
import Home from './Home';
import Footer from './component/Footer';
import Header from './component/Header';
import Coins from './Coins';
import CoinDetails from './CoinDetails';
import Exchanges from './Exchanges';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
function App() {
  return (
    <div className="App">
     <BrowserRouter>
     <Header/>
     <Routes>
      <Route path={'/'} element={<Home/>}/>
      <Route path={'/coin/:id'} element={<CoinDetails/>}/>
      <Route path={'/exchange'} element={<Exchanges/>}/>
      <Route path={'/coins'} element={<Coins/>}/>
     </Routes>
     <Footer/>
     </BrowserRouter>
    </div>
  );
}

export default App;
