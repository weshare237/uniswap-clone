import Head from 'next/head'
import React from 'react'
import Header from '../components/Header'
import Main from '../components/Main'
import Sidebar from '../components/Sidebar'
import Statistique from '../components/Statistique'
import TransactionHistory from '../components/TransactionHistory'

const style = {
  wrapper: `h-screen max-h-screen h-min-screen w-screen bg-[#2D242F] text-white select-none flex flex-col justify-between`,
}

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>Coinaro</title>
        <meta content='width=device-width, initial-scale=1.0' name='viewport' />
        <meta content='' name='keywords' />
        <meta content='' name='description' />

        {/* <!-- Favicon --> */}
        <link href='/img/favicon.ico' rel='icon' />

        {/* <!-- Google Web Fonts --> */}
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' />
        <link
          href='https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&family=Roboto:wght@500;700&display=swap'
          rel='stylesheet'
        />

        {/* <!-- Icon Font Stylesheet --> */}
        <link
          href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.0/css/all.min.css'
          rel='stylesheet'
        />
        <link
          href='https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css'
          rel='stylesheet'
        />

        {/* <!-- Libraries Stylesheet --> */}
        <link
          href='/lib/owlcarousel/assets/owl.carousel.min.css'
          rel='stylesheet'
        />
        <link
          href='/lib/tempusdominus/css/tempusdominus-bootstrap-4.min.css'
          rel='stylesheet'
        />

        {/* <!-- Customized Bootstrap Stylesheet --> */}
        <link href='/css/bootstrap.min.css' rel='stylesheet' />

        {/* <!-- Template Stylesheet --> */}
        <link href='/css/style.css' rel='stylesheet' />

        {/* <!-- JavaScript Libraries --> */}
        <script src='https://code.jquery.com/jquery-3.4.1.min.js'></script>
        <script src='https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/js/bootstrap.bundle.min.js'></script>
        <script src='/lib/easing/easing.min.js'></script>
        <script src='/lib/waypoints/waypoints.min.js'></script>
        <script src='/lib/owlcarousel/owl.carousel.min.js'></script>
        <script src='/lib/tempusdominus/js/moment.min.js'></script>
        <script src='/lib/tempusdominus/js/moment-timezone.min.js'></script>
        <script src='/lib/tempusdominus/js/tempusdominus-bootstrap-4.min.js'></script>

        {/* <!-- Template Javascript --> */}
        <script src='/js/main.js'></script>
      </Head>

      <div className='container-fluid position-relative d-flex p-0'>
        <Sidebar />

        {/* <!-- Content Start --> */}
        <div className='content'>
          <Header />

          {/* <!-- Sale & Revenue Start --> */}
          <Statistique />
          {/* <!-- Sale & Revenue End --> */}

          <Main />

          <TransactionHistory />
        </div>
        {/* <!-- Content End --> */}

        {/* <!-- Back to Top --> */}
        <a
          href='#'
          className='btn btn-lg btn-primary btn-lg-square back-to-top'
        >
          <i className='bi bi-arrow-up'></i>
        </a>
      </div>
    </>
  )
}

export default Home
