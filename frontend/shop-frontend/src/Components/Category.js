import React, {
    Component
} from 'react';

class Category extends Component {

    render(){
        return(
            <div className="category">
                <div className="alert alert-info">
                    <h2><strong>Category name</strong>: {this.props.name}</h2>
                    <p><strong>Description</strong>: {this.props.description}</p>
                </div>
                <br/>
            </div>
        );
    }

}

export default Category;