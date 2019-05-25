import React, {
    Component
} from 'react';

import {
    Link
} from 'react-router-dom';

class Product extends Component {

    constructor () {
        super();

        this.state = {
            productQuantity: 1,
        };

    }

    render(){
        let photo = require("../" + "photo/not-found.jpg");
        try{
            photo = require("../" + this.props.photo);
        } catch (e){
            console.log(e);
        }

        return(
            <div className="product">
                <h2><kbd>Product name</kbd>:{this.props.name}</h2>
                <img src={photo} className="img-fluid" alt={this.props.name}/>
                <div className="row">
                    <div className="col-6">
                        <p><kbd>Net price</kbd>: {this.props.priceNet}</p>
                        <p><kbd>Gross price</kbd>: {this.props.priceGross}</p>
                        <p><kbd>Vat</kbd>: {this.props.taxAmountVat}%</p>
                    </div>
                    <div className="col-6">
                        <div className="alert alert-info">
                            <strong>Description:</strong>
                            <p>{this.props.description}</p>
                        </div>
                    </div>
                </div>
                <Link to={"/addorder/"
                    + this.props.productID
                    + "/" + this.state.productQuantity
                    + "/" + this.props.priceNet*this.state.productQuantity
                    + "/" + this.props.priceGross*this.state.productQuantity
                }>
                    <h2 class="btn btn-warning btn-block">Buy it!</h2>
                </Link>
                <br/>
            </div>
            );
    }

}

export default Product;