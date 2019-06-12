import React, {
    Component
} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";

class Category extends Component {

    constructor () {
        super();

        this.state = {
            edit: 'False'
        };

        this.handleClick = this.handleClick.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleEditButton = this.handleEditButton.bind(this);

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

            axios.delete('http://localhost:9000/categories/delete/' + this.props.categoryID).then((response) => {
                console.log(response.data);
                window.location.reload();
                // this.setState({loginResponse: response.data})
            })
                .catch((error)=>{
                    console.log(error);
                });
        }
    }

    handleEditButton () {

        console.log(this.state.edit + " Zmiana ");

        if(this.state.edit === "True"){
            this.setState({
                edit: "False"
            });
        } else {
            this.setState({
                edit: "True"
            });
        }
    }

    handleEdit () {

        if(this.state.name !== ''
            && this.state.description !== ''){

            let url = "http://localhost:9000/categories/" + this.props.categoryID;

            axios.put(url , {
                name: this.state.name,
                description: this.state.description,
            }).then((response) => {
                console.log(response.data);
                window.location.reload();
                // this.setState({loginResponse: response.data})
            }).catch((error)=>{
                console.log(error);
            });
        }
    }

    async componentDidMount() {

        this.setState({
            name: this.props.name,
            description: this.props.description,
        });

    }

    render(){
        if(this.props.isAdmin === "True"){
            if(this.state.edit === "True"){
                return (

                    <div className="category">
                        <div className="alert alert-warning">
                            <center><h1>Edit category: </h1></center>
                            <button className='btn btn-danger' onClick={this.handleEditButton}>Stop edition</button>
                            <br/>
                            <label htmlFor="categoryName">Category name:</label>
                            <input type="text" className="form-control" id="categoryName" value={this.state.name}
                                   onChange={this.handleChangeCategoryName} />

                            <label htmlFor="categoryDescription">Category description:</label>
                            <input type="text" className="form-control" id="categoryDescription" value={this.state.description}
                                   onChange={this.handleChangeCategoryDescription} />

                            <br/>

                            <button className='btn btn-warning btn-block' onClick={this.handleEdit}>Edit category</button>
                        </div>
                    </div>
                );
            } else {
                return(
                    <div className="category">
                        <div className="alert alert-info">
                            <button className='btn btn-warning' onClick={this.handleEditButton}>Start edition</button>
                            <h2><strong>Category name</strong>: {this.props.name}</h2>
                            <p><strong>Description</strong>: {this.props.description}</p>
                            <Link to={"/products/byCategory/" + this.props.categoryID}>Show products in this category</Link>
                            <br/>
                            <button className='btn btn-danger btn-block'
                                    onClick={this.handleClick}>Delete this category</button>
                        </div>
                        <br/>
                    </div>
                );
            }
        } else {
            return(
                <div className="category">
                    <div className="alert alert-info">
                        <h2><strong>Category name</strong>: {this.props.name}</h2>
                        <p><strong>Description</strong>: {this.props.description}</p>
                        <Link to={"/products/byCategory/" + this.props.categoryID}>Show products in this category</Link>
                    </div>
                    <br/>
                </div>
            );
        }

    }

}

export default Category;