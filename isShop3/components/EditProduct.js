import React from 'react';
import PropTypes from 'prop-types';

import './EditProduct.css';

class EditProduct extends React.Component {

    static propTypes = {
        editedProduct: PropTypes.shape({
            name: PropTypes.string.isRequired,
            code: PropTypes.string,
            price: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired,
            quantity: PropTypes.string.isRequired,
        }),
        workMode: PropTypes.number.isRequired,
        cbSaveChanges: PropTypes.func.isRequired,
        cbCancelChanges: PropTypes.func.isRequired,
        cbDisableBtns: PropTypes.func.isRequired,
        nextID: PropTypes.number,
        nameIsValid: PropTypes.bool.isRequired,
        priceIsValid: PropTypes.bool.isRequired,
        urlIsValid: PropTypes.bool.isRequired,
        quantityIsValid: PropTypes.bool.isRequired,
        valuesAreInValid: PropTypes.bool.isRequired,
        btnsDisabled: PropTypes.bool.isRequired
    };
    
    state = {
        options: {
            name: this.props.editedProduct.name,
            code: (this.props.workMode==1)?this.props.editedProduct.code:this.props.nextID.toString(),
            url: this.props.editedProduct.url,
            price: this.props.editedProduct.price,
            quantity: this.props.editedProduct.quantity,
        },
        nameIsValid: this.props.nameIsValid,
        priceIsValid: this.props.priceIsValid,
        urlIsValid: this.props.urlIsValid,
        quantityIsValid: this.props.quantityIsValid,
        valuesAreInValid: this.props.valuesAreInValid,
    };

    constructor(props) {
        super(props);
        console.log(this.state.valuesAreInValid)
    }

    editName = (EO) => {
        this.props.cbDisableBtns();
        const {value} = EO.target;
        let options = {...this.state.options, name: value};
        this.setState({options}, ()=> {this.fieldsValidation(this.state.options)});
    }

    editURL = (EO) => {
        this.props.cbDisableBtns();
        const {value} = EO.target;
        let options = {...this.state.options, url: value};
        this.setState({options}, ()=> {this.fieldsValidation(this.state.options)});
    }

    editPrice = (EO) => {
        this.props.cbDisableBtns();
        const {value} = EO.target;
        let options = {...this.state.options, price: value};
        this.setState({options}, ()=> {this.fieldsValidation(this.state.options)});
    }

    editQuantity = (EO) => {
        this.props.cbDisableBtns();
        const {value} = EO.target;
        let options = {...this.state.options, quantity: value};
        this.setState({options}, ()=> {this.fieldsValidation(this.state.options)});
    }

    fieldsValidation = (options) => {
        (!options.name)
        ?
        this.setState({nameIsValid: false}, this.checkValidity)
        :
        this.setState({nameIsValid: true}, this.checkValidity);

        (!options.url)
        ?
        this.setState({urlIsValid: false}, this.checkValidity)
        :
        this.setState({urlIsValid: true}, this.checkValidity);

        (!options.price)
        ?
        this.setState({priceIsValid: false}, this.checkValidity)
        :
        this.setState({priceIsValid: true}, this.checkValidity);

        (!options.quantity)
        ?
        this.setState({quantityIsValid: false}, this.checkValidity)
        :
        this.setState({quantityIsValid: true}, this.checkValidity);
    }

    checkValidity = () => {
        if (!this.state.nameIsValid
            || !this.state.urlIsValid
            || !this.state.priceIsValid 
            || !this.state.quantityIsValid) {
            this.setState({
                valuesAreInValid: true
            })
        } else if (this.state.nameIsValid 
            && this.state.urlIsValid
            && this.state.priceIsValid 
            && this.state.quantityIsValid){
            this.setState({
                valuesAreInValid: false
            })
        }
    }

    saveChanges = () => {
        this.props.cbSaveChanges(this.state.options)
    }

    cancelChanges = () => {
        this.props.cbCancelChanges()
    }

    render() {
        return (
            <div className="editProduct" key={this.state.options.code}>
                {
                    (this.props.workMode==1)
                    ?
                    <span className="editTitle">Edit existing product</span>
                    :
                    <span className="editTitle">Add new product</span>
                }
                <span>ID: {this.state.options.code}</span>
                <div className="product">
                    <span>Name:</span>
                    <input 
                        type="text" 
                        value={this.state.options.name} 
                        onChange={this.editName}
                    />
                    {(!this.state.nameIsValid)&&<span className="errorField">Field invalid</span>}
                </div>
                <div className="product">
                    <span>URL:</span>
                    <input 
                        type="text" 
                        value={this.state.options.url} 
                        onChange={this.editURL}
                    />
                    {(!this.state.urlIsValid)&&<span className="errorField">Field invalid</span>}
                </div>
                <div className="product">
                    <span>Price:</span>
                    <input 
                        type="text" 
                        value={this.state.options.price} 
                        onChange={this.editPrice}
                    />
                    {(!this.state.priceIsValid)&&<span className="errorField">Field invalid</span>}
                </div>
                <div className="product">
                    <span>Quantity:</span>
                    <input 
                        type="text" 
                        value={this.state.options.quantity} 
                        onChange={this.editQuantity}
                    />
                    {(!this.state.quantityIsValid)&&<span className="errorField">Field invalid</span>}
                </div>
                <input type="button" value="Save" disabled={this.state.valuesAreInValid} onClick={this.saveChanges}/>
                <input type="button" value="Cancel" onClick={this.cancelChanges}/>
            </div>
        )
    }
}

export default EditProduct;