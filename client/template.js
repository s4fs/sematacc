/**
 * Semat Essence Accelerator
 * Copyright (C) 2013 Daniel Graziotin. All Rights Reserved.
 * Licensed under the BSD 3-Clause. See the LICENSE File for details.
 */

/**
 * Hack Meteor login template here. It could not go anywhere else than this file.
 */

Template.pleaseLogin.events({
    'click a#pleaselogin': function(event) {
        event.preventDefault();
        var loginButtonsSession = Accounts._loginButtonsSession;
        loginButtonsSession.set('dropdownVisible', true);
        Meteor.flush();
        correctDropdownZIndexes();
    }
});

/**
 * Copied from Meteor login system.
 */
var correctDropdownZIndexes = function() {
    // IE <= 7 has a z-index bug that means we can't just give the
    // dropdown a z-index and expect it to stack above the rest of
    // the page even if nothing else has a z-index.  The nature of
    // the bug is that all positioned elements are considered to
    // have z-index:0 (not auto) and therefore start new stacking
    // contexts, with ties broken by page order.
    //
    // The fix, then is to give z-index:1 to all ancestors
    // of the dropdown having z-index:0.
    for (var n = document.getElementById('login-dropdown-list').parentNode; n.nodeName !== 'BODY'; n = n.parentNode)
        if (n.style.zIndex === 0) n.style.zIndex = 1;
};
