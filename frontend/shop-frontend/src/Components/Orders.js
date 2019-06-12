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
            orderDetail: [],
            userData: null
        };
    }

    async componentDidMount() {
        let isAdmin = this.props.match.params.isAdmin;
        if(isAdmin === "True"){
            const promise = await axios.get('http://localhost:9000/orders');
            const response = promise.data;
            if(response !== "Unauthorized"){
                this.setState({ orderDetail: response });
            }
        } else {
            const promise = await axios.get('http://localhost:9000');
            const response = promise.data;
            if(response !== "Unauthorized"){
                this.setState({
                    userData: response,
                });
                const promise2 = await axios.get('http://localhost:9000/orders/byUserID/'+ this.state.userData[0].userID);
                const response2 = promise2.data;
                if(response2 !== "Unauthorized"){
                    this.setState({ orderDetail: response2 });
                }
            }
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