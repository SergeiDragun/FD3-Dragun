import React from 'react';

import './product.css';

class Product extends React.Component {

    static propTypes = {
        name: React.PropTypes.string.isRequired,
        code: React.PropTypes.number.isRequired,
        price: React.PropTypes.number.isRequired,
        url: React.PropTypes.string.isRequired,
        balance: React.PropTypes.number.isRequired,
        cbSelectedLine: React.PropTypes.func.isRequired,
        cbDeleteProduct: React.PropTypes.func.isRequired,
        selected: React.PropTypes.bool.isRequired,
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
        return React.DOM.tr( {onClick: this.changeColor, className: this.props.selected?"selected":null},
            React.DOM.td( null, this.props.name ),
            React.DOM.td( null, React.DOM.img({src: this.props.url}) ),
            React.DOM.td( null, this.props.price ),
            React.DOM.td( null, this.props.balance), 
            React.DOM.td( null, React.DOM.input({type: "button", value: "Удалить", onClick: this.deleteProduct}))
        )
    };

};

export default Product;