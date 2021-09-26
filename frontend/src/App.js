import React, {useEffect} from "react";
import {Switch, Route, Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

import Login from "./components/Login";
import Map from "./components/Map/Map";
import AddAddress from "./components/AddAddress";
import EditAddress from "./components/EditAddress";

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

function addMarkers(lonLatArray, targetLonLat) {
    let iconStyle = new Style({
        image: new Icon({
            anchorXUnits: "fraction",
            anchorYUnits: "pixels",
            src: mapConfig.markerImage32,
        }),
    });

    let iconTargetStyle = new Style({
        image: new Icon({
            anchorXUnits: "fraction",
            anchorYUnits: "pixels",
            src: mapConfig.targetMarkerImage32,
        }),
    });

    let iconFeatures = [];

    for(let i = 0; i < lonLatArray.length; i++) {
        iconFeatures[i] = new Feature({
            geometry: new Point(fromLonLat(lonLatArray[i])),
        });
        iconFeatures[i].setStyle(iconStyle);
    }
    if(targetLonLat !== null && targetLonLat !== undefined){
        iconFeatures[lonLatArray.length] = new Feature({
            geometry: new Point(fromLonLat(targetLonLat)),
        });
        iconFeatures[lonLatArray.length].setStyle(iconTargetStyle);
    }

    return iconFeatures;
}

function App() {
    const [user, setUser] = React.useState(null);
    const [allUsers, setAllUsers] = React.useState(null);

    const [center, setCenter] = React.useState(mapConfig.center);
    const [zoom, setZoom] = React.useState(9);

    const [showMarker, setShowMarker] = React.useState(false);

    const [features, setFeatures] = React.useState(addMarkers(markersLonLat, null));

    const [addresses, setAddresses] = React.useState([]);

    const [showForeignAddresses, setShowForeignAddresses] = React.useState(false);

    const [selectedAddress, setSelectedAddress] = React.useState([]);

    const refreshAddresses = fetchAddressData;

    //gets executed when the app starts
    useEffect(() => {
        fetchUsersData();
        fetchAddressData().then();
    }, [])

    function placeMarkers(highlightedAddress) {

        let points = [];
        let targetPoint = null;
        let targetFound = false;
        if(highlightedAddress !== null) {
            for (let i = 0; i < addresses.data.length; i++) {

                if (highlightedAddress.lon === addresses.data[i].lon && highlightedAddress.lat === addresses.data[i].lat && highlightedAddress.firstName === addresses.data[i].firstName) {
                    targetPoint = [parseFloat(addresses.data[i].lon), parseFloat(addresses.data[i].lat)];
                    targetFound = true;
                } else {
                    points[targetFound ? i - 1 : i] = [parseFloat(addresses.data[i].lon), parseFloat(addresses.data[i].lat)];
                }

                setCenter(targetPoint);
            }
        } else {
            let i = 0;
            addresses.data.map(address => {
               points[i++] = [parseFloat(address.lon), parseFloat(address.lat)];
            });
        }

        setFeatures(addMarkers(points, targetPoint));
        setShowMarker(true);
    }

    async function fetchAddressData(showAll){

        let promise = await new Promise( function (resolve, reject) {

            if (user !== null) {
                //requesting the address data from the backend
                DataService.fetchAddresses(user, showAll).then(res => {
                    setAddresses(res);
                }).then(() => resolve());
            } else {
                reject();
            }
        })

        return promise;
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


    const chooseVisibility =
        <div className="btn-group btn-group-toggle" data-toggle="buttons" id="visibility">
            <label className="btn btn-primary" onMouseEnter={() => setShowMarker(false)}>
                <input onChange={() => { setShowForeignAddresses(true); fetchAddressData(1).then();}} value="true" type="radio" name="options" autoComplete="off"/> Öffentliche Adressen
            </label>
            <label className="btn btn-secondary active" onMouseEnter={() => setShowMarker(false)}>
                <input onChange={() => { setShowForeignAddresses(false); fetchAddressData(0).then();}} value="false" type="radio" name="options" autoComplete="off"/> Nur eigene Adressen
            </label>
        </div>

    const listItems = addresses.data===undefined ? <a/> : addresses.data.map((address) =>
        <div className="row">
            <Link to={"/edit-address"}>
                <a onClick={() => setSelectedAddress(address)} onMouseOver={() => {placeMarkers(address);}} onMouseEnter={() => setShowMarker(false)} className="list-group-item list-group-item-action list-group-item-dark">{address.firstName} {address.lastName}
                </a>
            </Link>
        </div>
    );

    const map =
        <div className="col-6">
            <Map center={fromLonLat(center)} zoom={zoom} user={user}>
                <Layers>
                    <TileLayer source={osm()} zIndex={0}/>
                    {showMarker && <VectorLayer source={vector({features})}/>}
                    {/*<VectorLayer source={vector({features})}/>*/}
                </Layers>
                <Controls>
                    <FullScreenControl/>
                </Controls>
            </Map>
        </div>

    return (
        <div>
            {fetchUsersData()}
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <a className="navbar-brand m-2">
                    Adviz
                </a>
                <div className="navbar-nav mr-auto">
                    {user ? (
                        <li className="nav-item">
                            <Link to={"/map"} className="nav-link">
                                Karte
                            </Link>
                        </li>
                    ) : null}
                    {user ? (
                        <li className="nav-item">
                            <Link to={"/add-address"} className="nav-link">
                                Neu
                            </Link>
                        </li>
                    ) : null}
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
                            <AddAddress {...props} user={user} allUsers={allUsers} refreshAddresses={refreshAddresses}/>
                        )}
                    />
                    <Route
                        path="/edit-address"
                        render={(props) => (
                            <EditAddress {...props} addressData={selectedAddress} user={user} allUsers={allUsers} refreshAddresses={refreshAddresses}/>
                        )}
                    />
                    <Route
                        path="/map"
                        render={(props) => (
                            <div className="row">
                                <div className="col-4">
                                    {chooseVisibility}
                                    {listItems}
                                </div>
                                {map}
                            </div>
                        )}
                    />
                </Switch>
            </div>
        </div>
    );
}

export default App;
