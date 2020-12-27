import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'

import Layout from '../components/Layout'
import Timeline from '../components/Timeline'
import { parseUglyDate } from '../utils'

export const usePosts = () => {
  const data = useStaticQuery(graphql`
    {
      allPosts {
        nodes {
          time
          content
        }
      }
    }
  `)

  return data.allPosts.nodes
}

const Header = styled.h1`
  text-align: center;
`

const IndexPage = () => {
  const posts = usePosts()

  const handledPosts = posts.map(item => {
    return {
      ...item,
      time: parseUglyDate(item.time),
    }
  }).reverse()

  return (
    <Layout>
      <Header>Aurora & Lambda's Life</Header>
      <Timeline
        items={handledPosts}
      />
    </Layout>
  )
}

export default IndexPage
