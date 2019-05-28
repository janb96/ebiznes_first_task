import React, {
    Component
} from 'react';

import axios from "axios";

class Order extends Component {

    constructor () {
        super();

        this.state = {
            orderAddress: '',
            orderCity: '',
            orderCountry: '',
            deliveryDate: '',
            delivered: 0,
            orderDetail: [],
            orderStatus: [],
            edit: "False"
        };

        this.handleClick = this.handleClick.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleEditButton = this.handleEditButton.bind(this);

        this.handleChangeOrderAddress = this.handleChangeOrderAddress.bind(this);
        this.handleChangeOrderCity = this.handleChangeOrderCity.bind(this);
        this.handleChangeOrderCountry = this.handleChangeOrderCountry.bind(this);
        this.handleChangeOrderDeliveryDate = this.handleChangeOrderDeliveryDate.bind(this);
        this.handleChangeOrderDelivered = this.handleChangeOrderDelivered.bind(this);
    }

    async componentDidMount() {
        const promiseOrderDetails = await axios.get('http://localhost:9000/orderDetail/byOrderID/' + this.props.orderID);
        const responseOrderDetails = promiseOrderDetails.data;
        const promiseOrderStatus = await axios.get('http://localhost:9000/orderStatus/byOrderID/' + this.props.orderID);
        const responseOrderStatus = promiseOrderStatus.data;
        this.setState({
            orderDetail: responseOrderDetails,
            orderStatus: responseOrderStatus,
            orderAddress: this.props.orderAddress,
            orderCity: this.props.orderCity,
            orderCountry: this.props.orderCountry,
            deliveryDate: responseOrderStatus[0].deliveryDate,
            delivered: responseOrderStatus[0].delivered
        });

        // this.state.orderStatus.map( order => {ć
        //         this.setState
        //     }
        // );
    }

    handleChangeOrderAddress(event) {
        this.setState({orderAddress: event.target.value});
    }

    handleChangeOrderCity(event) {
        this.setState({orderCity: event.target.value});
    }

    handleChangeOrderCountry(event) {
        this.setState({orderCountry: event.target.value});
    }

    handleChangeOrderDeliveryDate(event) {
        this.setState({deliveryDate: event.target.value});
    }

    handleChangeOrderDelivered(event) {
        this.setState({delivered: parseInt(event.target.value, 10)});
    }

    handleEdit () {

        if(this.state.orderAddress !== ''
            && this.state.orderCity !== ''){

            let url = "http://localhost:9000/orders/" + this.props.orderID;

            axios.put(url , {
                orderAddress: this.state.orderAddress,
                orderCity: this.state.orderCity,
                orderCountry: this.state.orderCountry,
                deliveryDate: this.state.deliveryDate,
                delivered: this.state.delivered
            }).then((response) => {
                console.log(response.data);
                window.location.reload();
                // this.setState({loginResponse: response.data})
            }).catch((error)=>{
                console.log(error);
            });
        }
    }

    handleEditButton () {

        console.log(this.state.edit + " Zmiana ");

        if(this.state.edit == "True"){
            this.setState({
                edit: "False"
            });
        } else {
            this.setState({
                edit: "True"
            });
        }
    }

    handleClick () {

        if(this.state.name !== ''
            && this.state.description !== ''){

            axios.delete('http://localhost:9000/orders/delete/' + this.props.orderID).then((response) => {
                console.log(response.data);
                window.location.reload();
                // this.setState({loginResponse: response.data})
            })
                .catch((error)=>{
                    console.log(error);
                });
        }
    }

