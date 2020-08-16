import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'

import Layout from '../components/Layout'

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

const IndexPage = () => {
  const posts = usePosts()

  return (
    <Layout>
      <h1>Aurora & Lambda's Life</h1>
      {posts.map((post, index) => {
        return (
          <div key={index}>
            <time>{post.time}</time>
            <p>{post.content}</p>
          </div>
        )
      })}
    </Layout>
  )
}

export default IndexPage
