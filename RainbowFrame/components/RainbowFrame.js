import React from 'react';
import PropTypes from 'prop-types';

const RainbowFrame = (props) => {

    let length = props.colors.length;
    let index = -1;
    
    const renderFrames = (colors) => {
        length-=1;
        index+=1;
        return (
            (length == 0)
            ?
            <div style={{border:"solid 10px "+colors[index],padding:"10px"}}>{props.children}</div>
            :
            <div style={{border:"solid 10px "+colors[index],padding:"10px"}}>{renderFrames(colors)}</div>
        )
    }
    
    return renderFrames(props.colors);
}

RainbowFrame.propTypes = {
    colors: PropTypes.arrayOf(PropTypes.string)
};

/* class RainbowFrame extends React.Component {

    static propTypes = {
        colors: PropTypes.arrayOf(
            PropTypes.string.isRequired
        )
    }

    length = this.props.colors.length;
    index = -1;
    renderFrames =(colors) => {
        this.length-=1;
        this.index+=1;
        if (this.length == 0) {
            return <div style={{border:"solid 10px "+colors[this.index],padding:"10px"}}>{this.props.children}</div>
        }
        return <div style={{border:"solid 10px "+colors[this.index],padding:"10px"}}>{this.renderFrames(colors)}</div>
    }
    
    render() {
        return this.renderFrames(this.props.colors);
    }
} */

export default RainbowFrame