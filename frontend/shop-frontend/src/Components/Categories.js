import axios from 'axios';

import Category from './Category';
import PleaseLogin from './PleaseLogin';

import React, {
    Component,
} from 'react';

class Categories extends Component {

    constructor () {
        super();
        this.state = {
            catRepo: []
        };
    }

    async componentDidMount() {
        const promise = await axios.get('http://localhost:9000/categories');
        const response = promise.data;
        if(response != "Unauthorized"){
            this.setState({ catRepo: response });
        }
    }

    render(){
        if(this.state.catRepo.length > 0){
            return (
                <div className="container">
                    <h1>Category list:</h1>
                    <div className="row">
                        <div className="col-12">
                            {this.state.catRepo.map(category =>
                                <Category
                                    categoryID={category.categoryID}
                                    name={category.categoryName}
                                    description={category.categoryDescription}
                                    isAdmin={this.props.match.params.isAdmin + ""}
                                />
                            )}
                        </div>
                    </div>
                </div>
            );
        } else {
            return <PleaseLogin/>;
        }

    }

}

export default Categories;