import React, { useEffect, useState } from 'react'
import { TransactionState } from '../context/TransactionContext'

const Sidebar = () => {
  const [userName, setUserName] = useState<string>('')
  const { connectWallet, currentAccount } = TransactionState()

  useEffect(() => {
    if (!currentAccount) return
    setUserName(`${currentAccount.slice(0, 7)}...${currentAccount.slice(35)}`)
  }, [currentAccount])

  return (
    <div className='sidebar pe-4 pb-3'>
      <nav className='navbar bg-secondary navbar-dark'>
        <a href='index.html' className='navbar-brand mx-4 mb-3'>
          <h3 className='text-primary'>
            <i className='fa fa-user-edit me-2'></i>Coinaro
          </h3>
        </a>
        <div className='d-flex align-items-center ms-4 mb-4'>
          {currentAccount ? (
            <>
              <div className='position-relative'>
                <img
                  className='rounded-circle'
                  src='/img/user.png'
                  alt=''
                  style={{ width: '40px', height: '40px' }}
                />
                <div className='bg-success rounded-circle border-2 border-white position-absolute end-0 bottom-0 p-1'></div>
              </div>
              <div className='ms-3'>
                <h6 className='mb-0'>{userName}</h6>
                <span>Unnamed</span>
              </div>
            </>
          ) : (
            <div
              className='nav-item dropdown cursor-pointer'
              onClick={() => {
                connectWallet()
              }}
            >
              <a className='nav-link'>
                <i className='fa fa-bell me-lg-2'></i>
                <span className='d-none d-lg-inline-flex'>Connect Wallet</span>
              </a>
            </div>
          )}
        </div>
        <div className='navbar-nav w-100'>
          <a href='#' className='nav-item nav-link active'>
            <i className='fa fa-tachometer-alt me-2'></i>Swap
          </a>

          <a href='#' className='nav-item nav-link'>
            <i className='fa fa-th me-2'></i>Pool
          </a>
          <a href='#' className='nav-item nav-link'>
            <i className='fa fa-keyboard me-2'></i>Vote
          </a>

          <a href='#' className='nav-item nav-link'>
            <i className='fa fa-chart-bar me-2'></i>Charts
          </a>
        </div>
      </nav>
    </div>
  )
}

export default Sidebar
