import React from 'react';
import PropTypes from 'prop-types';
import DOM from 'react-dom-factories';

import './shop.css';

import Product from './Product';

class IsShop3 extends React.Component {

    static propTypes = {
        shop: PropTypes.string.isRequired,
        productList: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string.isRequired,
                code: PropTypes.number.isRequired,
                price: PropTypes.number.isRequired,
                url: PropTypes.string.isRequired,
                balance: PropTypes.number.isRequired
            })
        ),
    };

    state = {
        highlitedLine: 0,
        productList: this.props.productList,
    };

    selectedLine = (code) => {
        this.setState( {highlitedLine: code} );
    };

    deleteProduct = (code) => {
        let consent = confirm("Вы хотите удалить товар?");
        if (consent) {
            let delProduct = this.state.productList.slice();
            delProduct = delProduct.filter(item => item.code!=code);
            this.setState({productList: delProduct});
        }
        
    };

    render() {
        let products = this.state.productList.map(item =>
            <Product
                key={item.code}
                code={item.code}
                name={item.name}
                price={item.price}
                url={item.url}
                balance={item.balance}
                cbSelectedLine={this.selectedLine}
                cbDeleteProduct={this.deleteProduct}
                selected={(this.state.highlitedLine == item.code)?true:false}
            />
        );
        return (
            <table className="IsShop3">
                <caption className="ShopName">{this.props.shop}</caption>
                <thead className="Options">
                    <tr>
                        <th>"Продукт"</th>
                        <th>"Изображение"</th>
                        <th>"Цена"</th>
                        <th>"Остаток"</th>
                        <th>"Control"</th>
                    </tr>
                </thead>
                <tbody className="Products">{products}</tbody>
            </table>
        );
    };
};

IsShop3.defaultProps = {
    shop: "Какой-то магазин",
};

export default IsShop3;