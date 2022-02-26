import * as React from 'react';
import '../styles/SortFilter.css';
import {useState} from "react";
import {BiSort, FiFilter} from "react-icons/all";

export function SortFilterBar(props) {

return (
    <>
        <div className={'sort-filter'} style={props.style}>

            <div className={'icon-group button-icon'}>
                <BiSort size={'30'}/> <span className={'sort-filter--button-text'}>Sort</span>
            </div>
            <div className={'icon-group button-icon'}>
                <FiFilter size={'30'}/> <span className={'sort-filter--button-text'}>Filter</span>            </div>
        </div>
    </>
    );
}

