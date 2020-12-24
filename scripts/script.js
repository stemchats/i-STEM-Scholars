

function goBack() {
    window.history.back();
}

function setURL(the_id) {
    localStorage.setItem("page", "/toolbox/"+the_id) + "/";
}
function setName(the_id) {
    localStorage.setItem("name", the_id);
}



// Firebase Email Authentication

// Register a new user
firebase.auth().createUserWithEmailAndPassword(email, password)
 .catch(function (err) {
   // Handle errors
 });

// Sign in existing user
firebase.auth().signInWithEmailAndPassword(email, password)
 .catch(function(err) {
   // Handle errors
 });

// Sign out user
firebase.auth().signOut()
 .catch(function (err) {
   // Handle errors
 });

 function signUp(){
  
    var email = document.getElementById("InputEmail");
    var password = document.getElementById("InputPassword");

    const promise = firebase.auth().createUserWithEmailAndPassword(email.value, password.value);
    //promise.catch(e => alert(e.message));

    
}

// More Login Stuff
function login(){

    var email = document.getElementById("InputEmail");
    var password = document.getElementById("InputPassword");

    const promise = firebase.auth().signInWithEmailAndPassword(email.value, password.value);
    promise.catch(e => alert(e.message));

}

 firebase.auth().onAuthStateChanged(function(user){

    if(user){

        var email = user.email;
        //alert("Active User " + email);

        hideSignup();
        showContent();
        //Take user to a different or home page

        //is signed in

    }else{
        hideContent();
        //alert("No Active User");
        //no user is signed in
    }


// "Popup" Code
function hideContent(){
    document.getElementById('wrapper').style = "display: none";
}

function showContent(){
     document.getElementById('wrapper').style = "display: block";
}

function hideSignup(){
    document.getElementById('form-wrapper').style = "display:none";
}

function showSignup(){
    document.getElementById('form-wrapper').style = "display:block";
}



