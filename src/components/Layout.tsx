import React from 'react'
import SEO from './seo'

const Layout = ({ children }) => {
  return (
    <>
      <SEO />
      {children}
    </>
  )
}

export default Layout
