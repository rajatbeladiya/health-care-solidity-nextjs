const HDWalletProvider = require('@truffle/hdwallet-provider');
import Web3 from 'web3';
let web3;
if(typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
    web3 = new Web3(window.web3.currentProvider);
}else{
    // we are in the server and matamask is not using by user
    const provider = new HDWalletProvider(
        'upset shrimp mansion focus victory earth lend wear recycle loan narrow input',
        'https://rinkeby.infura.io/v3/f009563c66ad468d86469d44b362ff1b'
    );
    web3 = new Web3(provider);
}
export default web3;