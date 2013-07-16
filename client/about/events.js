/**
 * Semat Essence Accelerator
 * Copyright (C) 2013 Daniel Graziotin. All Rights Reserved.
 * Licensed under the BSD 3-Clause. See the LICENSE File for details.
 */

/**
 * Display a Lightbox with the About page as content
 */
Template.about.rendered = function() {
    $('.clickable').colorbox({
        inline: true,
        width: '80%',
        height: '80%',
        scrolling: true
    });
};