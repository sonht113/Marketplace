import React, { Component } from "react";
import './App.css';

class Main extends Component {
	render() {
		return (
			<div id="content">
				<h1> Add Product</h1>
				<form onSubmit={(event) => {
					event.preventDefault()
					const name = this.productName.value
					const linkImage = this.linkImage.value
					const price = window.web3.utils.toWei(this.productPrice.value.toString(), 'Ether')
					this.props.createProduct(name, price, linkImage)
				}}>
					<div className="form-group mr-sm-2">
						<input
							id="productName"
							type="text"
							ref={(input) => { this.productName = input }}
							className="form-control"
							placeholder="Product Name"
							required />
					</div>
					<div className="form-group mr-sm-2">
						<input
							id="productPrice"
							type="text"
							ref={(input) => { this.productPrice = input }}
							className="form-control"
							placeholder="Product Price"
							required />
					</div>
					<div className="form-group mr-sm-2">
						<input
							id="linkImage"
							type="text"
							ref={(input) => { this.linkImage = input }}
							className="form-control"
							placeholder="Link Image"
							required />
					</div>
					<button type="submit" className="btn btn-primary">Add Product</button>
				</form>
				<p>&nbsp;</p>
				<h2>Buy Product</h2>
				<table className="table">
					<thead>
						<tr>
							<th scope="col">#</th>
							<th scope="col">Name</th>
							<th scope="col">LinkImage</th>
							<th scope="col">Price</th>
							<th scope="col">Owner</th>
							<th scope="col">State</th>
						</tr>
					</thead>
					<tbody id="productList">
						{ this.props.products.map((product, key) => {
							return(
								<tr key={key}>
									<th scope="row">{product.id.toString()}</th>
									<td>{product.name}</td>
									<td>{product.linkImage}</td>
									<td>{window.web3.utils.fromWei(product.price.toString(), 'Ether')} Ether</td>
									<td>{product.owner}</td>
									<td>
										{
											!product.purchased 
												? <p className="text-success">Not purchase</p>
												: <p className="text-danger"> Purchased </p>
										}
								</td>
								</tr>
							)
						}) }
			</tbody>
			</table>
			</div>
		)
		}
		}

			export default Main;
