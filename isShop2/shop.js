let IsShop2 = React.createClass({

    displayName: "IsShop",

    getDefaultProps: function() {
       return { shop: "Какой-то магазин" }
    },

    propTypes: {
        shop: React.PropTypes.string.isRequired,
        productList: React.PropTypes.arrayOf(
            React.PropTypes.shape({
                name: React.PropTypes.string.isRequired,
                code: React.PropTypes.number.isRequired,
                price: React.PropTypes.number.isRequired,
                url: React.PropTypes.string.isRequired,
                balance: React.PropTypes.number.isRequired
            })
        ),
    },

    getInitialState: function() {
        return { 
            highlitedLine: 0,
            productList: this.props.productList,
        };
    },

    selectedLine: function(code) {
        this.setState( {highlitedLine: code} );
    },

    deleteProduct: function(code) {
        let consent = confirm("Вы хотите удалить товар?");
        if (consent) {
            let delProduct = this.state.productList.slice();
            delProduct = delProduct.filter(item => item.code!=code);
            this.setState({productList: delProduct});
        }
        
    },

    render: function() {
        let products = this.state.productList.map(item => {
            return React.createElement(Product, {
                key: item.code,
                code: item.code,
                name: item.name,
                price: item.price,
                url: item.url,
                balance: item.balance,
                cbSelectedLine: this.selectedLine,
                cbDeleteProduct: this.deleteProduct,
                selected: (this.state.highlitedLine == item.code)?true:false,
            })
        });

        return React.DOM.table( {className:'IsShop2'}, 
            React.DOM.caption( {className:'ShopName'}, this.props.shop ),
            React.DOM.thead( {className: "Options"},
                React.DOM.tr( null, 
                    React.DOM.th( null, "Подукт"),
                    React.DOM.th( null, "Изображение"),
                    React.DOM.th( null, "Цена"),
                    React.DOM.th( null, "Отаток"),
                    React.DOM.th( null, "Control"),
                ) 
            ),
            React.DOM.tbody( {className:'Products'}, products),
        );
    },
})
