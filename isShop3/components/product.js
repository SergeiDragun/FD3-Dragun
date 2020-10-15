import React from 'react';
import PropTypes from 'prop-types';

import './product.css';

class Product extends React.Component {

    static propTypes = {
        name: PropTypes.string.isRequired,
        code: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
        url: PropTypes.string.isRequired,
        quantity: PropTypes.number.isRequired,
        cbSelectedProduct: PropTypes.func.isRequired,
        cbDeleteProduct: PropTypes.func.isRequired,
        cbEditProduct: PropTypes.func.isRequired,
        selected: PropTypes.bool.isRequired,
    };

    
    selectProduct = (EO) => {
        EO.stopPropagation();
        this.props.cbSelectedProduct(this.props.code);
    };

    deleteProduct = (EO) => {
        EO.stopPropagation();
        this.props.cbDeleteProduct(this.props.code);
    };

    editProduct =(EO) => {
        EO.stopPropagation();
        this.props.cbEditProduct(this.props.code);
    }

    render() {
        return (
            <tr className={this.props.selected ? "selected" : null} onClick={this.selectProduct}>
                <td>{this.props.name}</td>
                <td><img src={this.props.url} alt={this.props.name}/></td>
                <td>{this.props.price}</td>
                <td>{this.props.quantity}</td>
                <td>
                    <input type="button" value="Edit" onClick={this.editProduct}/>
                    <input type="button" value="Delete" onClick={this.deleteProduct}/>
                </td>
            </tr>
        )
    };

};

export default Product;