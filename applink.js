(function() {
    var ua = navigator.userAgent.toLowerCase();
    var t;
    var config = {
        /*scheme:必须*/
        scheme_IOS: 'xtym://',
        scheme_Adr: 'xtym://shinyway.com/',
        download_url: '$!appDownload',
        timeout: 600
    };

    function openclient() {
        var startTime = Date.now();

        var ifr = document.createElement('iframe');

        ifr.src = ua.indexOf('os') > 0 ? config.scheme_IOS : config.scheme_Adr;
        ifr.style.display = 'none';
        document.body.appendChild(ifr);

        var t = setTimeout(function() {
            var endTime = Date.now();

            if (!startTime || endTime - startTime < config.timeout + 200) {
                window.location = config.download_url;
            } else {

            }
        }, config.timeout);

        window.onblur = function() {
            clearTimeout(t);
        }
    }
    window.addEventListener("DOMContentLoaded", function() {
        document.getElementById("call-app").addEventListener('click',
            openclient, false);
    }, false);
})()