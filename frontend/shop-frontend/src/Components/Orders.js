import axios from 'axios';

import Order from './Order';
import PleaseLogin from './PleaseLogin';

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
        if(response != "Unauthorized"){
            this.setState({ orderDetail: response });
        }
    }

    render(){
        if(this.state.orderDetail.length > 0){
            return (
                <div className="container">
                    <h1>Orders list:</h1>
                    <div className="row">
                        <div className="col-12">
                            {this.state.orderDetail.map(order =>
                                <Order
                                    orderID={order.orderID}
                                    userID={order.userID}
                                    orderAddress={order.orderAddress}
                                    orderCity={order.orderCity}
                                    orderCountry={order.orderCountry}
                                    isAdmin={this.props.match.params.isAdmin + ""}
                                />
                            )}
                        </div>
                    </div>
                </div>
            );
        } else {
            return(
                <PleaseLogin/>
            );
        }
    }

}

export default Orders;