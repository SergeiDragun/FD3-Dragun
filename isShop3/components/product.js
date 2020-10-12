import React from 'react';
import PropTypes from 'prop-types';
import DOM from 'react-dom-factories';

import './product.css';

class Product extends React.Component {

    static propTypes = {
        name: PropTypes.string.isRequired,
        code: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
        url: PropTypes.string.isRequired,
        balance: PropTypes.number.isRequired,
        cbSelectedLine: PropTypes.func.isRequired,
        cbDeleteProduct: PropTypes.func.isRequired,
        selected: PropTypes.bool.isRequired,
    };

    
    changeColor = (EO) => {
        EO.stopPropagation();
        this.props.cbSelectedLine(this.props.code);
    };

    deleteProduct = (EO) => {
        EO.stopPropagation();
        this.props.cbDeleteProduct(this.props.code);
    };

    render() {
        return (
            <tr className={this.props.selected ? "selected" : null} onClick={this.changeColor}>
                <td>{this.props.name}</td>
                <td><img src={this.props.url}/></td>
                <td>{this.props.price}</td>
                <td>{this.props.balance}</td>
                <td><input type="button" value="Удалить" onClick={this.deleteProduct}/></td>
            </tr>
        )
    };

};

export default Product;