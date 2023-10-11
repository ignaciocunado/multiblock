import { useNavigate } from 'react-router-dom';
import '../style/HomeInfo.css'

function HomeInfo() {

    const navi = useNavigate();

    function goERC20() {
        navi('/erc20', {replace: true});
    }

    return (
        <>
        <div id="maintitle">
            <img src='logo.png' alt='logo' id='logo'/>
            <div id='letters'>
                <div>
                    <h1>CREATE</h1>
                    <h1 id='blackLetters'>  WITHOUT LIMITS</h1>
                </div>
                <div id='text'>
                    <p>Multiblock is <em>THE</em> all-in-one solution for easily minting smart contracts, including escrow agreements and custom tokens. We empower individuals and businesses to take control of their digital agreements and transactions.</p>
                </div>
                <center><button id='start' onClick={goERC20}><h2>GET STARTED</h2></button></center>
            </div>
        </div>
        
        </>
    );
}

export default HomeInfo;