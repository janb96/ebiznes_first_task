import axios from 'axios';

import React, {
    Component,
} from 'react';

class AddProduct extends Component {

    constructor () {
        super();

        this.state = {
            name: '',
            priceNet: 0,
            priceGross: 0,
            taxAmountVat: 23,
            description: '',
            categoryID: '',
            photo: '',
            catRepo: []
        };

        this.handleClick = this.handleClick.bind(this);

        this.handleChangeProductName = this.handleChangeProductName.bind(this);
        this.handleChangeProductDescription = this.handleChangeProductDescription.bind(this);
        this.handleChangePriceNet = this.handleChangePriceNet.bind(this);
        this.handleChangeTaxAmountVat = this.handleChangeTaxAmountVat.bind(this);
        this.handleChangeCategoryID = this.handleChangeCategoryID.bind(this);
        this.handleChangePhoto = this.handleChangePhoto.bind(this);

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

    handleChangeCategoryID(event) {
        let categoryID = parseInt(event.target.value, 10);
        this.setState({categoryID: categoryID});
    }

    handleChangePhoto(event) {
        this.setState({photo: event.target.value});
    }

    async componentDidMount() {
        const promise = await axios.get('http://localhost:9000/categories');
        const response = promise.data;
        this.setState({ catRepo: response });
    }

    handleClick () {

        if(this.state.name !== ''
            && this.state.description !== ''){

            axios.post('http://localhost:9000/addproduct', {
                name: this.state.name,
                description: this.state.description,
                priceNet: this.state.priceNet,
                priceGross: this.state.priceGross,
                taxAmountVat: this.state.taxAmountVat,
                categoryID: this.state.categoryID,
                photo: this.state.photo
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

                <label htmlFor="categoryID">Category:</label>
                <select className="form-control" id="categoryID" onChange={this.handleChangeCategoryID}>
                    {this.state.catRepo.map(category =>
                        <option value={category.categoryID}>
                            {category.categoryName}
                        </option>
                    )}
                </select>

                <br/>

                <button className='btn btn-success btn-block' onClick={this.handleClick}>Make order</button>
            </div>
        );
    }

}

export default AddProduct;