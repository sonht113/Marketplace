import React, {Component} from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
	render() {
		return (
			<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
				<div className="container-fluid">
					<a className="navbar-brand text-light">Marketplace</a>
					<div className="collapse navbar-collapse" id="navbarColor01">
						<ul className="navbar-nav me-auto">
							<li className="nav-item">
								<Link className="nav-link active" to="/">Home
									<span className="visually-hidden">(current)</span>
								</Link>
							</li>
							<li className="nav-item">
								<Link to="/profile" className="nav-link">Profile</Link>
							</li>
							<li className="nav-item">
								<Link to="/manage" className="nav-link">Manage</Link>
							</li>
							<li className="nav-item">
								<Link to="/login" className="nav-link">Login</Link>
							</li>
						</ul>
					</div>
					<p className="text-light"> {this.props.account} </p>
				</div>
			</nav>
		)
	}
}

export default Navbar;
