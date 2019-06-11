import axios from 'axios';

import Product from './Product';
import PleaseLogin from './PleaseLogin'

import React, {
    Component,
} from 'react';

class Products extends Component {

    constructor () {
        super();
        this.state = {
            products: [],
            userData: null
        };
    }

    async componentDidMount() {

        let isAdmin = this.props.match.params.isAdmin;
        console.log(isAdmin);
        if(isAdmin == "True"){
            const promise = await axios.get('http://localhost:9000/products');
            const response = promise.data;
            if(response != "Unauthorized"){
                this.setState({
                    products: response
                });
            }
        } else {
            console.log(isAdmin);
            if(isAdmin == undefined){
                const promise = await axios.get('http://localhost:9000');
                const response = promise.data;
                if(response != "Unauthorized"){
                    this.setState({
                        userData: response,
                    });
                    const promise2 = await axios.get('http://localhost:9000/products');
                    const response2 = promise2.data;
                    if(response2 != "Unauthorized"){
                        this.setState({ products: response2 });
                    }
                }
            } else {
                console.log(isAdmin);
                const promise = await axios.get('http://localhost:9000');
                const response = promise.data;
                if(response != "Unauthorized"){
                    this.setState({
                        userData: response,
                    });
                    const promise2 = await axios.get('http://localhost:9000/products/byCategory/' + isAdmin);
                    const response2 = promise2.data;
                    if(response2 != "Unauthorized"){
                        this.setState({ products: response2 });
                    }
                }
            }

        }

    }

    render(){
        if(this.state.products.length > 0){
            return (
                <div className="container">
                    <h1>Products list:</h1>
                    <div className="row">
                        <div className="col-12">
                            {this.state.products != null && this.state.products.map(product =>
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
        } else {
            return <PleaseLogin/>;
        }

    }

}

export default Products;