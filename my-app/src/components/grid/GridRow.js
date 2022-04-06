/*
 * Copyright 2022 Dan Lyu.
 */

import * as React from 'react';
import {setAddState} from "../../util";
import {RiSortAsc, RiSortDesc} from "react-icons/ri";
import {BiSortAlt2} from "react-icons/bi";
import {ClickEvent} from "./ClickEvent";

export default function GridRow({
                                    sortValues, setSortValues,
                                    id, values, headers, isHeader = false,
                                    entity,
                                    onClickHandler, clickableHeader = []
                                }) {
    const images = ['.jpg', '.png', '.jpeg']
    return (
        <tr key={id} className={!isHeader ? 'table__row' : ''}>
            {
                values.map((value, index) => {
                    const CTag = isHeader ? `th` : `td`;
                    const cellClass = isHeader ? `grid--clickable` : clickableHeader.includes(headers[index]) ? `grid--clickable grid--td-clickable` : ''
                    let child = value
                    images.forEach((image) => {
                        if (typeof value === 'string' && value.endsWith(image)) {
                            child = <img className={'grid--avatar'} src={value} alt={value}/>
                        }
                    })
                    let icon = <></>;
                    let isSorting = false;
                    if (isHeader) {
                        if (sortValues[value] === 0) {
                            icon = <RiSortDesc className={'grid-header-icon'}/>
                            isSorting = true
                        } else if (sortValues[value] === 1) {
                            icon = <RiSortAsc className={'grid-header-icon'}/>
                            isSorting = true
                        } else {
                            icon = <BiSortAlt2 className={'grid-header-icon'}/>
                        }
                    }
                    return (<CTag className={`${child !== value && 'grid--avatar-container'}`}
                                  onClick={() => {
                                      if (sortValues && isHeader) {
                                          let newValue = sortValues[value] < 2 ? sortValues[value] + 1 : 0
                                          if (newValue !== 2) {
                                              setAddState(value, newValue, {}, setSortValues)
                                          } else {
                                              setAddState(value, newValue, sortValues, setSortValues)
                                          }
                                      }
                                      if (!isHeader) {
                                          onClickHandler(new ClickEvent(headers[index], value, id, index, isHeader, entity))
                                      }
                                  }
                                  }
                                  key={`${id}_${index}`}>
                        <div className={`grid-header-group ${isSorting ? 'grid-header-sorting' : ''}`}>
                            {icon}
                            <span className={cellClass}>{child}</span>
                        </div>
                    </CTag>)
                })
            }
        </tr>
    );
}