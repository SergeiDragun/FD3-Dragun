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
            inputText: this.props.defInputText,
            sortCheckBox: false,
            filteredArr: this.props.strings
        }
    },

    filterStrings: function() {
        let newFilteredArr = this.props.strings.filter(item => item.name.includes(this.state.inputText));
        this.setState({
            filteredArr: newFilteredArr
        })
        console.log(this.state.filteredArr)
    },

    sortStrings: function() {
        let newSortedArr = this.state.filteredArr.sort((a, b) => {
            if (a.name > b.name) {
              return 1;
            }
            if (a.name < b.name) {
              return -1;
            }
            return 0;
        });
        this.setState({
            filteredArr: newSortedArr
        })
    },

    filterArr: function(EO) {
        this.setState({
            inputText: EO.target.value,
        }, this.filterStrings);
    },

    sortArr: function(EO) {
        this.setState({
            sortCheckBox: EO.target.checked,
        }, this.sortStrings);
    },

    reset: function() {
        this.setState({
            inputText: this.props.defInputText,
            sortCheckBox: false,
            filteredArr: this.props.strings
        })
    },

    render: function() {

        let strings = this.state.filteredArr.map(item => 
            ( React.DOM.span({key: item.code}, item.name) )
        );
        
            return React.DOM.div( {className: "wrapper"},
            React.DOM.div( {className: "inputsBlock"},
                React.DOM.input( {type: "checkBox", onChange: this.sortArr, checked: this.state.sortCheckBox} ),
                React.DOM.input( {type: "text", onChange: this.filterArr, value: this.state.inputText} ),
                React.DOM.input( {type: "button", value: "Сброс", onClick: this.reset} ),
            ),
            React.DOM.div( {className: "stringsBlock"}, strings),
        );
    },
});
