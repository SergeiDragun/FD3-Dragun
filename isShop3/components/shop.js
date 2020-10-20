import React, { Fragment } from 'react';
import PropTypes, { number } from 'prop-types';

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
                code: PropTypes.string.isRequired,
                price: PropTypes.string.isRequired,
                url: PropTypes.string.isRequired,
                quantity: PropTypes.string.isRequired,
            })
        ),
        nextID: PropTypes.number.isRequired,
    };

    state = {
        highlitedLine: 0,
        productList: this.props.productList,
        displayProduct: false,
        workModeDescription: 0, // 0 - не показывать описание продукта, 1 - показывать
        workModeEdit: 0, // 0 - не показывать, 1 - редактировать, 2 - добавить новый
        currentProduct: null, 
        editedProduct: null,
        newProduct: {
            name: "",
            price: "",
            url: "",
            quantity: "",
            code: ""
        },
        nextID: this.props.nextID, // изначально 8 товаров
        nameIsValid: null,
        priceIsValid: null,
        urlIsValid: null,
        quantityIsValid: null,
        valuesAreInValid: false,
        btnsDisabled: false
    };

    selectedProduct = (code) => {
        if (!this.state.btnsDisabled) {
            let currentProduct = this.state.productList.slice();
            currentProduct = currentProduct.find(item => item.code==code);
            this.setState({
                currentProduct: currentProduct, 
                workModeDescription: 1, 
                highlitedLine: code,
                workModeEdit: 0,
            });
        }
    };

    editProduct = (code) => {
        let editedProduct = this.state.productList.slice();
        editedProduct = editedProduct.find(item => item.code==code);
        this.setState({
            workModeDescription: 0,
            workModeEdit: 1,
            editedProduct: editedProduct,
            highlitedLine: code,
            nameIsValid: true,
            priceIsValid: true,
            urlIsValid: true,
            quantityIsValid: true,
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
            if (this.state.currentProduct && (delProductCode == this.state.currentProduct.code)) {
                this.setState({productList: delProduct, workModeDescription: 0});
            } else if (this.state.editedProduct && (delProductCode == this.state.editedProduct.code)) {
                this.setState({productList: delProduct, workModeEdit: 0});
            } else {
                this.setState({productList: delProduct});
            }
        }
    };
    
    saveChanges = (newProduct) => {
        if (this.state.workModeEdit == 1) { // Сохранение отредактированного продукта
            let editedProduct = this.state.productList.slice();
            for (let i = 0; i < editedProduct.length; i++) { // Не использовал forEach, т.к. нельзя прервать цикл
                if(editedProduct[i].code == newProduct.code) {
                    editedProduct[i] = newProduct;
                    this.setState({
                        productList: editedProduct,
                        workModeEdit: 0,
                        btnsDisabled: false
                    });
                break;
                }
            }
        } else if (this.state.workModeEdit == 2) { // Сохранение нового продукта
            let newProductList = this.state.productList.slice();
            newProductList.push(newProduct);
            console.log(newProduct)
            let nextID = this.state.nextID;
            nextID++;
            this.setState({
                productList: newProductList,
                nextID: nextID,
                workModeEdit: 0,
                btnsDisabled: false
            })
        }
    }

    cancelChanges = () => {
        this.setState({
            workModeEdit: 0,
            btnsDisabled: false
        })
    }

    disableBtns = () => {
        this.setState({
            btnsDisabled: true
        })
    }

    newProduct = () => {
        this.setState({
            workModeEdit: 2,
            workModeDescription: 0,
            highlitedLine: 0,
            nameIsValid: false,
            priceIsValid: false,
            urlIsValid: false,
            quantityIsValid: false,
        })
    }

    render() {
        let products = this.state.productList.map(item =>
            <Product
                key={item.code}
                code={item.code.toString()}
                name={item.name}
                price={item.price}
                url={item.url}
                quantity={item.quantity}
                cbSelectedProduct={this.selectedProduct}
                cbDeleteProduct={this.deleteProduct}
                cbEditProduct={this.editProduct}
                selected={(this.state.highlitedLine == item.code)?true:false}
                btnsDisabled={this.state.btnsDisabled}
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
                <input type="button" value="New product" disabled={this.state.btnsDisabled} onClick={this.newProduct}/>
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
                        key={this.state.editedProduct.code}
                        workMode={this.state.workModeEdit}
                        editedProduct={this.state.editedProduct}
                        cbSaveChanges={this.saveChanges}
                        cbCancelChanges={this.cancelChanges}
                        cbDisableBtns={this.disableBtns}
                        nameIsValid={this.state.nameIsValid}
                        priceIsValid={this.state.priceIsValid}
                        urlIsValid={this.state.urlIsValid}
                        quantityIsValid={this.state.quantityIsValid}
                        valuesAreInValid={this.state.valuesAreInValid}
                        btnsDisabled={this.state.btnsDisabled}
                    /> 
                    ||
                    (this.state.workModeEdit == 2) &&
                    <EditProduct
                        key={this.state.nextID}
                        workMode={this.state.workModeEdit}
                        editedProduct={this.state.newProduct}
                        cbSaveChanges={this.saveChanges}
                        cbCancelChanges={this.cancelChanges}
                        cbDisableBtns={this.disableBtns}
                        nextID={this.state.nextID}
                        nameIsValid={this.state.nameIsValid}
                        priceIsValid={this.state.priceIsValid}
                        urlIsValid={this.state.urlIsValid}
                        quantityIsValid={this.state.quantityIsValid}
                        valuesAreInValid={!this.state.valuesAreInValid}
                        btnsDisabled={this.state.btnsDisabled}
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