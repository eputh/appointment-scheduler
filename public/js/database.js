/**
 * Created by Emily on 3/15/2017.
 */


// Get a reference to the database service
var database = firebase.database();

//TODO: Only allow for submit buttons to go through if all the required fields are filled
// TODO: When the button is of "submit" type, find a way for the onclick function to run before
// TODO: the page refreshes
function addContact(first_name, last_name, role, relationship, address, phone) {
    var name = last_name != "" ? last_name+ ", "+first_name : first_name;
    var group = relationship != "" ? relationship : "other";
    firebase.database().ref('contacts/' + name).set({
        role: role,
        group: group,
        location: address,
        phone: phone
    });
    close_contact_form();
}

function readContacts() {
    var orderedContacts = firebase.database().ref('contacts/').orderByKey(),
        ul = document.getElementById('contacts-list');
    orderedContacts.on("value", function(snapshot) {
        snapshot.forEach(function(data) {
            var li = createContactListItem(data.val().group, data.key, data.val().phone, data.val().location, data.val().role);
            ul.appendChild(li);
        });
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });
}

function addAppointment(name, contact, date_and_time, further_notes) {
    date_and_time = date_and_time.replace(/\//g, "-").replace(/\s+/g, '');
    var date = date_and_time.substr(0,10),
        time = date_and_time.substr(10,date_and_time.length),
        apptId = generateApptId();
    firebase.database().ref('events/' + apptId).set({
        name: name,
        contact: contact,
        date : date,
        time: time,
        notes : further_notes
    });
}
// Creates the autocomplete datalist for family members (those the appointments are for)
function getMemberSuggestions() {
    var orderedContacts = firebase.database().ref('contacts/').orderByKey(),
        datalist = document.getElementById('name');
    orderedContacts.on("value", function(snapshot) {
        snapshot.forEach(function(data) {
            if (data.val().group == "family") {
                var option = document.createElement("option");
                option.setAttribute("value", data.key);
                datalist.appendChild(option);
            }
        });
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });
}
// Creates the autocomplete datalist for people to make appointments with
function getContactSuggestions() {
    var orderedContacts = firebase.database().ref('contacts/').orderByKey(),
        datalist = document.getElementById('contact');
    orderedContacts.on("value", function(snapshot) {
        snapshot.forEach(function(data) {
            if (data.val().group != "family") {
                var option = document.createElement("option");
                option.setAttribute("value", data.key);
                datalist.appendChild(option);
            }
        });
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });
}

function generateApptId() {
    var apptId = "",
        chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for( var i=0; i < 10; i++ )
        apptId += chars.charAt(Math.floor(Math.random() * chars.length));

    return apptId;
}

