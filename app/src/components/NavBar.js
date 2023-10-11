import '../style/NavBar.css';
import {useNavigate} from 'react-router-dom';
import {useSDK} from '@metamask/sdk-react';
import {useState} from 'react';

function NavBar () {

    const [account, setAccount] = useState('');
    const { sdk, connected, connecting, provider, chainId } = useSDK();

    const connect = async () => {
        try {
        const accounts = await sdk?.connect();
        setAccount(accounts?.[0]);
        } 
        catch(err) {
        console.warn(`failed to connect..`, err);
        }
    };

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
            <img src='metamask.png' id='metamask' alt='metamaskLogo' onClick={connect} />
        </div>
    );
}

export default NavBar;