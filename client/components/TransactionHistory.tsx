import React, { useEffect, useState } from 'react'
import { client } from '../lib/sanityClient'
import Image from 'next/image'
import { FiArrowUpRight } from 'react-icons/fi'
import { TransactionState } from '../context/TransactionContext'

const style = {
  wrapper: `h-full text-white select-none h-full w-screen flex-1 pt-14 flex items-end justify-end pb-12 overflow-scroll px-8`,
  txHistoryItem: `bg-[#191a1e] rounded-lg px-4 py-2 my-2 flex items-center justify-end`,
  txDetails: `flex items-center`,
  toAddress: `text-[#f48706] mx-2`,
  txTimestamp: `mx-2`,
  etherscanLink: `flex items-center text-[#2172e5]`,
}

const TransactionHistory = () => {
  const { isLoading, currentAccount } = TransactionState()
  const [transactionHistory, setTransactionHistory] = useState([])

  useEffect(() => {
    ;(async () => {
      if (!isLoading && currentAccount) {
        const query = `*[_type=='users' && _id=='${currentAccount}'] {
                       'transactionList': transactions[] -> {
                         txHash,  
                         toAddress, 
                         amount, 
                         timestamp
                       }|order(timestamp desc)
                     }`

        const transactions = await client.fetch(query)
        setTransactionHistory(transactions[0].transactionList)
      }
    })()
  }, [isLoading, currentAccount])

  return (
    <div className={style.wrapper}>
      <div>
        {transactionHistory &&
          transactionHistory?.map((transaction: any, index) => (
            <div className={style.txHistoryItem} key={index}>
              <div className={style.txDetails}>
                <Image
                  src='/assets/eth.png'
                  height={20}
                  width={15}
                  alt='ethereum'
                />
                {transaction.amount} sent to{' '}
                <span className={style.toAddress}>
                  {transaction.toAddress.substring(0, 6)} ...
                </span>
              </div>{' '}
              on{' '}
              <div className={style.txTimestamp}>
                {new Date(transaction.timestamp).toLocaleString('en-US', {
                  timeZone: 'PST',
                  hour12: true,
                  timeStyle: 'short',
                  dateStyle: 'long',
                })}
              </div>
              <div className={style.etherscanLink}>
                <a
                  href={`https://goerli.etherscan.io/tx/${transaction.txHash}`}
                  target='__blank'
                  rel='noreferrer'
                  className={style.etherscanLink}
                >
                  View on Etherscan
                  <FiArrowUpRight />
                </a>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default TransactionHistory
