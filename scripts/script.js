const db = firebase.firestore();
const auth = firebase.auth();

function goBack() {
    window.history.back();
}

function setURL(the_id) {
    localStorage.setItem("page", "/toolbox/"+the_id) + "/";
}
function setName(the_id) {
    localStorage.setItem("name", the_id);
}
