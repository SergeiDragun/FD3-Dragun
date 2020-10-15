import React from 'react';
import PropTypes from 'prop-types';

import './EditProduct.css';

class EditProduct extends React.Component {

    static propTypes = {
        editedProduct: PropTypes.shape({
            name: PropTypes.string.isRequired,
            code: PropTypes.number.isRequired,
            price: PropTypes.number.isRequired,
            url: PropTypes.string.isRequired,
            quantity: PropTypes.number.isRequired,
        }),
        workMode: PropTypes.number.isRequired,
        /* cbEditName: PropTypes.func.isRequired,
        cbEditURL: PropTypes.func.isRequired,
        cbEditPrice: PropTypes.func.isRequired,
        cbEditQuantity: PropTypes.func.isRequired, */
        cbSaveChanges: PropTypes.func.isRequired,
        cbCancelChanges: PropTypes.func.isRequired,
    };

    

    state = {
        name: this.props.editedProduct.name,
        code: this.props.editedProduct.code,
        URL: this.props.editedProduct.url,
        price: this.props.editedProduct.price,
        quantity: this.props.editedProduct.quantity,
    };

    editName = (EO) => {
        this.setState({
            name: EO.target.value,
        })
        console.log(this.state.name)

    }

    editURL = (EO) => {
        this.setState({
            URL: EO.target.value,
        })
    }

    editPrice = (EO) => {
        this.setState({
            price: EO.target.value,
        })
    }

    editQuantity = (EO) => {
        this.setState({
            quantity: EO.target.value,
        })
    }

    saveChanges = () => {
        this.props.cbSaveChanges()
    }

    cancelChanges = () => {
        this.props.cbCancelChanges()
    }

    render() {
        return (
            <div className="editProduct">
                <span>ID: {this.state.code}</span>
                <div className="product">
                    <span>Name:</span>
                    <input 
                        type="text" 
                        value={this.state.name} 
                        onChange={this.editName}
                    />
                </div>
                <div className="product">
                    <span>URL:</span>
                    <input 
                        type="text" 
                        value={this.state.URL} 
                        onChange={this.editURL}
                    />
                </div>
                <div className="product">
                    <span>Price:</span>
                    <input 
                        type="text" 
                        value={this.state.price} 
                        onChange={this.editPrice}
                    />
                </div>
                <div className="product">
                    <span>Quantity:</span>
                    <input 
                        type="text" 
                        value={this.state.quantity} 
                        onChange={this.editQuantity}
                    />
                </div>
                <input type="button" value="Save" onClick={this.saveChanges}/>
                <input type="button" value="Cancel" onClick={this.cancelChanges}/>
            </div>
        )
    }
}

export default EditProduct;