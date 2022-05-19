import React, { Component } from 'react';
import Web3 from 'web3';
import Color from '../abis/Color.json'
import ColorBox from './color';
import './App.css';

class App extends Component {
  async componentWillMount() {
    this.loadWeb3()
    this.loadBlockChain()
  }
  async loadWeb3(){
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. you should cosider trying')
    }
  }
  async loadBlockChain () {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts()
    this.setState({account: accounts[0] });

    const networkId = await web3.eth.net.getId()
    const networkData = Color.networks[networkId]
    if(networkData){

      const abi = Color.abi
      const address = networkData.address
      const contract = new web3.eth.Contract(abi, address)
      this.setState({contract})
      console.log(this.state.contract)
      
      let total = await contract.methods.allColors.call()
      this.setState({totalSupply: total.toNumber()})
      for(var i = 0; i < this.state.totalSupply; i++){
        let color = await contract.methods.colors(i).call()
        this.setState({
          colors: [...this.state.colors, color]
        })
      }  
      console.log(this.state.colors)
    }else {
      window.alert('Smart contract not deployed to detected network.')
    }



  }
  mint = (color) => {
    this.state.contract.methods.mint(color).send({from: this.state.account})
    .then( (receipt) => {
      console.log(receipt)
      this.setState({
        colors: [...this.state.colors, color]
      })
    })
  }
  constructor(props) {
    super(props)
    this.state = {
      account: '',
      contract: null,
      totalSupply: null,
      colors: []
    }
  }
  render() {
    return (
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            href="http://www.dappuniversity.com/bootcamp"
            target="_blank"
            rel="noopener noreferrer"
          >
            Dapp University
          </a>
        </nav>
        <div className="container-fluid mt-5">
          <form onSubmit={(event) => {
            event.preventDefault();
            const color = this.color.value
            this.mint(color)
          }}>
            <input type="text" placeholder="#fff323" ref={(input) => this.color = input} />
            <button type="submit">mint</button>
          </form>

          <div className="colors">
            {this.state.colors.map(color => (
              <ColorBox name={color} ></ColorBox>

            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
