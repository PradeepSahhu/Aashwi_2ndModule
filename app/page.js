"use client";

import Image from "next/image";
import { CgGames } from "react-icons/cg";
import { SiRiotgames, SiAmazongames } from "react-icons/si";
import { GiWantedReward } from "react-icons/gi";
import { useState, useEffect } from "react";
import AuctionCard from "@/Components/AuctionCard";
import Betting from "@/Components/Betting";
import HighestBidder from "@/Components/HighestBidder";
import BoughtCard from "@/Components/BoughtCard";
import SellCard from "@/Components/SellCard";

//contract instance & Network Details

import ContractConnection from "./Functionality/ContractConnection";
import NetworkDetails from "./Functionality/NetworkDetails";

//robot
import { FaRobot } from "react-icons/fa";

//start
import { MdOutlineStart } from "react-icons/md";

//IPFS fetch from contract to get the data.

export default function Home() {
  // checking the exprenditure
  //******************* Expenditure ********************** */

  //! Add balance setter.
  const [addBalance, setAddBalance] = useState(false);

  //! Transfer balance setter.

  //! Record balance setter.

  //! totoal balance setter.

  //contract data.

  const [tokenBalance, setTokenBalance] = useState();
  const [chainID, setChainID] = useState();
  const [chainName, setChainName] = useState();
  const [chainAccount, setChainAccount] = useState();

  // to get the current ongoing data.

  const [fetch, setFetch] = useState();
  const [seller, setSeller] = useState();
  const [tokenID, setTokenID] = useState();

  const [currentAucData, setCurrentAucData] = useState();

  //Functions of the contract.

  //get Network details from window.etherem.request method
  const getNetworkDetails = async () => {
    const { blockchainID, blockchainName, accounts } = await NetworkDetails();
    setChainID(blockchainID);
    setChainName(blockchainName);
    setChainAccount(accounts[0]);

    console.log(blockchainID, blockchainName);
    console.log("The accounts is : " + accounts[0]);
  };

  //to know about current ongoing auction

  const includeExpenditure = async () => {
    try {
      const contractInstance = await ContractConnection();

      const res = await contractInstance.addExpenditure(10);
    } catch (error) {
      console.log(error);
    }
  };

  if (fetch !== undefined) {
    getIPFSData();
  }

  useEffect(() => {
    getNetworkDetails();
  }, []);

  return (
    <div className="bg-black mt-2">
      <div className="flex justify-center">
        <h1 className="text-4xl font-extrabold">Aashwi Frontend</h1>
      </div>
      <div className="m-5 ">
        <div className="">
          <p className="text-2xl">
            Your Account <span className="text-blue-600">{chainAccount}</span>
          </p>
          <div className="text-2xl ">
            {" "}
            <p>
              Your Balance :{" "}
              <span className="text-blue-600">
                {tokenBalance ? tokenBalance : 0}
              </span>
            </p>
          </div>
        </div>
        <div>
          <p className="text-2xl">
            Network Name:
            <span className="text-2xl text-blue-600">
              {" "}
              {chainName ? chainName : 0}
            </span>
          </p>
        </div>
        <div>
          <p className="text-2xl">
            Network Chain ID:
            <span className="text-2xl text-blue-600">
              {" "}
              {chainID ? chainID : 0}
            </span>
          </p>
        </div>
      </div>

      <div className="m-5 flex gap-6 justify-center">
        <button
          className="px-5 py-2 bg-blue-600 rounded-md text-black hover:scale-90 transition-all duration-300"
          onClick={() => setAddBalance(!addBalance)}
        >
          Add Expenditure
          <CgGames className="text-4xl inline-block m-2" />
        </button>
        <button
          className="px-5 py-2 bg-blue-600 rounded-md text-black hover:scale-90 transition-all duration-300"
          onClick={() => setShowBetYourOwn(!showBetYourOwn)}
        >
          Transfer Balance
          <SiRiotgames className="inline-block m-2 text-4xl" />
        </button>
        <button
          className="px-5 py-2 bg-blue-600 rounded-md text-black hover:scale-90 transition-all duration-300"
          onClick={() => setShowSellAsset(!showSellAsset)}
        >
          Record Expenditure
          <SiAmazongames className="inline-block m-2 text-4xl" />
        </button>
        <button
          className="px-5 py-2 bg-blue-600 rounded-md text-black hover:scale-90 transition-all duration-300"
          onClick={() => setShowPlayGame(!showPlayGame)}
        >
          Total Spend
          <FaRobot className="inline-block m-2 text-4xl" />
        </button>
      </div>

      {addBalance && (
        <div className=" bg-black text-white grid grid-cols-2 m-10">
          <form className="grid bg-[#2a66b6] px-20 py-10  col-start-1 col-end-3 mx-64 rounded-xl">
            <div className="flex justify-center mb-5">
              <p className="text-2xl font-bold text-white text-transparent">
                Add Expenditure
              </p>
            </div>
            <label className="grid col-start-1 col-end-1 ">
              Enter the Address
            </label>
            <input
              type="number"
              className="text-white bg-slate-800 p-5 rounded-md mx-5 my-5 outline-none focus:scale-110"
              required
              // onChange={(e) => setBuyAmount(e.target.value)}
            />
            <label className="grid col-start-1 col-end-1 ">Enter the Wei</label>
            <input
              className="text-white bg-slate-800 p-5 rounded-md mx-5 my-5 outline-none focus:scale-110"
              required
              type="number"
              // onChange={(e) => setWeiAmount(e.target.value)}
            />
          </form>

          <div className="flex justify-center col-span-2 items-center py-5">
            <button
              className="bg-blue-900 p-5 rounded-xl hover:bg-rose-900"
              onClick={() => includeExpenditure()}
            >
              Add 10 Expenditure
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
