import '../style/NavBar.css'
import {useNavigate} from 'react-router-dom'

function NavBar () {

    const navi = useNavigate();

    function goHome() {
        navi('/', {replace:true})
    }

    function goERC20() {
        navi('/erc20', {replace:true})
    }

    function goEscrow() {
        navi('/escrow', {replace:true})
    }

    function goMultiSig() {
        navi('/multisig', {replace:true})
    }

    return (
        <div id='navbar'> 
            <div id='logoTitle'>
                <img src='logo.png' id='logo' alt='logo' />
                <h1 onClick={goHome}>MultiBlock</h1>
            </div>
            <h2 onClick={goERC20}>ERC-20</h2>
            <h2 onClick={goEscrow}>Escrow</h2>
            <h2 onClick={goMultiSig}>Mutisig</h2>
        </div>
    );
}

export default NavBar;