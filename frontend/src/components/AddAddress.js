import React, {isValidElement, useState} from "react";
import DataService from "../services/Service";
import { useHistory } from 'react-router-dom'

const AddAddress = props => {

    //history for returning to previous page
    const history = useHistory();

    const loggedInUser = props.user;
    const allUsers = props.allUsers.data;
    const initialAddressState = {
        "firstName": "",
        "lastName": "",
        "street": "",
        "houseNumber": "",
        "postcode": "",
        "town": "",
        "federalState": "",
        "country": "",
        "title": "",
        "gender": "",
        "email":"",
        "further":"",
        "lon" : "",
        "lat" : "",
        "isPrivate": "true",
        "ownerId":`${loggedInUser.name}`
    }
    //the data of the current address form
    const [addressData, setAddressData] = useState(initialAddressState);

    const [invalidAddress, setInvalidAddress] = useState(false);

    function sendAddressData(data) {
        DataService.postNewAddress(data).then();
    }

    async function attemptSending() {

        let validInput = validateInput();

        console.log(validInput);

        if(validInput){
            DataService.fetchLonLat(addressData.street, addressData.houseNumber, addressData.postcode, addressData.country).then(res => {

                if (res !== null) {
                    addressData.lon = res[0];
                    addressData.lat = res[1];

                    sendAddressData(addressData);
                }
            }).catch(err => {
                //TODO catch specific errors
                console.log(err);
                setInvalidAddress(true);
            });
        }
    }

    const handleInputChange = event => {
        const { name, value } = event.target;

        setAddressData({ ...addressData, [name]: value });
    };

    const invalidAddressWarning = invalidAddress ?
        (
            <div className="alert alert-danger" role="alert">
                Es konnte keine Adresse mit diesen Daten gefunden werden!
            </div>
        ) : (
            <a></a>
        )

    const ownerList = loggedInUser.name==="admina" ?
        (
            //only showing the selection for admina
            <select onChange={handleInputChange} value={addressData.ownerId} className="custom-select m-2" id="owner" name="ownerId">
                <option>{allUsers[0].firstName}</option>
                <option>{allUsers[1].firstName}</option>
            </select>
        ):(
            <select onChange={handleInputChange} value={addressData.ownerId} className="custom-select m-2" id="owner" name="ownerId" disabled={true}>
                <option>{loggedInUser.name}</option>
            </select>
        )

    function validateInput(){
        'use strict' //strict mode to make sure every variable is declared

        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        let forms = document.querySelectorAll('.needs-validation')

        let formIsValid = true;

        // Loop over them and return false to prevent submission
        Array.prototype.slice.call(forms)
            .forEach(function (form) {

                if(!form.checkValidity()){
                    form.classList.add('was-validated')

                    formIsValid = false;
                }
            })
        //if form was valid
        return formIsValid;
    }

    return (
        <div>
            <h1>Neue Adresse hinzufügen</h1>
            <br/>
            <div>
            <label htmlFor="owner" className="form-label">Kontakt Eigentümer</label>
                {ownerList}
            </div>
            <br/>
            <label htmlFor="visibility" className="form-label">Sichtbarkeit</label>
            <br/>
            <div className="btn-group btn-group-toggle" data-toggle="buttons" id="visibility">
                <label className="btn btn-primary">
                    <input onChange={handleInputChange} value="true" type="radio" name="options" id="public" autoComplete="off" name="isPrivate"/> Öffentlich
                </label>
                <label className="btn btn-secondary active">
                    <input onChange={handleInputChange} value="false" type="radio" name="options" id="private" autoComplete="off" defaultChecked={true} name="isPrivate"/> Privat
                </label>
            </div>
            <br/>
            <br/>
            <label htmlFor="title" className="form-label">Titel</label>
            <input onChange={handleInputChange} value={addressData.title} className="form-control" type="text" placeholder="Dr." id="title" name="title"/>
            <br/>
            <label htmlFor="gender" className="form-label">Geschlecht</label>
            <br/>
            <div className="form-check form-check-inline" id="gender">
                <input onChange={handleInputChange} className="form-check-input" type="radio" name="inlineRadioOptions" id="male" value="m" name="gender"/>
                <label className="form-check-label" htmlFor="male">männlich</label>
            </div>
            <div className="form-check form-check-inline">
                <input onChange={handleInputChange} className="form-check-input" type="radio" name="inlineRadioOptions" id="female" value="f" name="gender"/>
                <label className="form-check-label" htmlFor="female">weiblich</label>
            </div>
            <div className="form-check form-check-inline">
                <input onChange={handleInputChange} className="form-check-input" type="radio" name="inlineRadioOptions" id="diverse" value="d" name="gender"/>
                <label className="form-check-label" htmlFor="diverse">divers</label>
            </div>
            <div className="form-check form-check-inline">
                <input onChange={handleInputChange} className="form-check-input" type="radio" name="inlineRadioOptions" id="no-gender-provided" value="" name="gender"/>
                <label className="form-check-label" htmlFor="diverse">keine Angabe</label>
            </div>
            <br/>
            <br/>
            {/*validation required here*/}
            <form className="needs-validation" noValidate>
                <label htmlFor="forename" className="form-label">Vorname*</label>
                <input onChange={handleInputChange} pattern="^[\u00c0-\u00deA-Z'\-][ \u00c0-\u01ffa-zA-Z'\-]+$" value={addressData.firstName} class="form-control" type="text" placeholder="Tim" id="forename" name="firstName" required/>
                <div className="invalid-feedback">Bitte überprüfe deine Eingabe und achte auf Groß- und Kleinschreibung!</div>
                <br/>
                <label htmlFor="surname" className="form-label">Nachname*</label>
                <input onChange={handleInputChange} pattern="^[\u00c0-\u00deA-Z'\-][ \u00c0-\u01ffa-zA-Z'\-]+$" value={addressData.lastName} className="form-control" type="text" placeholder="Berners-Lee" id="surname" name="lastName" required/>
                <div className="invalid-feedback">Bitte überprüfe deine Eingabe und achte auf Groß- und Kleinschreibung!</div>
                <br/>
                <div className="row">
                    <div className="col-10">
                        <label htmlFor="street" className="form-label">Straße*</label>
                        <input onChange={handleInputChange} pattern="^[\u00c0-\u00deA-Z'\-][ \u00c0-\u01ffa-zA-Z'\-]+$" value={addressData.street} className="form-control" type="text" placeholder="Via Regia" id="street" name="street" required/>
                        <div className="invalid-feedback">Bitte überprüfe deine Eingabe und achte auf Groß- und Kleinschreibung!</div>
                    </div>
                    <div className="col-2">
                        <label htmlFor="number" className="form-label">Hausnummer*</label>
                        <input onChange={handleInputChange} pattern="^[1-9]\d{0,5} ?[a-zA-Z]?" value={addressData.houseNumber} className="form-control" type="text" placeholder="113" id="number" name="houseNumber" required/>
                        <div className="invalid-feedback">Bitte überprüfe deine Eingabe!</div>
                    </div>
                </div>
                <br/>
                <div className="row">
                    <div className="col-2">
                        <label htmlFor="zipcode" className="form-label">PLZ*</label>
                        <input onChange={handleInputChange} pattern="[0-9]+$" value={addressData.postcode} className="form-control" type="text" placeholder="27367" id="zipcode" name="postcode" required/>
                        <div className="invalid-feedback">Bitte überprüfe deine Eingabe!</div>
                    </div>
                    <div className="col-10">
                        <label htmlFor="city" className="form-label">Stadt*</label>
                        <input onChange={handleInputChange} pattern="^[\u00c0-\u00deA-Z'\-][ \u00c0-\u01ffa-zA-Z'\-]+$" value={addressData.town} className="form-control" type="text" placeholder="Stuckenborstel" id="city" name="town" required/>
                        <div className="invalid-feedback">Bitte überprüfe deine Eingabe und achte auf Groß- und Kleinschreibung</div>
                    </div>
                </div>
                <br/>
                <label htmlFor="state" className="form-label">Bundesland*</label>
                <input onChange={handleInputChange} pattern="^[\u00c0-\u00deA-Z'\-][ \u00c0-\u01ffa-zA-Z'\-]+$" value={addressData.federalState} className="form-control" type="text" placeholder="Niedersachsen" id="state" name="federalState" required/>
                <div className="invalid-feedback">Bitte überprüfe deine Eingabe und achte auf Groß- und Kleinschreibung</div>
                <br/>
                <label htmlFor="country" pattern="^[\u00c0-\u00deA-Z'\-][ \u00c0-\u01ffa-zA-Z'\-]+$" className="form-label">Land*</label>
                <input onChange={handleInputChange} value={addressData.country} className="form-control" type="text" placeholder="Deutschland" id="country" name="country" required/>
                <div className="invalid-feedback">Bitte überprüfe deine Eingabe und achte auf Groß- und Kleinschreibung</div>
                <br/>
            </form>
            <label htmlFor="email" className="form-label">E-Mail</label>
            <input onChange={handleInputChange} value={addressData.email} className="form-control" type="text" placeholder="info@example.com" name="email" id="email"/>
            <br/>
            <label htmlFor="misc" className="form-label">Sonstiges</label>
            <input onChange={handleInputChange} value={addressData.further} className="form-control" type="text" id="further" name="further"/>
            <br/>
            {invalidAddressWarning}
            <button onClick={attemptSending} className="btn btn-primary btn-lg" type="submit">Senden</button>
            <button onClick={ () => history.goBack() } className="btn btn-secondary btn-lg m-2">Abbrechen</button>
        </div>
    );
};

export default AddAddress;