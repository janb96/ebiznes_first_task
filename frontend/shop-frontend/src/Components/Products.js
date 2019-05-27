import axios from 'axios';

import Product from './Product';

import React, {
    Component,
} from 'react';

class Products extends Component {

    constructor () {
        super();
        this.state = {
            products: [],
        };
    }

    async componentDidMount() {
        const promise = await axios.get('http://localhost:9000/products');
        const response = promise.data;
        this.setState({
            products: response
        });
    }

    render(){

        return (
            <div className="container">
                <h1>Products list:</h1>
                <div className="row">
                    <div className="col-12">
                        {this.state.products.map(product =>
                            <Product
                                productID={product.productID}
                                name={product.name}
                                description={product.description}
                                photo={product.photo}
                                priceNet={product.priceNet}
                                priceGross={product.priceGross}
                                taxAmountVat={product.taxAmountVat}
                                categoryID={product.categoryID}
                                isAdmin={this.props.match.params.isAdmin + ""}
                            />
                        )}
                    </div>
                </div>
            </div>
        );
    }

}

export default Products;