"use client";

import Image from "next/image";
import { CgGames } from "react-icons/cg";
import { SiRiotgames, SiAmazongames } from "react-icons/si";

import { useState, useEffect } from "react";

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

  const [accountBalance, setAccountBalance] = useState();

  const [expenditureAmount, setExpenditureAmount] = useState();

  //! lending money (adding)
  const [lendingMoney, setLendingMoney] = useState(false);

  //? lending variables

  const [lendingAddress, setLendingAddress] = useState();
  const [lendingAmount, setLendingAmout] = useState();

  //! Transfer balance setter.

  //! Record balance setter.

  //! totoal balance setter.

  //! expenditure record

  const [totalExpenditure, setTotelExpenditure] = useState();
  const [showTotalExpenditure, setShowtotalExpenditure] = useState();

  const [lendingRecords, setLendingRecords] = useState();
  const [totalLendingList, setTotalLendingList] = useState();

  //contract data.

  const [chainID, setChainID] = useState();
  const [chainName, setChainName] = useState();
  const [chainAccount, setChainAccount] = useState();

  // to get the current ongoing data.

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

  const getAccountBalance = async () => {
    try {
      const contractInstance = await ContractConnection();

      const res = await contractInstance.getBalance();
      setAccountBalance(parseInt(res));
    } catch (error) {
      console.log(error);
    }
  };

  const getExpenditureRecords = async () => {
    try {
      const contractInstance = await ContractConnection();
      const res = await contractInstance.getLendMoney();

      setTotalLendingList(res);
    } catch (error) {
      console.log(error);
    }
  };

  const includeExpenditure = async () => {
    try {
      const contractInstance = await ContractConnection();

      const res = await contractInstance.addExpenditure(
        parseInt(expenditureAmount)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const totalExpenses = async () => {
    try {
      const contractInstance = await ContractConnection();

      const res = await contractInstance.getExpenditure();
      setTotelExpenditure(parseInt(res));
      console.table([totalExpenditure]);
    } catch (error) {
      console.log(error);
    }
  };

  const addTheLendingDetail = async () => {
    try {
      console.table([lendingAddress, lendingAmount]);
      const contractInstance = await ContractConnection();
      const res = contractInstance.lending(
        lendingAddress,
        parseInt(lendingAmount)
      );
    } catch (error) {
      console.log(error);
    }
  };

  if (totalLendingList == undefined) {
    getExpenditureRecords();
  }

  if (accountBalance == undefined) {
    getAccountBalance();
  }

  if (totalExpenditure == undefined) {
    totalExpenses();
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
                {accountBalance ? accountBalance : 0}
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
          onClick={() => setLendingMoney(!lendingMoney)}
        >
          Lending Money
          <SiRiotgames className="inline-block m-2 text-4xl" />
        </button>
        <button
          className="px-5 py-2 bg-blue-600 rounded-md text-black hover:scale-90 transition-all duration-300"
          onClick={() => setLendingRecords(!lendingRecords)}
        >
          Lending Records
          <SiAmazongames className="inline-block m-2 text-4xl" />
        </button>
        <button
          className="px-5 py-2 bg-blue-600 rounded-md text-black hover:scale-90 transition-all duration-300"
          onClick={() => setShowtotalExpenditure(!showTotalExpenditure)}
        >
          Total Expenditure
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
              Enter the Amount to include
            </label>
            <input
              className="text-white bg-slate-800 p-5 rounded-md mx-5 my-5 outline-none focus:scale-110"
              required
              type="number"
              onChange={(e) => setExpenditureAmount(e.target.value)}
            />
          </form>

          <div className="flex justify-center col-span-2 items-center py-5">
            <button
              className="bg-blue-900 p-5 rounded-xl hover:bg-rose-900"
              onClick={() => includeExpenditure()}
            >
              Add Expenditure
            </button>
          </div>
        </div>
      )}

      {lendingMoney && (
        <div className=" bg-black text-white grid grid-cols-2 m-10">
          <form className="grid bg-[#2a66b6] px-20 py-10  col-start-1 col-end-3 mx-64 rounded-xl">
            <div className="flex justify-center mb-5">
              <p className="text-2xl font-bold text-white text-transparent">
                Add Lending Details
              </p>
            </div>
            <label className="grid col-start-1 col-end-1 ">
              Enter the Address
            </label>
            <input
              type="txt"
              className="text-white bg-slate-800 p-5 rounded-md mx-5 my-5 outline-none focus:scale-110"
              required
              onChange={(e) => setLendingAddress(e.target.value)}
            />
            <label className="grid col-start-1 col-end-1 ">
              Enter the Amount Lended
            </label>
            <input
              className="text-white bg-slate-800 p-5 rounded-md mx-5 my-5 outline-none focus:scale-110"
              required
              type="number"
              onChange={(e) => setLendingAmout(e.target.value)}
            />
          </form>

          <div className="flex justify-center col-span-2 items-center py-5">
            <button
              className="bg-blue-900 p-5 rounded-xl hover:bg-rose-900"
              onClick={() => addTheLendingDetail()}
            >
              Add in the receipt
            </button>
          </div>
        </div>
      )}

      {lendingRecords && (
        <div className="mx-auto max-w-7xl pt-40 px-6" id="exchange-section">
          <div className="table-b bg-navyblue p-8 overflow-x-auto">
            <h3 className="text-offwhite text-2xl justify-center flex">
              Lending Records
            </h3>
            <table className="table-auto w-full mt-10">
              <thead>
                <tr className="text-white bg-darkblue rounded-lg">
                  <th className="px-4 py-4 text-start font-normal">S.no</th>
                  <th className="px-4 py-4 text-start font-normal">Address</th>
                  <th className="px-4 py-4 font-normal">Amount</th>
                </tr>
              </thead>
              <tbody>
                {totalLendingList.map((eachInstance, i) => (
                  <tr key={i} className="border-b border-b-darkblue">
                    <td className="px-4 py-6 text-center text-white">
                      {i + 1}
                    </td>

                    <td className="px-4 py-6 text-center text-white">
                      {eachInstance._recepient}
                    </td>
                    <td className={`px-4 py-6 text-center `}>
                      {parseInt(eachInstance.amount)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {showTotalExpenditure && (
        <div className="ml-10 h-[40vh] w-full flex justify-center items-center">
          <p className="text-[1rem]">
            Total Expenditure is :{" "}
            <span className="text-blue-600 ml-5 mt-5 font-bold text-[2rem]">{`${totalExpenditure}`}</span>
          </p>
        </div>
      )}
    </div>
  );
}
