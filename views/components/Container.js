import React from 'react'
import Nftcard from './nftcard'
import Carousel from 'react-multi-carousel'

const Container = () => {
  return (
    <>
    <h2 className="Header">Recent Drops</h2>
    <div className="container">
        <Nftcard/>
        <Nftcard/>
        <Nftcard/>
        <Nftcard/>
    </div>
    </>
  )
}

export default Container
