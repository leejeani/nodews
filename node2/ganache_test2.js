const {Web3} = require('web3');



web3 = new Web3(
    new Web3.providers.HttpProvider("http://127.0.0.1:7543")
);


let accounts = web3.eth.accounts;
console.log(accounts);
