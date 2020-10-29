import React from 'react';
import './frame.css'

const withRainbowFrame = colors => Component => props => {

    let rainbowFrame = <Component {...props} />;
    
    colors.forEach(color => {
        rainbowFrame = <div className="frame" style={ {borderColor:color} }>{rainbowFrame}</div>
    });
    
    return rainbowFrame;
};

export { withRainbowFrame };