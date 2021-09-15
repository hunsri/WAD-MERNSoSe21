import React, { useState } from "react";
import EditAddress from "./EditAddress";
import {Switch, Route, Link} from "react-router-dom";

const Selection = props => {

    const user = props.user;

    const [selectedAddress, setSelectedAddress] = React.useState([]);

    const addresses = props.addresses;

    const listItems = addresses.data===undefined ? <a/> : addresses.data.map((address) =>
        <a onClick={() => setSelectedAddress(address)} href="/edit-address" className="list-group-item list-group-item-action list-group-item-dark">{address.firstName} {address.lastName}</a>
    );

    return (
        <div>
            <Route
                path="/edit-address"
                render={(props) => (
                    <EditAddress {...props} addressData={selectedAddress} user={user}/>
                )}
            />
            <div className="container">
                <div className="overflow-auto">
                    <div className="list-group">
                        {listItems}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Selection;