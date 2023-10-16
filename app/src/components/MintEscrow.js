import { useEffect } from 'react';
import { useState } from 'react';
import { ethers } from 'ethers';
import { Alchemy, Network } from 'alchemy-sdk';
import contractABI from '../abi/escrowABI.json';
import Escrow from './Escrow.js';
import '../style/Mint.css';
import '../style/card.css';

const settings = {
    apiKey: process.env.SEPOLIA_KEY,
    network: Network.ETH_SEPOLIA,
};

const alchemy = new Alchemy(settings);

function MintEscrow() {
    const [account, setAccount] = useState('');
    const [network, setNetwork] = useState('');
    const [connected, setConnected] = useState(false);
    const [blockNumber, setBlockNuber] = useState(0);
    const [escrows, setEscrows] = useState([]);
    const factoryAddress = '0xaC6E7931D961B77DBf349Bc695403a29e8f67005';

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
            const escrowsByUser = await contract.connect(account).getUserContracts().then((res) => setEscrows(res));
        }

        getEvents();
    }, [account, blockNumber]);

 
    async function mint() {
        const reg = new RegExp('0x[0-9a-fA-F]{40}');
        const arbiter = document.getElementById('arbiter').value;
        const beneficiary = document.getElementById('beneficiary').value;
        const value = ethers.utils.parseEther(document.getElementById('value').value);
        if(!arbiter.match(reg) || !beneficiary.match(reg)) {
            alert("Please enter correct addresses");
            return;
        }
        if(value < 0) {
            alert("Value cannot be smaller than zero");
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
            const escrow = new ethers.Contract(factoryAddress, contractABI.abi, provider.getSigner(0));
            const tx = await token.deployContract(arbiter, beneficiary, {value: ethers.utils.parseUnits(value, 'ether')});
        }
        catch(e) {
            alert("Transaction failed or cancelled, please try again.");
        }
    }

    async function approve() {

    }
    

    return (
        <>
        <center><h1>Escrow</h1></center>
        <div id="main">
            <div className='card' id='createToken'>
            <h2> Token name </h2>
                <label>Arbiter: <input type="text" id="arbiter" placeholder='0x...'/></label>

                <label>Beneficiary: <input type="text" id="beneficiary" placeholder='0x...'/></label>

                <label>Value (in ETH): <input type='number' id="value" placeholder='1000' min="0"/></label>

                <div className="button" id="deploy" onClick={(e) => {
                    e.preventDefault();
                    mint();
                }}>Mint</div>
            </div>
            <div id='right'>
                <div className='card' id='existingEscrows'>
                    <h2>Your Escrows</h2>
                    <div id='container'>
                        {escrows?.map((escrow) => {
                            return <Escrow key={escrow} contract={escrow} />
                        })}
                    </div>
                </div>
                <div className='card' id='approve'>
                    <h2>Approve Escrow</h2>
                    <label>Address: <input type='text' id='contract' placeholder='0x...' /></label>
                    <div className="button" id="approve" onClick={(e) => {
                    e.preventDefault();
                    approve();
                }}>Approve</div>
                </div>
            </div>
        </div>
        </>
    );
}

export default MintEscrow;