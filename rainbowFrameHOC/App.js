"use strict";

import React from 'react';
import ReactDOM from 'react-dom';
import Fragment from './components/Fragment';
import { withRainbowFrame } from './components/withRainbowFrame'

let colors=['red','orange', 'yellow','green', '#00BFFF', 'blue', 'purple'];
let FramedFragment=withRainbowFrame(colors)(Fragment);

ReactDOM.render(
    <FramedFragment>
        Если в небе светит радуга - закончен дождь!
    </FramedFragment>
    , document.getElementById("container")
);
