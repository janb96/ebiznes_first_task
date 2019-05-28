import React, {
    Component
} from 'react';
import axios from "axios";

class User extends Component {

    constructor () {
        super();

        this.state = {
            email: '',
            firstName: '',
            surname: '',
            password: '',
            edit: 'False'
        };

        this.handleClick = this.handleClick.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleEditButton = this.handleEditButton.bind(this);

        this.handleChangeUserEmail = this.handleChangeUserEmail.bind(this);
        this.handleChangeUserName = this.handleChangeUserName.bind(this);
        this.handleChangeUserSurname = this.handleChangeUserSurname.bind(this);
        this.handleChangeUserPassword = this.handleChangeUserPassword.bind(this);

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

    handleEdit () {

        if(this.state.name !== ''
            && this.state.description !== ''){

            let url = "http://localhost:9000/users/" + this.props.userID;

            axios.put(url , {
                email: this.state.email,
                firstName: this.state.firstName,
                surname: this.state.surname,
                password: this.state.password,
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

    async componentDidMount() {

        this.setState({
            email: this.props.email,
            firstName: this.props.firstName,
            surname: this.props.surname,
            password: this.props.password,
        });

    }

    handleChangeUserEmail(event) {
        this.setState({email: event.target.value});
    }

    handleChangeUserName(event) {
        this.setState({firstName: event.target.value});
    }

    handleChangeUserSurname(event) {
        this.setState({surname: event.target.value});
    }

    handleChangeUserPassword(event) {
        this.setState({password: event.target.value});
    }

    render() {
        if(this.props.isAdmin == "True"){
            if(this.state.edit == "True"){
                return(
                    <div className="container">
                        <center><h1>Edit product: </h1></center>
                        <button className='btn btn-danger' onClick={this.handleEditButton}>Stop edition</button>
                        <br/>
                        <label htmlFor="email">E-mail:</label>
                        <input type="text" className="form-control" id="email" value={this.state.email}
                               onChange={this.handleChangeUserEmail} />

                        <label htmlFor="firstName">Name:</label>
                        <input type="text" className="form-control" id="firstName" value={this.state.firstName}
                               onChange={this.handleChangeUserName} />

                        <label htmlFor="surname">Surname:</label>
                        <input type="text" className="form-control" id="surname" value={this.state.surname}
                               onChange={this.handleChangeUserSurname} />

                        <label htmlFor="password">Password:</label>
                        <input type="password" className="form-control" id="password" value={this.state.password}
                               onChange={this.handleChangeUserPassword} />

                        <br/>
                        <button className='btn btn-warning btn-block' onClick={this.handleEdit}>Edit user</button>
                        <br/>
                    </div>
                );
            } else {
                return (
                    <div className="user">
                        <div className="alert alert-success">
                            <button className='btn btn-warning' onClick={this.handleEditButton}>Edit user</button>
                            <h2><strong>User ID</strong>: {this.props.userID}</h2>
                            <p><strong>User email</strong>: {this.props.email}</p>
                            <p><strong>User name</strong>: {this.props.firstName}</p>
                            <p><strong>User surname</strong>: {this.props.surname}</p>
                            <p><strong>Password</strong>: {this.props.password}</p>
                            <br/>
                            <button className='btn btn-danger btn-block'
                                    onClick={this.handleClick}>Delete this user</button>
                        </div>
                        <br/>
                    </div>
                );
            }
        }
        else {
            return (
                <div className="user">
                    <div className="alert alert-success">
                        <h2><strong>User ID</strong>: {this.props.userID}</h2>
                        <p><strong>User email</strong>: {this.props.email}</p>
                        <p><strong>User name</strong>: {this.props.firstName}</p>
                        <p><strong>User surname</strong>: {this.props.surname}</p>
                        <p><strong>Password</strong>: {this.props.password}</p>
                    </div>
                    <br/>
                </div>
            );
        }
    }

}

export default User;