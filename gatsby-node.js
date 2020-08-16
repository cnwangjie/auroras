/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const axios = require('axios')
const path = require('path')
const { key } = require('./secrets')
const moment = require('moment')

const spreadsheetId = '1lNN65d5U4QdIyCGkiBiRZROWq7kMRFi9nkkfhAJ2Bgs'
const apiKey = key

const getData = async (spreadsheetId, sheet, dim) => {
  const rsp = await axios.get(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values:batchGet`,
    {
      params: {
        ranges: sheet,
        majorDimension: dim,
        key: apiKey,
      },
      validateStatus: null,
    }
  )
  const rawItems = rsp.data.valueRanges[0].values
  const keys = rawItems[0]
  return rawItems.slice(1).map((row) => {
    const item = {}
    row.forEach((v, i) => (item[keys[i]] = v))
    return item
  })
}

// https://docs.google.com/spreadsheets/d/1lNN65d5U4QdIyCGkiBiRZROWq7kMRFi9nkkfhAJ2Bgs/edit#gid=0
const handleRawData = (data) =>
  data.map((i) => {
    return {
      time: i.rawTime,
      content: i.rawContent,
    }
  })

const gatsby = (module.exports = {
  async sourceNodes({
    actions: { createNode },
    createNodeId,
    createContentDigest,
  }) {
    const createNodes = (data, type) => {
      data.map((item, i) => {
        const itemNode = {
          id: createNodeId(type + '-' + i),
          parent: '__SOURCE__',
          internal: {
            type,
            contentDigest: createContentDigest(item),
          },
          children: [],
          ...item,
        }

        createNode(itemNode)
      })
    }

    const posts = await getData(spreadsheetId, 'posts', 'ROWS')
    createNodes(handleRawData(posts), 'posts')
  },
})
