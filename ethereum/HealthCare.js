import web3 from './web3';
import HealthCare from './build/HealthCare.json';

const instance = new web3.eth.Contract(
  JSON.parse(HealthCare.interface),
  '0xd787DC4D9d78A6C1945ECEbFD08309F3AB1Fc832'
);

export default instance;
