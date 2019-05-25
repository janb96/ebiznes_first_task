import React, {
    Component
} from 'react';

class User extends Component {

    render(){
        return(
            <div className="user">
                <div className="alert alert-success">
                    <h2><strong>User ID</strong>: {this.props.userID} </h2>
                    <p><strong>User email</strong>: {this.props.email}</p>
                    <p><strong>User name</strong>: {this.props.firstName}</p>
                    <p><strong>User surname</strong>: {this.props.surname}</p>
                </div>
                <br/>
            </div>
        );
    }

}

export default User;