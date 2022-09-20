import { useState, useEffect, createContext, useContext } from 'react'
import { ethers } from 'ethers'
import { contractABI, contractAddress } from '../lib/constants'
import { client } from '../lib/sanityClient'
import { useRouter } from 'next/router'

declare var window: any

const TransactionContext = createContext({} as any)

export const TransactionState = () => {
  return useContext(TransactionContext)
}

let eth: any

if (typeof window !== 'undefined') {
  eth = window.ethereum
}

const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(eth)
  const signer = provider.getSigner()

  const transactionContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  )

  return transactionContract
}

interface Props {
  children: React.ReactNode
}

export const TransactionProvider = ({ children }: Props) => {
  const [currentAccount, setCurrentAccount] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [formData, setFormData] = useState({
    addressTo: '',
    amount: '',
  })

  const router = useRouter()

  useEffect(() => {
    checkIsConnectedWallet()
  }, [])

  // create user
  useEffect(() => {
    if (!currentAccount) return
    ;(async () => {
      const userDoc = {
        _type: 'users',
        _id: currentAccount,
        walletAddress: currentAccount,
        userName: 'Unnamed',
      }

      await client.createIfNotExists(userDoc)
    })()
  }, [currentAccount])

  const connectWallet = async (metamask = eth) => {
    try {
      if (!metamask) return alert('Please install metamask')

      const accounts = await metamask.request({ method: 'eth_requestAccounts' })
      setCurrentAccount(accounts[0])
    } catch (error) {
      console.error(error)
      throw new Error('No ethereum Object')
    }
  }

  const checkIsConnectedWallet = async (metamask = eth) => {
    try {
      if (!metamask) return alert('Please install metamask')

      const accounts: string[] = await metamask.request({
        method: 'eth_accounts',
      })

      if (accounts.length) {
        setCurrentAccount(accounts[0])
        console.log('wallet is already connected!')
      }
    } catch (error) {
      console.error(error)
      throw new Error('No ethereum Object')
    }
  }

  const sendTransaction = async (
    metamask = eth,
    connectedAccount = currentAccount
  ) => {
    try {
      if (!metamask) return alert('Please install metamask')
      const { addressTo, amount } = formData

      const transactionContract = getEthereumContract()

      const parsedAmount = ethers.utils.parseEther(amount)

      await metamask.request({
        method: 'eth_sendTransaction',
        params: [
          {
            from: connectedAccount,
            to: addressTo,
            gas: '0x7EF40', // 52000 Gwei
            value: parsedAmount._hex,
          },
        ],
      })

      const transactionHash = await transactionContract.publishTransaction(
        addressTo,
        parsedAmount,
        `Transfering ETH ${parsedAmount} to ${addressTo}`,
        'TRANSFER'
      )

      setIsLoading(true)

      await transactionHash.wait()

      // DB
      await saveTransaction(
        transactionHash.hash,
        amount,
        connectedAccount,
        addressTo
      )

      setIsLoading(false)
    } catch (error) {
      console.error(error)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    setFormData({ ...formData, [name]: e.target.value })
  }

  const saveTransaction = async (
    txHash: string,
    amount: string,
    fromAddress = currentAccount,
    toAddress: string
  ) => {
    const txDoc = {
      _type: 'transactions',
      _id: txHash,
      txHash: txHash,
      amount: parseFloat(amount),
      fromAddress: fromAddress,
      toAddress: toAddress,
      timestamp: new Date(Date.now()).toISOString(),
    }

    await client.createIfNotExists(txDoc)

    await client
      .patch(currentAccount!)
      .setIfMissing({ transactions: [] })
      .insert('after', 'transactions[-1]', [
        { _key: txHash, _ref: txHash, _type: 'reference' },
      ])
      .commit()

    return
  }

  // trigger the loading modal
  useEffect(() => {
    if (isLoading) {
      router.push(`/?loading=${currentAccount}`)
    } else {
      router.push('/')
    }
  }, [isLoading])

  return (
    <TransactionContext.Provider
      value={{
        currentAccount,
        connectWallet,
        sendTransaction,
        handleChange,
        formData,
        isLoading,
      }}
    >
      {children}
    </TransactionContext.Provider>
  )
}
