import "./App.css";
import { ethers } from "ethers";
import { useEffect, useState, useCallback } from "react";
import CustomContract from "./contracts/CustomContract.sol/CustomContract.json";

function App() {
  const [ownerName, setOwnerName] = useState(""); 
  const [ownerBalance, setOwnerBalance] = useState("");
  const [transferAmount, setTransferAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [selectedAddress, setSelectedAddress] = useState(undefined);
  const [contractInstance, setContractInstance] = useState("");
  const abi = CustomContract.abi;

  const contractAddress = "0x510Fbf9Eea88F8520Ea3B31775eE1EDcaDE9fD53";
  
  const getContractOwnerName = useCallback(async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        alert("Please install the MetaMask extension");
        return;
      }

      const [selectedAddress] = await ethereum.request({
        method: "eth_requestAccounts",
      });

      setSelectedAddress(selectedAddress);

      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);
      setContractInstance(contract);
    } catch (error) {
      console.error(error);
    }
  }, [abi]);

  useEffect(() => {
    getContractOwnerName();
  }, [getContractOwnerName]);

  useEffect(() => {
    async function fetchOwnerData() {
      if (contractInstance) {
        const name = await contractInstance.getContractOwnerName();
        setOwnerName(name);

        const balance = await contractInstance.getBalance();
        setOwnerBalance(ethers.utils.formatEther(balance.toString()));
      }
    }
    fetchOwnerData();
  }, [contractInstance]);

  window.ethereum.on("accountsChanged", (accounts) => {
    if (accounts[0] && accounts[0] !== selectedAddress) {
      getContractOwnerName();
    }
  });

  async function handleTransfer() {
    try {
      if (!contractInstance) {
        alert("Please connect your wallet first");
        return;
      }

      if (!transferAmount || transferAmount <= 0) {
        alert("Transfer amount should be greater than 0");
        return;
      }

      const value = ethers.utils.parseEther(transferAmount);
      const transaction = await contractInstance.transferTokens({
        value,
      });

      await transaction.wait();

      const balance = await contractInstance.getBalance();
      setOwnerBalance(ethers.utils.formatEther(balance.toString()));

      alert("Tokens transferred successfully!");
    } catch (error) {
      console.error(error);
      alert("Transfer failed");
    }
  }

  async function handleWithdraw() {
    try {
      if (!contractInstance) {
        alert("Please connect your wallet first");
        return;
      }

      if (!withdrawAmount || withdrawAmount <= 0) {
        alert("Withdrawal amount should be greater than 0");
        return;
      }

      const value = ethers.utils.parseEther(withdrawAmount);
      const transaction = await contractInstance.withdrawTokens({
        value,
      });

      await transaction.wait();

      const balance = await contractInstance.getBalance();
      setOwnerBalance(ethers.utils.formatEther(balance.toString()));

      alert("Tokens withdrawn successfully!");
    } catch (error) {
      console.error(error);
      alert("Withdrawal failed");
    }
  }

  return (
    <main className="app-container">
      <h1 className="title">Ethereum Universe</h1>
      <div className="owner-info">
        <h2 className="owner-heading">Owner Name: {ownerName}</h2>
        <p className="balance">Balance: {ownerBalance} ETH</p>
      </div>
      <div className="transfer-section">
        <label htmlFor="transfer" className="label">
          Transfer Amount
        </label>
        <div className="transfer-input">
          <input
            type="number"
            id="transfer"
            inputMode="numeric"
            value={transferAmount}
            onChange={(e) => {
              setTransferAmount(e.target.value);
            }}
            className="input-field"
          />
          <span className="ether">ETH</span>
        </div>
        <button className="button" onClick={handleTransfer}>
          Deposit
        </button>
      </div>
      <div className="transfer-section">
        <label htmlFor="withdraw" className="label">
          Withdraw Amount
        </label>
        <div className="transfer-input">
          <input
            type="number"
            id="withdraw"
            inputMode="numeric"
            value={withdrawAmount}
            onChange={(e) => {
              setWithdrawAmount(e.target.value);
            }}
            className="input-field"
          />
          <span className="ether">ETH</span>
        </div>
        <button className="button" onClick={handleWithdraw}>
          Withdraw
        </button>
      </div>
      <button className="connect-button" onClick={getContractOwnerName}>
        Connect to Wallet
      </button>
    </main>
  );
}

export default App;
