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
var topbtn = document.getElementById("totop-btn");
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        topbtn.style.display = "block";
    } else {
        topbtn.style.display = "none";
    }
    console.log(document.body.scrollTop);
}

function toTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}