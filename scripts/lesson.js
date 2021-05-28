//scroll indicator
document.addEventListener(
    "scroll",
    function () {
        const scrollTop = document.documentElement["scrollTop"] || document.body["scrollTop"];
        const scrollBottom = (document.documentElement["scrollHeight"] || document.body["scrollHeight"]) -
            document.documentElement.clientHeight;
        scrollPercent = scrollTop / scrollBottom * 100 + "%";
        document.getElementById("progress-indicator").style.setProperty("--scroll", scrollPercent);
    }, {
        passive: true
    }
);

// fix sticky lesson navbar
var html = document.documentElement;
html.style.overflow = "unset";

var body = document.body;
body.style.overflowY = "scroll";
body.style.scrollBehavior = "unset";


// to top button
// var topbtn = document.getElementById("totop-btn");
var row = document.getElementsByClassName('container-fluid')[0].querySelector('.row');
var topbtn = document.createElement('button');
topbtn.classList = "btn yellow-btn mobile";
topbtn.id = 'totop-btn';
topbtn.title = 'Go to top';
topbtn.onclick = function() {toTop();};
topbtn.innerHTML = '<i class="fas fa-angle-double-up"></i>';
row.appendChild(topbtn);

/* window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        topbtn.style.display = "block";
    } else {
        topbtn.style.display = "none";
    }
    console.log(document.body.scrollTop);
} 
NOT WORKING^^^^ */

function toTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}