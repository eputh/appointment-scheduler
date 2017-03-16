/**
 * Created by Emily on 3/15/2017.
 */
// Set the configuration for your app
var config = {
    apiKey: "apiKey",
    authDomain: "appt-f3a67.firebaseapp.com/",
    databaseURL: "https://appt-f3a67.firebaseio.com/",
    storageBucket: "bucket.appspot.com"
};
firebase.initializeApp(config);

// Get a reference to the database service
var database = firebase.database();


function addAppointment(name, contact, date_time, further_notes) {
    firebase.database().ref('event/' + name).set({
        name: name,
        contact: contact,
        datetime : date_time,
        notes : further_notes
    });
}

function addContact(name, role, address, phone) {
    
}