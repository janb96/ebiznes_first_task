import React, {
    Component
} from 'react';
import axios from "axios";

class User extends Component {

    constructor () {
        super();

        this.state = {
            productQuantity: 1,
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick () {

        if(this.state.name !== ''
            && this.state.description !== ''){

            axios.delete('http://localhost:9000/users/delete/' + this.props.userID).then((response) => {
                console.log(response.data);
                window.location.reload();
                // this.setState({loginResponse: response.data})
            }).catch((error)=>{
                    console.log(error);
                });
        }
    }

    render() {
        if(this.props.isAdmin == "True"){
            return (
                <div className="user">
                    <div className="alert alert-success">
                        <h2><strong>User ID</strong>: {this.props.userID}</h2>
                        <p><strong>User email</strong>: {this.props.email}</p>
                        <p><strong>User name</strong>: {this.props.firstName}</p>
                        <p><strong>User surname</strong>: {this.props.surname}</p>
                        <br/>
                        <button className='btn btn-danger btn-block'
                                onClick={this.handleClick}>Delete this user</button>
                    </div>
                    <br/>
                </div>
            );
        }
        else {
            return (
                <div className="user">
                    <div className="alert alert-success">
                        <h2><strong>User ID</strong>: {this.props.userID}</h2>
                        <p><strong>User email</strong>: {this.props.email}</p>
                        <p><strong>User name</strong>: {this.props.firstName}</p>
                        <p><strong>User surname</strong>: {this.props.surname}</p>
                    </div>
                    <br/>
                </div>
            );
        }
    }

}

export default User;