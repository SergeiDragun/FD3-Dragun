"use strict";

import React from 'react';
import ReactDOM from 'react-dom';

import IsShop3 from './components/Shop';

let shopName = "Продуктовый магазин";
let productListArr = require('./products.json');
let nextID = 9;

ReactDOM.render(
    <IsShop3
        shop={shopName}
        productList={productListArr}
        nextID={nextID}
    />
    , document.getElementById("container")
);
