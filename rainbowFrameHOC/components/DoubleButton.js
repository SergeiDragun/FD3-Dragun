import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import './doubleButton.css';


const DoubleButton = (props) => {

    const pressed = (EO) => {
        props.cbPressed(EO.target.value)
    }
    return (
    <div className="btnsBlock">
        <input type="button" value={props.caption1} onClick={pressed}/>
        <span>{props.children}</span>
        <input type="button" value={props.caption2} onClick={pressed}/>
    </div>
    )
}

DoubleButton.propTypes = {
    caption1: PropTypes.string.isRequired,
    caption2: PropTypes.string.isRequired,
    cbPressed: PropTypes.func.isRequired,
}
export default DoubleButton;