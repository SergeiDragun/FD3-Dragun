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
        },
        nextID: this.props.nextID, // изначально 8 товаров
    };

    selectedProduct = (code) => {
        let currentProduct = this.state.productList.slice();
        currentProduct = currentProduct.find(item => item.code==code);
        this.setState({
            currentProduct: currentProduct, 
            workModeDescription: 1, 
            highlitedLine: code,
            workModeEdit: 0,
        });
    };

    editProduct = (code) => {
        let editedProduct = this.state.productList.slice();
        editedProduct = editedProduct.find(item => item.code==code);
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
            if (this.state.currentProduct && (delProductCode == this.state.currentProduct.code)) {
                this.setState({productList: delProduct, workModeDescription: 0});
            } else if (this.state.editedProduct && (delProductCode == this.state.editedProduct.code)) {
                this.setState({productList: delProduct, workModeEdit: 0});
            } else {
                this.setState({productList: delProduct});
            }
        }
    };
    
    saveChanges = (qwe) => {
        console.log(qwe)
    }

    cancelChanges = () => {
        console.log("отменяю")
    }

    newProduct = (EO) => {
        console.log("Создаю новый")
        this.setState({
            workModeEdit: 2,
            workModeDescription: 0,
            highlitedLine: 0,
        })
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
                {console.log(this.state.workModeEdit)}
                {   
                    (this.state.workModeEdit == 1) && 
                    <EditProduct
                        key={this.state.editedProduct.code}
                        workMode={this.state.workModeEdit}
                        editedProduct={this.state.editedProduct}
                        cbSaveChanges={this.saveChanges}
                        cbCancelChanges={this.cancelChanges}
                    /> 
                    ||
                    (this.state.workModeEdit == 2) &&
                    <EditProduct
                        key={this.state.nextID}
                        workMode={this.state.workModeEdit}
                        editedProduct={this.state.newProduct}
                        cbSaveChanges={this.saveChanges}
                        cbCancelChanges={this.cancelChanges}
                        nextID={this.state.nextID}
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