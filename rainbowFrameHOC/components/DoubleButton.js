import React from 'react';
import PropTypes from 'prop-types';
import './doubleButton.css';

const DoubleButton = (props) => {

    const pressed = (caption) =>  {

        (caption == props.caption1)
        ?
        props.cbPressed("Нажата первая кнопка")
        :
        props.cbPressed("Нажата вторая кнопка")

    };

    return (
        <div className="btnsBlock">
            <input type="button" value={props.caption1} onClick={()=>pressed(props.caption1)}/>
            <span>{props.children}</span>
            <input type="button" value={props.caption2} onClick={()=>pressed(props.caption2)}/>
        </div>
    );
}

DoubleButton.propTypes = {
    caption1: PropTypes.string.isRequired,
    caption2: PropTypes.string.isRequired,
    cbPressed: PropTypes.func.isRequired,
}

export default DoubleButton;