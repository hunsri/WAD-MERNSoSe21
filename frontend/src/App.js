import React from "react";
import {Switch, Route, Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

import Login from "./components/Login";
import Map from "./components/Map/Map";

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

    const [center, setCenter] = React.useState(mapConfig.center);
    const [zoom, setZoom] = React.useState(9);

    const [showMarker, setShowMarker] = React.useState(false);

    const [features, setFeatures] = React.useState(addMarkers(markersLonLat));

    async function login(user = null) {
        setUser(user);
    }

    async function logout() {
        setUser(null)
    }

    return (
        <div>
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <a href="/map" className="navbar-brand">
                    Adviz
                </a>
                <div className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link to={"/map"} className="nav-link">
                            Map
                        </Link>
                    </li>
                    <li className="nav-item">
                        {user ? (
                            <a onClick={logout} className="nav-link" style={{cursor: 'pointer'}}>
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
                        path="/map"
                        render={(props) => (
                            <div>
                                <Map center={fromLonLat(center)} zoom={zoom} {...props} user={user}>
                                    <Layers>
                                        <TileLayer source={osm()} zIndex={0}/>
                                        {showMarker && <VectorLayer source={vector({features})}/>}
                                    </Layers>
                                    <Controls>
                                        <FullScreenControl/>
                                    </Controls>
                                </Map>
                                <hr/>
                                <div>
                                    <input
                                        type="checkbox"
                                        checked={showMarker}
                                        onChange={(event) => setShowMarker(event.target.checked)}
                                    />{" "}
                                    Show markers
                                </div>
                            </div>
                        )}
                    />
                </Switch>
            </div>
        </div>

    );
}

export default App;
