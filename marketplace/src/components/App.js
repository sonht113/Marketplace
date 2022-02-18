import React, { Component } from 'react';
import Web3 from 'web3';
import Marketplace from '../abis/Marketplace.json';
import Navbar from './NavBar';
import Main from './Main';
import axios from 'axios';
import { Routes, Route, Navigate} from 'react-router-dom';

import Home from './Home';
import Profile from './Profile';
import Login from './Login';

class App extends Component {

	async componentWillMount() {
		await this.loadWeb3();
		await this.loadBlockchainData();
	}

	async loadWeb3() {
		if(window.ethereum) {
			window.web3 = new Web3(window.ethereum);
			await window.ethereum.enable();
		}else if(window.web3) {
			window.web3 = new Web3(window.web3.currentProvider);
		}else {
			window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
		}
	}

	async loadBlockchainData() {
		const web3 = window.web3;
		// Load account
		const accounts = await web3.eth.getAccounts();
		this.setState({account: accounts[0]})
		const networkId = await web3.eth.net.getId();
		const networkData = Marketplace.networks[networkId];
		if(networkData) {
			const marketplace = web3.eth.Contract(Marketplace.abi, networkData.address);
			this.setState({marketplace});
			const productCount = await marketplace.methods.productCount().call();
			this.setState({productCount});
			// Load product
			for(var i = 1; i <= productCount; i++) {
				let product = await marketplace.methods.products(i).call();
				const {data} = await axios.get(`http://localhost:8080/product/name?name=${product.name}`)
				product = {...product, linkImage:data.linkImage}
				this.setState({
					products: [...this.state.products, product]
				})
			}
			this.setState({loading: false});
		}else {
			window.alert('Marketplace contract not deployed to detected network.');
		}
	}

	constructor(props) {
		super(props)
		this.state = {
			account: '',
			productCount: 0,
			products: [],
			loading: true,
			isLogin: false
		}
		this.createProduct = this.createProduct.bind(this);
		this.purchaseProduct = this.purchaseProduct.bind(this);
	}

	createProduct(name, price, linkImage) {
		this.setState({loading: true});
		console.log(name, price, linkImage);
		this.state.marketplace.methods.createProduct(name, price).send({from: this.state.account})
			.once('receipt', (receipt) => {
			})
		axios.post('http://localhost:8080/product', {name, price, linkImage, addressOwner: this.state.account})
			.then(response => console.log(response));
		this.setState({loading: false})
	}

	purchaseProduct(id, price) {
		this.setState({loading: true});
		this.state.marketplace.methods.purchaseProduct(id).send({from: this.state.account, value: price})
			.once('receipt', (receipt) => {
				this.setState({loading: false})
			})
	}

	render() {
		return (
			<div>
				<Navbar account={this.state.account} />
				<div className="row">
					<main role="main" className="col-lg-12 d-flex">
						{
							this.state.loading 
								? <div id="loader" className="text-center"><p className="text-center">Loading...</p></div>  
								: <Routes> 
									<Route path="/" render={() => {
										return this.state ? <Home /> : <Navigate replace to="/login" />
									}} />
									<Route path="/profile" element={ <Profile /> } />
									<Route path="/manage" element={<Main 
										products={this.state.products} 
										createProduct={this.createProduct}
										purchaseProduct={this.purchaseProduct} />} />
									<Route path="/login" element={ <Login /> } />
								</Routes>
						}
					</main>
				</div>
			</div>
		);
	}
}

export default App;
