import React from 'react';
import CommonViews from './CommonViews';

const exports = {...CommonViews};

const sleep = (milliseconds) => new Promise(resolve => setTimeout(resolve, milliseconds));

exports.Wrapper = class extends React.Component {
  render() {
    const {content} = this.props;
    return (
      <div className="Creators">
        <h2>Creator of the NFT</h2>
        {content}
      </div>
    );
  }
}

exports.SetParameters = class extends React.Component {
  constructor(props) {
    super(props);
    this.state={//set nft parameters
      parameters:{
        nftid:props.nftid,
        reservePrice:props.reservePrice,
        limittime:props.limittime
      }  
    }
    
  }
  handlenftidchanged(e){
    var {parameters} = this.state.parameters;
    parameters.nftid = e.target.value;

    this.setState({parameters:parameters});
  }
  handlelimittimechange(e){
    var {parameters} = this.state.parameters;
    parameters.limittime = e.target.value;

    this.setState({parameters:parameters});
  }
  handlereservedPrice(e){
    var {parameters} = this.state.parameters;
    parameters.reservePrice = e.target.value;

    this.setState({parameters:parameters});
  }
  handlebutton(){
    console.log(this.state.parameters)
  }

  // handle submit button
  handleSubmit(e) {
    e.preventDefault();


    /// send to the smart contract

    console.log(this.state.parameters)


    this.setState({
      ...this.state,
      parameters: {
        nftid: "",
        reservePrice: "",
        limittime: ""
      }
    })
  }

  // end of handle submit 
  render() {
    const {parent, defaultReserveAmt, defaultTokenID, defaulttime} = this.props;

    return (
      <div>
      <form onSubmit={this.handleSubmit}>
        <label>Enter The NFT ID </label>
            <input
             type='number'
              placeholder={defaultTokenID}
              value={this.state.parameters.nftid}
              onChange={(e) => this.setState({
                ...this.state,
                parameters: {
                  ...this.state.parameters,
                  nftid: e.target.value
                }
              })}
            /> 
          <br/>
          <label>Enter Lowest ALGO Amount
            <input
            type='number'
              placeholder={defaultReserveAmt}
              value={this.state.parameters.reservePrice}
              onChange={(e) => this.setState({
                ...this.state,
                parameters: {
                  ...this.state.parameters,
                  reservePrice: e.target.value
                }
              })}
            /> 
          </label><br/>
          <label>Enter the auction limit time:(minutes)
            <input
            type='number'
              placeholder={defaulttime}
              value={this.state.parameters.limittime}
              onChange={(e) => this.setState({
                ...this.state,
                parameters: {
                  ...this.state.parameters,
                  limittime: e.target.value
                }
              })}
              
            /> 
          </label>
        </form>    
        <br />
        <button
          onClick={(e) => this.handleSubmit(e) }
        >Submit</button>
      </div>
    );
  }
}

exports.Deploy = class extends React.Component {
  render() {
    const{nftid,limittime, reservePrice } = this.state.parameters;
    const {parent, standardUnit} = this.props;
    return (
      <div>
        Confirm the parameters: <strong>{nftid}</strong>{limittime} {reservePrice}
        <br />
        <button
          onClick={() => parent.deploy()}
        >Deploy</button>
      </div>
    );
  }
}

exports.Deploying = class extends React.Component {
  render() {
    return (
      <div>Deploying... please wait.</div>
    );
  }
}

// exports.WaitingForAttacher = class extends React.Component {
//   async copyToClipboard(button) {
//     const {ctcInfoStr} = this.props;
//     navigator.clipboard.writeText(ctcInfoStr);
//     const origInnerHTML = button.innerHTML;
//     button.innerHTML = 'Copied!';
//     button.disabled = true;
//     await sleep(1000);
//     button.innerHTML = origInnerHTML;
//     button.disabled = false;
//   }

//   render() {
//     const {ctcInfoStr} = this.props;
//     return (
//       <div>
//         Waiting for Attacher to join...
//         <br /> Please give them this contract info:
//         <pre className='ContractInfo'>
//           {ctcInfoStr}
//         </pre>
//         <button
//           onClick={(e) => this.copyToClipboard(e.currentTarget)}
//         >Copy to clipboard</button>
//       </div>
//     )
//   }
// }

export default exports;