import React, { useState } from "react";

const Selection = props => {

    return (
        <div className="container">
        <div className="overflow-auto">
            <div className="list-group">
                <a href="/edit-address" className="list-group-item list-group-item-action list-group-item-dark">A simple dark list group item 0</a>
                <a href="/edit-address" className="list-group-item list-group-item-action list-group-item-dark">A simple dark list group item 1</a>
                <a href="/edit-address" className="list-group-item list-group-item-action list-group-item-dark">A simple dark list group item 2</a>
                <a href="/edit-address" className="list-group-item list-group-item-action list-group-item-dark">A simple dark list group item 3</a>
            </div>
            </div>
        </div>
    );
};

export default Selection;