import React from "react";

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="Home container mt-5">
        <h1 className="text-center text-dark">Marketplace</h1>
        <div className="row">
          {this.props.products.map((product, key) => {
            return (
              <div className="col-xs-12 col-sm-12 col-md-4 col-ld-3" key={key}>
                <div className="card mb-3" style={{ border: "1px gray solid" }}>
                  <h3 className="card-header">{product.name}</h3>
                  <img src={product.linkImage} />
                  <div className="card-body">
                    <h4 className="text-center">
                      {window.web3.utils.fromWei(
                        product.price.toString(),
                        "Ether"
                      )}{" "}
                      Ether
                    </h4>
                    <p className="card-text">{product.owner}</p>
                  </div>
                  <div className="d-flex justify-content-center">
                    <div></div>
                    {!product.purchase ? (
                      <button
                        className="btn btn-success buyButton text-center"
                        name={product.id}
                        value={product.price}
                        onClick={(event) => {
                          event.preventDefault();
                          this.props.purchaseProduct(
                            event.target.name,
                            event.target.value
                          );
                        }}
                      >
                        Buy
                      </button>
                    ) : (
                      <p className="text-muted text-center">Purchased</p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Home;
