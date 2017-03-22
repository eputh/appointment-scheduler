/**
 * Created by Emily on 3/15/2017.
 */


// // Get a reference to the database service
var database = firebase.database();


function addAppointment(name, contact, date, time, further_notes) {
    var apptId = generateApptId();
    firebase.database().ref('events/' + apptId).set({
        name: name,
        contact: contact,
        date : date,
        time: time,
        notes : further_notes
    });
}

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

function generateApptId() {
    var apptId = "",
        chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for( var i=0; i < 10; i++ )
        apptId += chars.charAt(Math.floor(Math.random() * chars.length));

    return apptId;
}

