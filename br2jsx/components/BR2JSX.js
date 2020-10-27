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
        for (let i = 0; i < arr.length; i++) {
            newarr.push(arr[i]);
            (i==arr.length-1) || newarr.push(<br key={i}/>);
            /* if (i==arr.length-1) {
                break;
            };
            newarr.push(<br key={i}/>); */
        }
        return <div>{newarr}</div>;
    }
}

export default BR2JSX;