import React from 'react';
import PropTypes from 'prop-types';

import './ProductDescription.css';

class ProductDescription extends React.Component {

    static propTypes = {
        code: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        quantity: PropTypes.number.isRequired,
        workmode: PropTypes.number.isRequired,
    };

    render() { 
        return (
            (this.props.workmode == 1) &&
            <div className="productDescription">
                <span>ID: {this.props.code}</span>
                <span>Name: {this.props.name}</span>
                <span><img src={this.props.url}/></span>
                <span>Price: {this.props.price}</span>
                <span>Quantity: {this.props.quantity}</span>
            </div>
        )
        
    }
}

export default ProductDescription;