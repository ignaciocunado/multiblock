import '../style/NavBar.css';
import {useNavigate} from 'react-router-dom';

function NavBar () {

    const connect = async () => {
        try {
            await window.ethereum.request({
                "method": "eth_requestAccounts",
                "params": []
                });
        } 
        catch(err) {
            console.log("Request to connect rejected");
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
                {/* <img src='logo.png' id='logo' alt='logo' /> */}
                <h2 onClick={goHome}>MultiBlock</h2>
            </div>
            <h3 onClick={goERC20}>ERC-20</h3>
            <h3 onClick={goEscrow}>Escrow</h3>
            <h3 onClick={goMultiSig}>Mutisig</h3>
            <img src='metamask.png' id='metamask' alt='metamaskLogo' onClick={connect} />
        </div>
    );
}

export default NavBar;