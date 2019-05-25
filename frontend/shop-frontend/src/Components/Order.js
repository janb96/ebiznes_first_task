import React, {
    Component
} from 'react';

import axios from "axios";

class Order extends Component {

    constructor () {
        super();
        this.state = {
            orderDetail: [],
            orderStatus: []
        };
    }

    async componentDidMount() {
        const promiseOrderDetails = await axios.get('http://localhost:9000/orderDetail/byOrderID/' + this.props.orderID);
        const responseOrderDetails = promiseOrderDetails.data;
        const promiseOrderStatus = await axios.get('http://localhost:9000/orderStatus/byOrderID/' + this.props.orderID);
        const responseOrderStatus = promiseOrderStatus.data;
        this.setState({
            orderDetail: responseOrderDetails,
            orderStatus: responseOrderStatus
        });
    }

    render(){
        return(
            <div className="user">
                <div className="alert alert-success">
                    <h2><strong>Order ID</strong>: {this.props.orderID} </h2>
                    {this.state.orderStatus.map(order =>
                        <div>
                            <p><strong>Order date</strong>: {order.orderDate}</p>
                            {/*<p><strong>Order delivery date</strong>: {order.deliveryDate}</p>*/}
                            {/*<p><strong>Order isDelivered</strong>: {order.delivered}</p>*/}
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

export default Order;