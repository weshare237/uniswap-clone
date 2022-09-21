import React from 'react'

const Statistique = () => {
  return (
    <div className='container-fluid pt-4 px-4'>
      <div className='row g-4 flex justify-content-between'>
        <div className='col-sm-6 col-xl-3'>
          <div className='bg-secondary rounded d-flex align-items-center justify-content-between p-4'>
            <i className='fa fa-chart-line fa-3x text-primary'></i>
            <div className='ms-3'>
              <p className='mb-2'>Today Transactions</p>
              <h6 className='mb-0'>$1234</h6>
            </div>
          </div>
        </div>
        <div className='col-sm-6 col-xl-3'>
          <div className='bg-secondary rounded d-flex align-items-center justify-content-between p-4'>
            <i className='fa fa-chart-bar fa-3x text-primary'></i>
            <div className='ms-3'>
              <p className='mb-2'>Wallet Connected To</p>
              <h6 className='mb-0'>$1234</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Statistique
