let Filter = React.createClass({

    displayName: "Filter",

    render: function() {

        let strings = this.props.strings.map(item => {
            return React.DOM.span({key: item.code}, item.name)
        });
        
        return React.DOM.div( {className: "stringsBlock"}, strings)
    },
})
