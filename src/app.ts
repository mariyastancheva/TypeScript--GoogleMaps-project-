import axios from "axios";
// import google from "googlemaps"
const form = document.querySelector("form")!;
const addressInput = document.getElementById("address")! as HTMLInputElement;
const GOOGLE_API_KEY = "AIzaSyA5Wb7VfEFHPpwDc2-W3EUPvTKvzINeae0";
// declare var google:any;

type GoogleGeocodingResponse = {
    results:{geometry:{location:{lat:number;lng:number}}}[],
    status:"OK"|"ZERO_RESULTS"
};

function handleSubmit(event:Event){
    event.preventDefault();
    const enteredAddress = addressInput.value;

    //send to google api
    axios.get<GoogleGeocodingResponse>(`https://maps.googleapis.com/maps/api/geocode/json?address=
    ${encodeURI(enteredAddress)}&key=${GOOGLE_API_KEY}`)
    .then(response=>{
        if(response.data.status!="OK"){
            throw new Error("Could not fetch location");
        }
        console.log("ww");
        const coordinates = response.data.results[0].geometry.location;
        const map = new google.maps.Map(document.getElementById('map')!, {
            center: coordinates,
            zoom: 16
        });
        new google.maps.Marker({position: coordinates, map: map});
    })
    .catch(err=>{
        alert(err.message);
        console.log(err);
    });
}

form.addEventListener("submit", handleSubmit);