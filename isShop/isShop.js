let IsShop = React.createClass({

    displayName: "IsShop",

    getDefaultProps: function() {
       return { shop: "Какой-то магазин" }
    },

    render: function() {
        
        let products = this.props.productList.map(item => {

            return React.DOM.tr( {key: item.code},
                React.DOM.td( null, item.name ),
                React.DOM.td( null, React.DOM.img({src: item.url}) ),
                React.DOM.td( null, item.price ),
                React.DOM.td( null, item.balance),
            );

        });

        return React.DOM.table( {className:'IsShop'}, 
            React.DOM.caption( {className:'ShopName'}, this.props.shop ),
            React.DOM.thead( {className: "Options"},
                React.DOM.tr( null, 
                    React.DOM.th( null, "Подукт"),
                    React.DOM.th( null, "Изображение"),
                    React.DOM.th( null, "Цена"),
                    React.DOM.th( null, "Отаток"),
                ) 
            ),
            React.DOM.tbody( {className:'Products'}, products),
        );
    },
})
