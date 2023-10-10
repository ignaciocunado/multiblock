import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home.js';
import Escrow from './pages/Escrow.js'
import ERC20 from './pages/ERC20.js';
import MultiSig from './pages/Multisig.js';

function App() {
    return(
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/erc20' element={<ERC20 />} />
            <Route path='/escrow' element={<Escrow />} />
            <Route path='/multisig' element={<MultiSig />} />
        </Routes>
        
    )
}

export default App;