import axios from 'axios';

import React, {
    Component,
} from 'react';

class MakeOrder extends Component {

    constructor () {
        super();

        this.state = {
            productID: -1,
            userID: 1,
            orderAddress: '',
            orderCity: '',
            orderCountry: '',
            deliveryDate: '',
            productQuantity: 0,
            orderDetailTotalNetPrice: 0.0,
            orderDetailTotalGrossPrice: 0.0
        };

        this.handleClick = this.handleClick.bind(this);

        this.handleChangeOrderAddress = this.handleChangeOrderAddress.bind(this);
        this.handleChangeOrderCountry = this.handleChangeOrderCountry.bind(this);
        this.handleChangeOrderCity = this.handleChangeOrderCity.bind(this);
    }

    async componentDidMount() {
        this.setState({
            productID: parseInt(this.props.match.params.id, 10),
            productQuantity: parseInt(this.props.match.params.productQuantity, 10),
            orderDetailTotalNetPrice: parseInt(this.props.match.params.orderDetailTotalNetPrice, 10),
            orderDetailTotalGrossPrice: parseInt(this.props.match.params.orderDetailTotalGrossPrice, 10)
        });
    }

    handleChangeOrderAddress(event) {
        this.setState({orderAddress: event.target.value});
    }

    handleChangeOrderCountry(event) {
        this.setState({orderCountry: event.target.value});
    }

    handleChangeOrderCity(event) {
        this.setState({orderCity: event.target.value});
    }

    handleClick () {

        if(this.state.orderCity !== ''
            && this.state.orderAddress !== ''
            && this.state.orderCountry !== ''){
            
            axios.post('http://localhost:9000/addorder', {
                productID: this.state.productID,
                userID: this.state.userID,
                orderAddress: this.state.orderAddress,
                orderCity: this.state.orderCity,
                orderCountry: this.state.orderCountry,
                productQuantity: this.state.productQuantity,
                orderDetailTotalNetPrice: this.state.orderDetailTotalNetPrice,
                orderDetailTotalGrossPrice: this.state.orderDetailTotalGrossPrice
            })
                .then((response) => {
                    console.log(response.data);
                    // this.setState({loginResponse: response.data})
                })
                .catch((error)=>{
                    console.log(error);
                });
        }
    }

    render(){
        return (

            <div className="container">
                <center><h1>Your order: </h1></center>

                <label htmlFor="orderAddress">Order Address:</label>
                <input type="text" className="form-control" id="orderAddress" value={this.state.orderAddress}
                       onChange={this.handleChangeOrderAddress} />

                <label htmlFor="orderCity">Order City:</label>
                <input type="text" className="form-control" id="orderCity" value={this.state.orderCity}
                       onChange={this.handleChangeOrderCity} />

                <label htmlFor="surname">Order Country:</label>
                <input type="text" className="form-control" id="orderCountry" value={this.state.orderCountry}
                       onChange={this.handleChangeOrderCountry} />

                <br/>

                <button className='btn btn-success btn-block' onClick={this.handleClick}>Make order</button>
            </div>
        );
    }

}

export default MakeOrder;