import { useEffect } from 'react';
import { useState } from 'react';
import { ethers } from 'ethers';
import { Alchemy, Network } from 'alchemy-sdk';
import contractABI from '../abi/tokenABI.json';
import '../style/MintERC20.css';
import '../style/card.css';

const settings = {
    apiKey: process.env.SEPOLIA_KEY,
    network: Network.ETH_SEPOLIA,
};

const alchemy = new Alchemy(settings);

function MintERC20() {

    const [account, setAccount] = useState('');
    const [network, setNetwork] = useState('');
    const [connected, setConnected] = useState(false);
    const [blockNumber, setBlockNuber] = useState(0);
    const [tokens, setTokens] = useState([]);
    const factoryAddress = '0xAC1eE48dF6768a98C69c753126304dA1460b7A47';

    async function changeNetwork() {
        try {
            await window.ethereum.request({
                "method": "wallet_switchEthereumChain",
                "params": [
                  {
                    "chainId": "0xaa36a7"
                  }
                ]
              });
        }
        catch(e) {

        }
    }

    useEffect(() => {
        async function getAccounts() {
           try {
            await window.ethereum.request({
                "method": "eth_requestAccounts",
                "params": []
              }).then((res) => {
                setAccount(res[0]);
                setConnected(true);
            });
            changeNetwork();
           }
           catch(e) {
            console.log("User rejected request to connnect wallet");
           }
        }
        getAccounts();
    }, [])
  
    useEffect(() => {
        async function getNetwork() {
            try {
                const chainId = await window.ethereum.request({ method: 'eth_chainId' });
                setNetwork(chainId);
            }
            catch(e) {
             alert(e);
            }
        }
        getNetwork();
    }, [])

    useEffect(() => {
        async function getBlockNumber() {
            await alchemy.core.getBlockNumber().then((res) => setBlockNuber(res));
        }
        getBlockNumber();
    }, [])


    useEffect(() => {
        async function getEvents() {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const contract = new ethers.Contract(factoryAddress, contractABI.abi, provider);
            const mintFilter = contract.filters.TokenCreated();
            const allEvents = await contract.queryFilter(mintFilter, blockNumber - 10000, blockNumber);
            setTokens(allEvents?.filter(event => event?.address === account).map(event => event.args));
        }
        getEvents();
    }, [account, blockNumber]);

 
    async function mint() {
        const name = document.getElementById('name').value;
        const ticker = document.getElementById('ticker').value;
        const supply = ethers.utils.parseEther(document.getElementById('supply').value);
        if(supply < 0 || name.length === 0 || ticker.length === 0 ) {
            alert("Please enter correct inputs");
            return;
        }
        if(!connected) {
            alert("Please connect your wallet");
            return;
        }
        if(network !== '0xaa36a7') {
            alert("Please switch to the correct network");
            changeNetwork();
            return;
        }
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const token = new ethers.Contract(factoryAddress, contractABI.abi, provider.getSigner(0));
            const tx = await token.mintContract(name, ticker, supply);
        }
        catch(e) {
            alert("Transaction failed or cancelled, please try again.");
        }
    }

    return (
        <>
        <center><h1>ERC20</h1></center>
        <div id="main">
            <div className='card' id='createToken'>
            <h2> Token name </h2>
                <label>Token Name: <input type="text" id="name" placeholder='Ether' minLength="1"/></label>

                <label>Token Ticker: <input type="text" id="ticker" placeholder='ETH' minLength="1" maxLength="5"/></label>

                <label>Initial Supply: <input type='number' id="supply" placeholder='1000' min="1"/></label>

                <div className="button" id="deploy" onClick={(e) => {
                    e.preventDefault();
                    mint();
                }}>Mint</div>
            </div>
            <div className='card' id='existingTokens'>
                <h2>Your tokens</h2>
            </div>
        </div>
        </>
    );
}

export default MintERC20;