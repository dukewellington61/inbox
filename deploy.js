const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const { interface, bytecode } = require("./compile");

const provider = new HDWalletProvider(
  "vibrant cradle subject wreck blade proud ritual clean child furnace liquid cheap",
  "https://rinkeby.infura.io/v3/585edaa5e87c48d4ad3ae6032e3b10e6"
);

const web3 = new Web3(provider);

// the only reason we put this in a function is so we can use the async/await syntax. otherwise we had to do the .then()
const deploy = async () => {
  // Get a list of all accounts
  accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy from account", accounts[0]);

  // Use one of those accounts to deploy the contract
  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
      data: bytecode,
      arguments: ["Hi there!"],
    })
    .send({ from: accounts[0], gas: "1000000" });

  console.log("Contract deployed to", result.options.address);
};

deploy();
