import React from 'react';
import PropTypes from 'prop-types';

class BR2JSX extends React.Component {

    static propTypes = {
        text: PropTypes.string.isRequired
    }

    state = {
        text: this.props.text
    }

    render() {
        let regexp = /<[^<>]+>/;
        let string = this.state.text;
        let arr = string.split(regexp);
        let newarr = [];
        arr.forEach((v, i) => {
            if (i)
            newarr.push(<br key={i}/>);
            newarr.push(v);
        });
        return <div>{newarr}</div>;
    }
}

export default BR2JSX;