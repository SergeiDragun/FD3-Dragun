let Filter = React.createClass({

    displayName: "Filter",

    render: function() {

        let strings = this.props.strings.map(item => {
            return React.DOM.span({key: item.code}, item.name)
        });
        
        return React.DOM.div( {className: "wrapper"},
            React.DOM.div( {className: "inputsBlock"},
                React.DOM.input( {type: "checkBox"} ),
                React.DOM.input( {type: "text"} ),
                React.DOM.input( {type: "button", value: "Сброс"} ),
            ),
            React.DOM.div( {className: "stringsBlock"}, strings)
        )
    },
})
