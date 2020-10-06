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
        };
    },

    selectedLine: function(code) {
        this.setState( {highlitedLine: code} );
    },

    render: function() {

        let products = this.props.productList.map(item => {
            return React.createElement(Product, {
                key: item.code,
                code: item.code,
                name: item.name,
                price: item.price,
                url: item.url,
                balance: item.balance,
                cbSelectedLine: this.selectedLine,
                selected: (this.state.highlitedLine == item.code)?"selected":null,
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
