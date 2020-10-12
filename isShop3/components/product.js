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
        return DOM.tr( {onClick: this.changeColor, className: this.props.selected?"selected":null},
            DOM.td( null, this.props.name ),
            DOM.td( null, DOM.img({src: this.props.url}) ),
            DOM.td( null, this.props.price ),
            DOM.td( null, this.props.balance), 
            DOM.td( null, DOM.input({type: "button", value: "Удалить", onClick: this.deleteProduct}))
        )
    };

};

export default Product;