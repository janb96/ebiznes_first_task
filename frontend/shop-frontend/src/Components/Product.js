import React, {
    Component
} from 'react';

import {
    Link
} from 'react-router-dom';
import axios from "axios";


class Product extends Component {

    constructor () {
        super();

        this.state = {
            productQuantity: 1,
            name: '',
            priceNet: 0,
            priceGross: 0,
            taxAmountVat: 23,
            description: '',
            categoryID: 0,
            photo: '',
            edit: 'False',
        };

        this.handleClick = this.handleClick.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleEditButton = this.handleEditButton.bind(this);

        this.handleChangeProductName = this.handleChangeProductName.bind(this);
        this.handleChangeProductDescription = this.handleChangeProductDescription.bind(this);
        this.handleChangePriceNet = this.handleChangePriceNet.bind(this);
        this.handleChangeTaxAmountVat = this.handleChangeTaxAmountVat.bind(this);
        this.handleChangePhoto = this.handleChangePhoto.bind(this);
    }

    handleClick () {

        if(this.state.name !== ''
            && this.state.description !== ''){

            axios.delete('http://localhost:9000/products/delete/' + this.props.productID).then((response) => {
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

    handleEdit () {

        if(this.state.name !== ''
            && this.state.description !== ''){

            let url = "http://localhost:9000/products/" + this.props.productID;

            axios.put(url , {
                name: this.state.name,
                description: this.state.description,
                priceNet: this.state.priceNet,
                priceGross: this.state.priceGross,
                taxAmountVat: this.state.taxAmountVat,
                categoryID: this.state.categoryID,
                photo: this.state.photo
            }).then((response) => {
                console.log(response.data);
                window.location.reload();
                // this.setState({loginResponse: response.data})
            }).catch((error)=>{
                    console.log(error);
                });
        }
    }

    handleChangeProductName(event) {
        this.setState({name: event.target.value});
    }

    handleChangeProductDescription(event) {
        this.setState({description: event.target.value});
    }

    handleChangePriceNet(event) {
        let netPrice = parseInt(event.target.value, 10);
        let grossPrice = (this.state.taxAmountVat / 100) * netPrice + netPrice;

        this.setState({
            priceNet: netPrice,
            priceGross: grossPrice
        });
    }

    handleChangeTaxAmountVat(event) {
        let taxAmount = parseInt(event.target.value, 10);
        let grossPrice = taxAmount / 100 * this.state.priceNet + this.state.priceNet;
        this.setState({
            taxAmountVat: taxAmount,
            priceGross: grossPrice
        });
    }

    handleChangePhoto(event) {
        this.setState({photo: event.target.value});
    }

    async componentDidMount() {

        this.setState({
            name: this.props.name,
            priceNet: this.props.priceNet,
            priceGross: this.props.priceGross,
            taxAmountVat: this.props.taxAmountVat,
            description: this.props.description,
            categoryID: this.props.categoryID,
            photo: this.props.photo
        });

    }

    render(){
        let photo = require("../" + "photo/not-found.jpg");
        try{
            photo = require("../" + this.props.photo);
        } catch (e){
            console.log(e);
        }
        if(this.props.isAdmin == "True"){
            if(this.state.edit == "True"){
                return(
                    <div className="container">
                        <center><h1>Edit product: </h1></center>
                        <button className='btn btn-danger' onClick={this.handleEditButton}>Stop edition</button>
                        <br/>
                        <label htmlFor="categoryName">Product name:</label>
                        <input type="text" className="form-control" id="categoryName" value={this.state.name}
                               onChange={this.handleChangeProductName} />

                        <label htmlFor="categoryDescription">Product description:</label>
                        <input type="text" className="form-control" id="categoryDescription" value={this.state.description}
                               onChange={this.handleChangeProductDescription} />

                        <label htmlFor="photo">Photo src:</label>
                        <input type="text" className="form-control" id="photo" value={this.state.photo}
                               onChange={this.handleChangePhoto} />

                        <label htmlFor="priceNet">Price net:</label>
                        <input type="number" className="form-control" id="priceNet" value={this.state.priceNet}
                               onChange={this.handleChangePriceNet} />

                        <br/>
                        <p>Gross price: {this.state.priceGross}</p>
                        <br/>

                        <label htmlFor="taxAmountVat">Tax amount value (%):</label>
                        <input type="number" className="form-control" id="taxAmountVat" value={this.state.taxAmountVat}
                               onChange={this.handleChangeTaxAmountVat} />
                        <br/>
                        <button className='btn btn-warning btn-block' onClick={this.handleEdit}>Edit product</button>
                        <br/>
                    </div>
                );
            } else {
                return(
                    <div className="product">
                        <h2><kbd>Product name</kbd>:{this.props.name}</h2>
                        <button className='btn btn-warning btn-block' onClick={this.handleEditButton}>Start edition</button>
                        <img src={photo} className="img-fluid" alt={this.props.name}/>
                        <div className="row">
                            <div className="col-6">
                                <p><kbd>Net price</kbd>: {this.props.priceNet}</p>
                                <p><kbd>Gross price</kbd>: {this.props.priceGross}</p>
                                <p><kbd>Vat</kbd>: {this.props.taxAmountVat}%</p>
                            </div>
                            <div className="col-6">
                                <div className="alert alert-info">
                                    <strong>Description:</strong>
                                    <p>{this.props.description}</p>
                                </div>
                            </div>
                        </div>

                        <button className='btn btn-danger btn-block' onClick={this.handleClick}>
                            Delete this product</button>

                        <br/>
                    </div>
                );
            }
        } else {
            return(
                <div className="product">
                    <h2><kbd>Product name</kbd>:{this.props.name}</h2>
                    <img src={photo} className="img-fluid" alt={this.props.name}/>
                    <div className="row">
                        <div className="col-6">
                            <p><kbd>Net price</kbd>: {this.props.priceNet}</p>
                            <p><kbd>Gross price</kbd>: {this.props.priceGross}</p>
                            <p><kbd>Vat</kbd>: {this.props.taxAmountVat}%</p>
                        </div>
                        <div className="col-6">
                            <div className="alert alert-info">
                                <strong>Description:</strong>
                                <p>{this.props.description}</p>
                            </div>
                        </div>
                    </div>
                    <Link to={"/addorder/"
                    + this.props.productID
                    + "/" + this.props.priceNet
                    + "/" + this.props.priceGross
                    }>
                        <h2 class="btn btn-warning btn-block">Buy it!</h2>
                    </Link>
                    <br/>
                </div>
            );
        }
    }

}

export default Product;