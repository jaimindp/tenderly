import axios from 'axios';
import * as dotenv from 'dotenv';
 
dotenv.config();
 
const approveDai = async () => {
  // assuming environment variables TENDERLY_USER, TENDERLY_PROJECT and TENDERLY_ACCESS_KEY are set
  // https://docs.tenderly.co/other/platform-access/how-to-find-the-project-slug-username-and-organization-name
  // https://docs.tenderly.co/other/platform-access/how-to-generate-api-access-tokens
  const { TENDERLY_USER, TENDERLY_PROJECT, TENDERLY_ACCESS_KEY } = process.env;
 
  console.time('Simulation');
 
  const resp = await axios.post(
    `https://api.tenderly.co/api/v1/account/${TENDERLY_USER}/project/${TENDERLY_PROJECT}/simulate`,
    // the transaction
    {
      // Simulation Configuration
      save: false, // if true simulation is saved and shows up in the dashboard
      save_if_fails: false, // if true, reverting simulations show up in the dashboard
      simulation_type: 'full', // full or quick (full is default)
 
      network_id: "1", // network to simulate on
 
      // Standard EVM Transaction object
      from: '0x89d9dd2e85ecc305e276f51bb21fd4c708be9487',
      to: '0xdac17f958d2ee523a2206206994597c13d831ec7',
      input:
        '0x095ea7b3000000000000000000000000000000000022d473030f116ddee9f6b43ac78ba30000000000000000000000000000000000000000000000000000000000000000',
      gas: 226990,
      gas_price: 45, // 45 gwei
      value: 0,
    },
    {
      headers: {
        'X-Access-Key': TENDERLY_ACCESS_KEY,
      },
    },
  );
  console.timeEnd('Simulation');
 
  const transaction = resp.data.transaction;
  console.log(JSON.stringify(transaction, null, 2));
};
 
approveDai();
