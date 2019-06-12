import axios from 'axios';

import React, {
    Component,
} from 'react';

function Status(props){
    if(props.loginResponse !== ""){
        return(
            <div className="alert alert-success alert-dismissible">
                <button type="button" className="close" data-dismiss="alert">&times;</button>
                <strong>Success!</strong> User created!.
            </div>
        );
    } else {
        return(
            <div></div>
        );
    }

}

class AddUser extends Component {

    constructor () {
        super();

        this.state = {
            email: '',
            firstName: '',
            surname: '',
            password: '',
            edit: 'False',
            emailMarketing: 0,
            phoneMarketing: 0,
            loginResponse: 0
        };

        this.handleClick = this.handleClick.bind(this);

        this.handleChangeUserEmail = this.handleChangeUserEmail.bind(this);
        this.handleChangeUserName = this.handleChangeUserName.bind(this);
        this.handleChangeUserSurname = this.handleChangeUserSurname.bind(this);
        this.handleChangeUserPassword = this.handleChangeUserPassword.bind(this);
        this.handleChangeUserEmailMarketing = this.handleChangeUserEmailMarketing.bind(this);
        this.handleChangeUserPhoneMarketing = this.handleChangeUserPhoneMarketing.bind(this);

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

    handleChangeUserEmailMarketing(event) {
        this.setState({emailMarketing: parseInt(event.target.value, 10)});
    }

    handleChangeUserPhoneMarketing(event) {
        this.setState({phoneMarketing: parseInt(event.target.value, 10)});
    }

    handleClick () {

        if(this.state.email !== ''
            && this.state.firstName !== ''){

            axios.post('http://localhost:9000/adduser', {
                email: this.state.email,
                firstName: this.state.firstName,
                surname: this.state.surname,
                password: this.state.password,
                emailMarketing: this.state.emailMarketing,
                phoneMarketing: this.state.phoneMarketing
            }).then((response) => {
                console.log(response.data);
                this.setState({loginResponse: response.data})
            }).catch((error)=>{
                    console.log(error);
                });
        }
    }

    render(){
        return (

            <div className="container">
                <center><h1>Add category: </h1></center>

                <label htmlFor="email">E-mail:</label>
                <input type="text" className="form-control" id="email" value={this.state.email}
                       onChange={this.handleChangeUserEmail} />

                <label htmlFor="firstName">First Name:</label>
                <input type="text" className="form-control" id="firstName" value={this.state.firstName}
                       onChange={this.handleChangeUserName} />

                <label htmlFor="surname">Surname:</label>
                <input type="text" className="form-control" id="surname" value={this.state.surname}
                       onChange={this.handleChangeUserSurname} />

                <label htmlFor="password">Password:</label>
                <input type="password" className="form-control" id="password" value={this.state.password}
                       onChange={this.handleChangeUserPassword} />

                <label htmlFor="emailMarketing">Do you want email marketing?</label>
                <select className="form-control" id="emailMarketing" onChange={this.handleChangeUserEmailMarketing}>
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                </select>

                <label htmlFor="phoneMarketing">Do you want phone marketing?</label>
                <select className="form-control" id="phoneMarketing" onChange={this.handleChangeUserPhoneMarketing}>
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                </select>

                <br/>

                <button className='btn btn-success btn-block' onClick={this.handleClick}>Add user</button>
                <Status loginResponse={this.state.loginResponse}/>
            </div>
        );
    }

}

export default AddUser;