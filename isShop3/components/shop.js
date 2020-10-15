import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import './shop.css';

import Product from './Product';
import ProductDescription from './ProductDescription';
import EditProduct from './EditProduct';

class IsShop3 extends React.Component {

    static propTypes = {
        shop: PropTypes.string.isRequired,
        productList: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string.isRequired,
                code: PropTypes.number.isRequired,
                price: PropTypes.number.isRequired,
                url: PropTypes.string.isRequired,
                quantity: PropTypes.number.isRequired,
            })
        ),
    };

    state = {
        highlitedLine: 0,
        productList: this.props.productList,
        displayProduct: false,
        workModeDescription: 0, // 0 - не показывать описание продукта, 1 - показывать
        workModeEdit: 0, // 0 - не показывать, 1 - редактировать, 2 - добавить новый
        currentProduct: null, 
        editedProduct: null,
    };

    selectedProduct = (code) => {
        let currentProduct = this.state.productList.slice();
        currentProduct = currentProduct.filter(item => item.code==code)[0];
        this.setState({
            currentProduct: currentProduct, 
            workModeDescription: 1, 
            highlitedLine: code,
            workModeEdit: 0,
        });
    };

    editProduct = (code) => {
        let editedProduct = this.state.productList.slice();
        editedProduct = editedProduct.filter(item => item.code==code)[0];
        console
        this.setState({
            workModeDescription: 0, 
            workModeEdit: 1,
            editedProduct: editedProduct,
            highlitedLine: code,
        });
    };
    
    deleteProduct = (code) => {
        let consent = confirm("Вы хотите удалить товар?");
        if (consent) {
            let delProductCode;
            let delProduct = this.state.productList.slice();
            delProduct = delProduct.filter(item => {
                if(item.code!=code) {
                    delProductCode = code;
                }
                return item.code!=code;
            });
            console.log(delProductCode)
            if (this.state.currentProduct && (delProductCode == this.state.currentProduct.code)) {
                this.setState({productList: delProduct, workModeDescription: 0});
            } else if (this.state.editedProduct && (delProductCode == this.state.editedProduct.code)) {
                this.setState({productList: delProduct, workModeEdit: 0});
            } else {
                this.setState({productList: delProduct});
            }
        }
    };
    
    /* editName = (newName) => {
        let editedProduct = this.state.editedProduct;
        editedProduct.name = newName;
        this.setState({
            editedProduct: editedProduct,
        })
    }

    editURL = (newURL) => {
        let editedProduct = this.state.editedProduct;
        editedProduct.url = newURL;
        this.setState({
            editedProduct: editedProduct,
        })
    }

    editPrice = (newPrice) => {
        let editedProduct = this.state.editedProduct;
        editedProduct.price = newPrice;
        this.setState({
            editedProduct: editedProduct,
        })
    }

    editQuantity = (newQuantity) => {
        let editedProduct = this.state.editedProduct;
        editedProduct.quantity = newQuantity;
        this.setState({
            editedProduct: editedProduct,
        })
    } */

    saveChanges = () => {
        console.log("соxраняю")
    }

    cancelChanges = () => {
        console.log("отменяю")
    }

    newProduct = (EO) => {
        console.log("Создаю новый")
    }

    render() {
        let products = this.state.productList.map(item =>
            <Product
                key={item.code}
                code={item.code}
                name={item.name}
                price={item.price}
                url={item.url}
                quantity={item.quantity}
                cbSelectedProduct={this.selectedProduct}
                cbDeleteProduct={this.deleteProduct}
                cbEditProduct={this.editProduct}
                selected={(this.state.highlitedLine == item.code)?true:false}
            />
        );
        return (
            <Fragment>
                <table className="IsShop3">
                    <caption className="ShopName">{this.props.shop}</caption>
                    <thead className="Options">
                        <tr>
                            <th>Name</th>
                            <th>URL</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Control</th>
                        </tr>
                    </thead>
                    <tbody className="Products">{products}</tbody>
                </table>
                <input type="button" value="New product" onClick={this.newProduct}/>
                { 
                    (this.state.workModeDescription == 1) &&
                    <ProductDescription 
                        workmode={this.state.workModeDescription}
                        name={this.state.currentProduct.name}
                        code={this.state.currentProduct.code}
                        price={this.state.currentProduct.price}
                        url={this.state.currentProduct.url}
                        quantity={this.state.currentProduct.quantity}
                    />
                }
                {
                    (this.state.workModeEdit == 1) &&
                    <EditProduct
                        workMode={this.state.workModeEdit}
                        editedProduct={this.state.editedProduct}
                        /* cbEditName={this.editName}
                        cbEditURL={this.editURL}
                        cbEditPrice={this.editPrice}
                        cbEditQuantity={this.editQuantity} */
                        cbSaveChanges={this.saveChanges}
                        cbCancelChanges={this.cancelChanges}
                    />
                }
            </Fragment>
        );
    };
};

IsShop3.defaultProps = {
    shop: "Какой-то магазин",
};

export default IsShop3;