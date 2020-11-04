"use strict";

import React from 'react'
import ReactDOM from 'react-dom'
import MobileCOmpany from './components/MobileCompany'

let companyName = "Velcome"
let companiesObj = require('./clients.json')

ReactDOM.render(
    <MobileCOmpany
        companyName={companyName}
        companies={companiesObj}
    />
    , document.getElementById("container")
);