    render(){
        if(this.props.isAdmin == "True"){
            if(this.state.edit == "False"){
                return(
                    <div className="user">
                        <div className="alert alert-success">
                            <button className='btn btn-warning' onClick={this.handleEditButton}>Edit order</button>
                            <h2><strong>Order ID</strong>: {this.props.orderID} </h2>
                            {this.state.orderStatus.map(order =>
                                <div>
                                    <p><strong>Order date</strong>: {order.orderDate}</p>
                                    <p><strong>Order delivery date</strong>: {order.deliveryDate}</p>
                                    <p><strong>Order isDelivered</strong>: {order.delivered}</p>
                                </div>
                            )}
                            <div className="row">

                                <div className="col-6">
                                    <p><strong>User ID</strong>: {this.props.userID}</p>
                                    <p><strong>Order address</strong>: {this.props.orderAddress}</p>
                                    <p><strong>Order city</strong>: {this.props.orderCity}</p>
                                    <p><strong>Order country</strong>: {this.props.orderCountry}</p>
                                </div>

                                <div className="col-6">
                                    {this.state.orderDetail.map(order =>
                                        <div>
                                            <p><strong>Order price(net)</strong>: {order.orderDetailTotalNetPrice}</p>
                                            <p><strong>Order price(Gross)</strong>: {order.orderDetailTotalGrossPrice}</p>
                                            <p><strong>Product ID</strong>: {order.productID}</p>
                                            <p><strong>Product quantity</strong>: {order.productQuantity}</p>
                                        </div>
                                    )}
                                </div>

                                <button className='btn btn-danger btn-block'
                                        onClick={this.handleClick}>Delete this order</button>

                            </div>
                        </div>
                        <br/>
                    </div>
                );
            } else {
                return(
                    <div className="container">
                        <center><h1>Edit order: </h1></center>
                        <button className='btn btn-danger' onClick={this.handleEditButton}>Stop edition</button>
                        <br/>
                        <label htmlFor="orderAddress">Address:</label>
                        <input type="text" className="form-control" id="orderAddress" value={this.state.orderAddress}
                               onChange={this.handleChangeOrderAddress} />

                        <label htmlFor="orderCity">City:</label>
                        <input type="text" className="form-control" id="orderCity" value={this.state.orderCity}
                               onChange={this.handleChangeOrderCity} />

                        <label htmlFor="orderCountry">Country:</label>
                        <input type="text" className="form-control" id="orderCountry" value={this.state.orderCountry}
                               onChange={this.handleChangeOrderCountry} />

                        <label htmlFor="deliveryDate">Delivery date:</label>
                        <input type="date" className="form-control" id="deliveryDate" value={this.state.deliveryDate}
                               onChange={this.handleChangeOrderDeliveryDate} />

                        <label htmlFor="delivered">Is delivered?</label>
                        <select className="form-control" id="delivered" onChange={this.handleChangeOrderDelivered}>
                            <option value="0">No</option>
                            <option value="1">Yes</option>
                        </select>

                        <br/>
                        <button className='btn btn-warning btn-block' onClick={this.handleEdit}>Edit order</button>
                        <br/>
                    </div>
                );
            }

        } else {
            return(
                <div className="user">
                    <div className="alert alert-success">
                        <h2><strong>Order ID</strong>: {this.props.orderID} </h2>
                        {this.state.orderStatus.map(order =>
                            <div>
                                <p><strong>Order date</strong>: {order.orderDate}</p>
                                <p><strong>Order delivery date</strong>: {order.deliveryDate}</p>
                                <p><strong>Order isDelivered</strong>: {order.delivered}</p>
                            </div>
                        )}
                        <div className="row">
                            <div className="col-6">
                                <p><strong>User ID</strong>: {this.props.userID}</p>
                                <p><strong>Order address</strong>: {this.props.orderAddress}</p>
                                <p><strong>Order city</strong>: {this.props.orderCity}</p>
                                <p><strong>Order country</strong>: {this.props.orderCountry}</p>
                            </div>
                            <div className="col-6">
                                {this.state.orderDetail.map(order =>
                                    <div>
                                        <p><strong>Order price(net)</strong>: {order.orderDetailTotalNetPrice}</p>
                                        <p><strong>Order price(Gross)</strong>: {order.orderDetailTotalGrossPrice}</p>
                                        <p><strong>Product ID</strong>: {order.productID}</p>
                                        <p><strong>Product quantity</strong>: {order.productQuantity}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <br/>
                </div>
            );
        }
    }

}

export default Order;