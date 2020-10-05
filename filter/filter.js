let Filter = React.createClass({

    displayName: "Filter",

    propTypes: {
        strings: React.PropTypes.arrayOf(
            React.PropTypes.shape({
                name: React.PropTypes.string.isRequired,
                code: React.PropTypes.number.isRequired,
            })
        ),
        defInputText: React.PropTypes.string.isRequired,
    },

    getInitialState: function() {
        return {
            filterArr: this.props.defInputText,
            sortArr: false,
            currentArr: this.props.strings
        }
    },

    transformArray: function() {
        let transformedArr = this.props.strings;
        if (this.state.filterArr) {
            transformedArr = transformedArr.filter(item => item.name.includes(this.state.filterArr));
        };
        if (this.state.sortArr) {
            transformedArr = transformedArr.sort((a, b) => {
                if (a.name > b.name) {
                  return 1;
                }
                if (a.name < b.name) {
                  return -1;
                }
                return 0;
            })
        };
        this.setState({
            currentArr: transformedArr
        });
    },

    filterArray: function(EO) {
        this.setState({
            filterArr: EO.target.value,
        }, this.transformArray);
    },

    sortArray: function(EO) {
        this.setState({
            sortArr: EO.target.checked,
        }, this.transformArray);
    },

    reset: function() {
        this.setState({
            filterArr: this.props.defInputText,
            sortArr: false,
            currentArr: this.props.strings
        })
    },

    render: function() {

        let strings = this.state.currentArr.map(item => 
            ( React.DOM.span({key: item.code}, item.name) )
        );
        
            return React.DOM.div( {className: "wrapper"},
            React.DOM.div( {className: "inputsBlock"},
                React.DOM.input( {type: "checkBox", onChange: this.sortArray, checked: this.state.sortArr} ),
                React.DOM.input( {type: "text", onChange: this.filterArray, value: this.state.filterArr} ),
                React.DOM.input( {type: "button", value: "Сброс", onClick: this.reset} ),
            ),
            React.DOM.div( {className: "stringsBlock"}, strings),
        );
    },
});
