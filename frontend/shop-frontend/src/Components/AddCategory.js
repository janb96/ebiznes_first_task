import axios from 'axios';

import React, {
    Component,
} from 'react';

class AddCategory extends Component {

    constructor () {
        super();

        this.state = {
            name: '',
            description: '',
        };

        this.handleClick = this.handleClick.bind(this);

        this.handleChangeCategoryName = this.handleChangeCategoryName.bind(this);
        this.handleChangeCategoryDescription = this.handleChangeCategoryDescription.bind(this);
    }

    handleChangeCategoryName(event) {
        this.setState({name: event.target.value});
    }

    handleChangeCategoryDescription(event) {
        this.setState({description: event.target.value});
    }

    handleClick () {

        if(this.state.name !== ''
            && this.state.description !== ''){

            axios.post('http://localhost:9000/addcategory', {
                name: this.state.name,
                description: this.state.description,
            }).then((response) => {
                    console.log(response.data);
                    // this.setState({loginResponse: response.data})
                })
                .catch((error)=>{
                    console.log(error);
                });
        }
    }

    render(){
        return (

            <div className="container">
                <center><h1>Add category: </h1></center>

                <label htmlFor="categoryName">Category name:</label>
                <input type="text" className="form-control" id="categoryName" value={this.state.name}
                       onChange={this.handleChangeCategoryName} />

                <label htmlFor="categoryDescription">Category description:</label>
                <input type="text" className="form-control" id="categoryDescription" value={this.state.description}
                       onChange={this.handleChangeCategoryDescription} />

                <br/>

                <button className='btn btn-success btn-block' onClick={this.handleClick}>Make order</button>
            </div>
        );
    }

}

export default AddCategory;