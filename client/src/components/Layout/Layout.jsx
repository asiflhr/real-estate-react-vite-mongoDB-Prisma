import React from 'react'
import Header from '../Header/Header'
import Hero from '../Hero/Hero'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'

const Layout = ({ children }) => {
  return (
    <>
      <div style={{ background: 'var(--black)', overflow: 'hidden' }}>
        <Header />
        <Outlet />
      </div>
      <Footer />
    </>
  )
}

export default Layout
