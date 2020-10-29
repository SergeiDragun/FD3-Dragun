"use strict";

import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import DoubleButton from './components/DoubleButton';
import { withRainbowFrame } from './components/withRainbowFrame'

let colors=['red','orange', 'yellow','green', '#00BFFF', 'blue', 'purple'];
let FramedFragment=withRainbowFrame(colors)(DoubleButton);

ReactDOM.render(
    <Fragment>
        <DoubleButton caption1="что нас" caption2="ревизии?" cbPressed={ num => alert(num) }>
            &nbsp;может спасти от&nbsp;
        </DoubleButton>
        <br/>
        <FramedFragment caption1="от ревизии" caption2="только кража" cbPressed={ num => alert(num) }>
            &nbsp;нас может спасти&nbsp;
        </FramedFragment>
    </Fragment>
    , document.getElementById("container")
);
