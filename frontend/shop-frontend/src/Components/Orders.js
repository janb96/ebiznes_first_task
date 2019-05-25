import axios from 'axios';

import Order from './Order';

import React, {
    Component,
} from 'react';

class Orders extends Component {

    constructor () {
        super();
        this.state = {
            orderDetail: []
        };
    }

    async componentDidMount() {
        const promise = await axios.get('http://localhost:9000/orders');
        const response = promise.data;
        this.setState({ orderDetail: response });
    }

    render(){
        return (
            <div className="container">
                <h1>Users list:</h1>
                <div className="row">
                    <div className="col-12">
                        {this.state.orderDetail.map(order =>
                            <Order
                                orderID={order.orderID}
                                userID={order.userID}
                                orderAddress={order.orderAddress}
                                orderCity={order.orderCity}
                                orderCountry={order.orderCountry}
                            />
                        )}
                    </div>
                </div>
            </div>
        );
    }

}

export default Orders;