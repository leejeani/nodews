const {Web3} = require('web3');


function getWeb3() { 
  console.log('start getWeb3');
    const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:7543'));
    console.log('start getWeb3 end');
    return web3;
}

async function getAccounts() {
    try {
        let accounts1 = await getWeb3().eth.accounts;
        console.log(accounts1);
        const accounts = await getWeb3().eth.getAccounts(); 
        console.log(accounts);
        return accounts;
    } catch (e) {
        console.log(e);
     
        return e;
    }
}

let result  = getAccounts();
console.log('ok');
console.log(result);