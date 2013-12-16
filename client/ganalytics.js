/**
 * Semat Essence Accelerator
 * Copyright (C) 2013 Daniel Graziotin. All Rights Reserved.
 * Licensed under the BSD 3-Clause. See the LICENSE File for details.
 */

/**
 * Render Google Analytics template
 */
Template.analytics.created = function() {
    var ganalytics = ''; // 'UA-5685155-8'
    if (ganalytics === '') return;

    if (!window._gaq) window._gaq = [];

    _gaq.push(['_setAccount', ganalytics]);
    _gaq.push(['_trackPageview']);

    (function() {
        var ga = document.createElement('script');
        ga.type = 'text/javascript';
        ga.async = true;
        ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(ga, s);
    })();
};
