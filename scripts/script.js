function goBack() {
    window.history.back();
}

function setURL(the_id) {
    localStorage.setItem("page", "/toolbox/"+the_id) + "/";
}
function setName(the_id) {
    localStorage.setItem("name", the_id);
}


//stuff for prev/next buttons
var lessonsBio = [];
var lessonsChem = []