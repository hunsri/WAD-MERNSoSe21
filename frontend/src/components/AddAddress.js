import React, { useState } from "react";

const AddAddress = props => {

    return (
        <div>
            <h1>Neue Adresse hinzufügen</h1>
            <br/>
            <label htmlFor="owner" className="form-label">Kontakt Eigentümer</label>
            <select className="custom-select m-2" id="owner">
                <option value="1">Current User</option>
                <option value="2">Other User</option>
            </select>
            <br/>
            <label htmlFor="visibility" className="form-label">Sichtbarkeit</label>
            <br/>
            <div className="btn-group btn-group-toggle" data-toggle="buttons" id="visibility">
                <label className="btn btn-primary">
                    <input type="radio" name="options" id="public" autoComplete="off" checked/> Öffentlich
                </label>
                <label className="btn btn-secondary active">
                    <input type="radio" name="options" id="private" autoComplete="off"/> Privat
                </label>
            </div>
            <br/>
            <br/>
            <label htmlFor="title" className="form-label">Titel</label>
            <input className="form-control" type="text" placeholder="Dr." aria-label="default input example"
                   id="title"/>
            <br/>
            <label htmlFor="gender" className="form-label">Geschlecht</label>
            <br/>
            <div className="form-check form-check-inline" id="gender">
                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="male" value="male"/>
                <label className="form-check-label" htmlFor="male">m</label>
            </div>
            <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="female" value="female"/>
                <label className="form-check-label" htmlFor="female">f</label>
            </div>
            <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="diverse" value="diverse"/>
                <label className="form-check-label" htmlFor="diverse">d</label>
            </div>
            <br/>
            <br/>
            <label htmlFor="forename" className="form-label">Vorname*</label>
            <input className="form-control" type="text" placeholder="Tim" aria-label="default input example" id="forename" required="true"/>
            <br/>
            <label htmlFor="surname" className="form-label">Nachname*</label>
            <input className="form-control" type="text" placeholder="Berners-Lee" aria-label="default input example" id="surname" required="true"/>
            <br/>
            <div className="row">
                <div className="col-10">
                    <label htmlFor="street" className="form-label">Straße*</label>
                    <input className="form-control" type="text" placeholder="Via Regia" aria-label="default input example" id="street" required="true"/>
                </div>
                <div className="col-2">
                    <label htmlFor="number" className="form-label">Hausnummer*</label>
                    <input className="form-control" type="text" placeholder="113" aria-label="default input example" id="number" required="true"/>
                </div>
            </div>
            <br/>
            <div className="row">
                <div className="col-2">
                    <label htmlFor="zipcode" className="form-label">PLZ*</label>
                    <input className="form-control" type="text" placeholder="27367" aria-label="default input example" id="zipcode" required="true"/>
                </div>
                <div className="col-10">
                    <label htmlFor="city" className="form-label">Stadt*</label>
                    <input className="form-control" type="text" placeholder="Stuckenborstel" aria-label="default input example" id="city" required="true"/>
                </div>
            </div>
            <br/>
            <label htmlFor="state" className="form-label">Bundesland*</label>
            <input className="form-control" type="text" placeholder="Niedersachsen" aria-label="default input example" id="state" required="true"/>
            <br/>
            <label htmlFor="country" className="form-label">Land*</label>
            <input className="form-control" type="text" placeholder="Deutschland" aria-label="default input example" id="country" required="true"/>
            <br/>
            <label htmlFor="email" className="form-label">E-Mail</label>
            <input className="form-control" type="text" placeholder="info@example.com" aria-describedby="emailHelp" id="email"/>
            <br/>
            <label htmlFor="misc" className="form-label">Sonstiges</label>
            <input className="form-control" type="text" aria-label="default input example" id="misc"/>
            <br/>
            <button className="btn btn-primary btn-lg" type="submit">Senden</button>
            <a href="/map" role="button" className="btn btn-secondary btn-lg m-2">Abbrechen</a>
        </div>
    );
};

export default AddAddress;