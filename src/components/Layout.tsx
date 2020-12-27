import React from 'react'
import SEO from './seo'

import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  font-family: -apple-system,BlinkMacSystemFont,Helvetica Neue,Helvetica,Arial,PingFang SC,Hiragino Sans GB,Microsoft YaHei,sans-serif;
  body {
    margin: 0;
    background: #f0f3f4;
  }
`

const Layout = ({ children }) => {
  return (
    <>
      <GlobalStyle />
      <SEO />
      {children}
    </>
  )
}

export default Layout
