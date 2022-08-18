import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

require('dotenv').config({path:'FORK-PROJECT/.env'});

const { API_URL, PRIVATE_KEY } = process.env;

const config: HardhatUserConfig = {
  solidity: {
    version : "0.8.9"
  },

  networks: {
  hardhat: {
    forking: {
      url: "https://mainnet.infura.io/v3/f02904b738024f4fabbabdb404d4c0f4",
    }
  }
}
};
export default config;
