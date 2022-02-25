import * as React from 'react';
import '../styles/Grid.css';
import GridRow from "./GridRow";

export default function Grid({}) {

    return (
        <div className="grid">
                <table>
                    <GridRow values={["test", "test"]} isHeader={true}/>
                    <GridRow values={["test", "test"]}/>
                </table>
        </div>
    );
}