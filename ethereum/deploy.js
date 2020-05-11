const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const HealthCare = require('./build/HealthCare.json');

const provider = new HDWalletProvider(
    'upset shrimp mansion focus victory earth lend wear recycle loan narrow input',
    'https://rinkeby.infura.io/v3/f009563c66ad468d86469d44b362ff1b'
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log("Attempting to deploy contract by account address : ", accounts[0]);

    const result = await new web3.eth.Contract(JSON.parse(HealthCare.interface))
        .deploy({ data: '0x' + HealthCare.bytecode })
        .send({  gas: '3000000',from: accounts[0] }); 
    
    //console.log(compiledFactory.interface);
    console.log("Contract deployed to : ", result.options.address);

};
deploy();