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
