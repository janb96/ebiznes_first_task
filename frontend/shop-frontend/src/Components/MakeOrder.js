import axios from 'axios';

import React, {
    Component,
} from 'react';

function Status(props){
    if(props.loginResponse != ""){
        return(
            <div className="alert alert-success alert-dismissible">
                <button type="button" className="close" data-dismiss="alert">&times;</button>
                <strong>Success!</strong> Order created.
            </div>
        );
    } else {
        return(
            <div></div>
        );
    }

}

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
            productQuantity: 1,
            orderDetailTotalNetPrice: 0,
            orderDetailTotalGrossPrice: 0,
            loginResponse: ''
        };

        this.handleClick = this.handleClick.bind(this);

        this.handleChangeOrderAddress = this.handleChangeOrderAddress.bind(this);
        this.handleChangeOrderCountry = this.handleChangeOrderCountry.bind(this);
        this.handleChangeOrderCity = this.handleChangeOrderCity.bind(this);
        this.handleChangeProductQuantity = this.handleChangeProductQuantity.bind(this);
    }

    async componentDidMount() {
        this.setState({
            productID: parseInt(this.props.match.params.id, 10),
            orderDetailTotalNetPrice: parseInt(this.props.match.params.orderDetailTotalNetPrice, 10),
            orderDetailTotalGrossPrice: parseInt(this.props.match.params.orderDetailTotalGrossPrice, 10)
        });
        console.log(this.state.productID + " " + this.state.orderDetailTotalNetPrice + " " + this.state.orderDetailTotalGrossPrice);
    }

    handleChangeOrderAddress(event) {
        console.log(this.state.productID + " " + this.state.orderDetailTotalNetPrice + " " + this.state.orderDetailTotalGrossPrice);
        this.setState({orderAddress: event.target.value});
    }

    handleChangeOrderCountry(event) {
        this.setState({orderCountry: event.target.value});
    }

    handleChangeOrderCity(event) {
        this.setState({orderCity: event.target.value});
    }

    handleChangeProductQuantity(event) {
        this.setState({
            productQuantity: parseInt(event.target.value, 10),
        });
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
                orderDetailTotalNetPrice: this.state.orderDetailTotalNetPrice * this.state.productQuantity,
                orderDetailTotalGrossPrice: this.state.orderDetailTotalGrossPrice * this.state.productQuantity
            })
                .then((response) => {
                    console.log(response.data);
                    this.setState({loginResponse: response.data})
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

                <label htmlFor="orderCountry">Order Country:</label>
                <input type="text" className="form-control" id="orderCountry" value={this.state.orderCountry}
                       onChange={this.handleChangeOrderCountry} />

                <label htmlFor="productQuantity">How many items do you want?:</label>
                <input type="number" className="form-control" id="productQuantity" value={this.state.productQuantity}
                       onChange={this.handleChangeProductQuantity} />

                <br/>

                <Status loginResponse={this.state.loginResponse}/>

                <button className='btn btn-success btn-block' onClick={this.handleClick}>Make order</button>
            </div>
        );
    }

}

export default MakeOrder;