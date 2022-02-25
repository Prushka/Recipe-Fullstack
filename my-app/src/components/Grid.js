import * as React from 'react';
import '../styles/Grid.css';

export default function Grid({}) {

    return (
        <div className="grid">
            <div style={{overflow: "auto"}}>
                <div className='col-1' style={{backgroundColor:"red"}}>
                    <h1>test</h1>
                </div>

                <div className='col-2' style={{backgroundColor:"red"}}>
                    <h1>test</h1>
                </div>
            </div>

            <div>
                <table>
                    <tr>
                        <th>Firstname</th>
                        <th>Lastname</th>
                    </tr>
                    <tr>
                        <td>Peter</td>
                        <td>Griffin</td>
                    </tr>
                </table>
            </div>
        </div>
    );
}