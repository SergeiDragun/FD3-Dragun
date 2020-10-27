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
        let regexp = /<[^<>]+>/g;
        let arr = this.state.text;
        let s = arr.split(regexp);
        let newarr = [];
        for (let i = 0; i < s.length; i++) {
            newarr.push(s[i]);
            if (i==s.length-1) {
                break;
            };
            newarr.push(<br key={i}/>);
        }
        return <div>{newarr}</div>;
    }
}

export default BR2JSX;