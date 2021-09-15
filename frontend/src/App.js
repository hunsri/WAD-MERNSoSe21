import React from "react";
import {Switch, Route, Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

import Login from "./components/Login";
import Map from "./components/Map/Map";
import AddAddress from "./components/AddAddress";
import EditAddress from "./components/EditAddress";
import Selection from "./components/Selection";

import DataService from "./services/Service";

import {Layers, TileLayer, VectorLayer} from "./components/Layers";
import {Style, Icon} from "ol/style";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import {osm, vector} from "./components/Source";
import {fromLonLat, get} from "ol/proj";
import {Controls, FullScreenControl} from "./components/Controls";

import mapConfig from "./components/config.json";
import "./App.css";


const markersLonLat = [mapConfig.exampleLonLat];

function addMarkers(lonLatArray) {
    let iconStyle = new Style({
        image: new Icon({
            anchorXUnits: "fraction",
            anchorYUnits: "pixels",
            src: mapConfig.markerImage32,
        }),
    });
    let features = lonLatArray.map((item) => {
        let feature = new Feature({
            geometry: new Point(fromLonLat(item)),
        });
        feature.setStyle(iconStyle);
        return feature;
    });
    return features;
}

function App() {
    const [user, setUser] = React.useState(null);
    const [allUsers, setAllUsers] = React.useState(null);

    const [center, setCenter] = React.useState(mapConfig.center);
    const [zoom, setZoom] = React.useState(9);

    const [showMarker, setShowMarker] = React.useState(false);

    const [features, setFeatures] = React.useState(addMarkers(markersLonLat));

    const [addresses, setAddresses] = React.useState([]);

    function fetchAddressData(){
        //requesting the address data from the backend
        DataService.fetchAddresses(user, 1).then(res => {setAddresses(res)});
    }

    function fetchUsersData(){
        if(allUsers === null)
            //requesting the data of all users (primarily for their names)
            DataService.fetchUsers().then(res => {setAllUsers(res)});
    }

    async function login(user = null) {
        setUser(user);
    }

    async function logout() {
        setUser(null);
    }

    return (
        <div>
            {fetchUsersData()}
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <a className="navbar-brand">
                    Adviz
                </a>
                <div className="navbar-nav mr-auto">
                    {user ? (
                        <li className="nav-item">
                            <Link to={"/map"} className="nav-link">
                                Map
                            </Link>
                        </li>
                    ):null}
                    {user ? (
                        <li className="nav-item">
                            <Link to={"/add-address"} className="nav-link">
                                Neu
                            </Link>
                        </li>
                    ):null}
                    <li className="nav-item">
                        {user ? (
                            <a href="/" onClick={logout} className="nav-link" style={{cursor: 'pointer'}}>
                                Logout {user.name}
                            </a>
                        ) : (
                            <Link to={"/login"} className="nav-link">
                                Login
                            </Link>
                        )}
                    </li>
                </div>
            </nav>

            <div className="container mt-3">
                <Switch>
                    <Route
                        path="/login"
                        render={(props) => (
                            <Login {...props} login={login}/>
                        )}
                    />
                    <Route
                        path="/add-address"
                        render={(props) => (
                            <AddAddress {...props} user={user} allUsers={allUsers}/>
                        )}
                    />
                    <Route
                        path="/edit-address"
                        render={(props) => (
                            <EditAddress {...props} user={user}/>
                        )}
                    />
                    <Route
                        path="/map"
                        render={(props) => (
                            <div className="row">
                                <div className="col-4">
                                <Selection {...props} addresses={addresses} user={user}/>
                                </div>
                                <div className="col-6">
                                <Map center={fromLonLat(center)} zoom={zoom} {...props} user={user}>
                                    <Layers>
                                        <TileLayer source={osm()} zIndex={0}/>
                                        {showMarker && <VectorLayer source={vector({features})}/>}
                                    </Layers>
                                    <Controls>
                                        <FullScreenControl/>
                                    </Controls>
                                </Map>
                                </div>
                                <div>
                                    <input
                                        type="checkbox"
                                        defaultChecked={showMarker}
                                        onChange={(event) => setShowMarker(event.target.checked)}
                                    />{" "}
                                    Show markers
                                </div>
                                <div>
                                    <button onClick={(event) => {fetchAddressData(); fetchUsersData()}} type="button" className="btn btn-primary">Refresh</button>
                                </div>
                            </div>
                        )}
                    />
                </Switch>
            </div>
        </div>
    )
}

export default App;
