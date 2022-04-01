import React from 'react';

const exports = {};

exports.Wrapper = class extends React.Component {
  render() {
    const {content} = this.props;
    return (    
      <div className="App">
        <header className="App-header" id="root">
          <h1>NFT Auctionings</h1>
          {content}
        </header>
      </div>
    );
  }
}

exports.ConnectAccount = class extends React.Component {
  render() {
    return (
      <div className="text-box">
        <p> Oppsss waiting to connect to your algorand account.<br/><br/>
          This shouldn't take long though......</p>
      </div>
    )
  }
}

exports.FundAccount = class extends React.Component {
  render() {
    const {bal, standardUnit, defaultFundAmt, parent} = this.props;
    const amt = (this.state || {}).amt || defaultFundAmt;
    return (
      <div>
        <h2>Fund account</h2>
        <br />
        Balance: {bal} {standardUnit}
        <hr />
        Would you like to fund your account with additional {standardUnit}?
        <br />
        (This only works on certain devnets)
        <br />
        <input
          type='number'
          placeholder={defaultFundAmt}
          onChange={(e) => this.setState({amt: e.currentTarget.value})}
        />
        <button onClick={() => parent.fundAccount(amt)}>Fund Account</button>
        <button onClick={() => parent.skipFundAccount()}>Skip</button>
      </div>
    );
  }
}

exports.SellerOrBidder = class extends React.Component {
  render() {
    const {parent} = this.props;
    return (
      <div className="text-box">
        Please select a role:
        <br />
        <p>
             Wanna Auction your NFT.<br /> <br/>
          <button
            onClick={() => parent.selectSeller()}
          >Seller</button>
        </p>
        <p>
           Wanna bid in the live auction. <br/> <br/>
          <button
            onClick={() => parent.selectBidder()}
          >Bidder</button>
          
        </p>
      </div>
    );
  }
}

export default exports;