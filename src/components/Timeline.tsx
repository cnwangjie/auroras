import React, { FC } from 'react'
import styled from 'styled-components'
import dayjs from 'dayjs'
import _ from 'lodash'

const TimelineContainer = styled.div`
  position: relative;
  margin: 0 auto;
  width: 800px;
`

const Headline = styled.div`
  position: relative;
  width: 168px;
  text-align: center;
`

const TimelineDate = styled.div`
  border-radius: 50px;
  padding: 5px 15px;
  color: #58666e;
  border-color: #dee5e7;
  background: #fff;
  font-weight: 500;
  font-size: 12px;
  line-height: 1.5;
  display: inline-block;
  cursor: pointer;
  text-align: center;
  white-space: nowrap;
  user-select: none;
  border: 1px solid transparent;
  box-shadow: rgba(90, 90, 90, 0.1) 0px 1px 1px;
  &:hover {
    color: rgb(51, 51, 51);
    background: rgb(230, 230, 230);
    border-color: rgb(173, 173, 173);
  }
  &:active {
    box-shadow: rgba(0, 0, 0, 0.125) 0px 3px 5px inset;
  }
`

const Item = styled.div`
  margin-left: 84px;
  border-style: solid;
  border-width: 0 0 0 4px;
  padding: 15px 0 15px 20px;

  &::before {
    box-sizing: border-box;
    position: relative;
    content: "";
    float: left;
    top: 15px;
    margin-left: -27px;
    width: 10px;
    height: 10px;
    border-color: inherit;
    border-width: 3px;
    border-radius: 50%;
    border-style: solid;
    background: #edf1f2;
    box-shadow: 0 0 0 4px #f0f3f4;
  }

  &:hover::before {
    background: transparent;
    border-color: #fff;
  }
`

const User = styled.div`
  position: relative;
  margin-bottom: 10px;
`

const Time = styled.div`
  position: relative;
  top: 10px;
  float: left;
  margin-left: -7.5em;
  display: block;
  width: 4.5em;
  text-align: right;
  font-size: 14px;
  line-height: 1.5;
`

const Content = styled.div`
  position: relative;
  background: #fff;
  min-width: 200px;
  max-width: 100%;
  word-wrap: break-word;
  word-break: break-all;
  border: 1px solid #dee5e7;
  padding:  10px 15px;
  display: inline-block;
  box-shadow: 0 1px 1px rgba(0, 0, 0, .05);
`

const Text = styled.div`
  position: relative;
  border-top: 1px solid #dee5e7;
  margin: 0 -15px -10px -15px;
  padding: 15px;

  img {
    width: 100%;
    height: auto;
  }

  audio {
    width: 500px;
  }

  a {
    text-decoration: none;
    color: #15c;
  }

  a:hover {
    text-decoration: underline;
  }

  a:active {
    color: #d14836;
  }

  del {
    color: #c3c3c3;
  }

  hide {
    color: black;
    background: black;
  }

  hide:hover {
    color: white;
  }
`

interface Item {
  time: string
  content: string
}

const formatDate = (date: string) => {
  const day = dayjs(date)
  if (day.isSame(dayjs())) return 'today'
  if (day.isSame(dayjs().subtract(1, 'day'))) return 'yesterday'
  return day.format('YYYY, MMM D')
}

const formatTime = (date: string) => {
  return dayjs(date).format('HH:mm')
}

const Timeline: FC<{ items: Item[] }> = ({ items }) => {
  const dayGroups = _.groupBy(items, item => dayjs(item.time).startOf('day'))
  return (
    <TimelineContainer>
      {Object.entries(dayGroups).map(([date, items]) => {
        return <>
          <Headline>
            <TimelineDate>
              {formatDate(date)}
            </TimelineDate>
          </Headline>
          {items.map((item, index) => {
            return <>
              <Item key={index}>
                <Time>{formatTime(item.time)}</Time>
                <Content>
                  <User>Wang Jie</User>
                  <Text>
                    {item.content}
                  </Text>
                </Content>
              </Item>
            </>
          })}
        </>
      })}
      <Headline>
        <TimelineDate>
          No more before
        </TimelineDate>
      </Headline>
    </TimelineContainer>
  )
}

export default Timeline
