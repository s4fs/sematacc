How to run Tests
================

As of July 2013, Meteor does not provide an official testing method. While this is understandable
(Meteor latest release is v0.6.4, indicating how it is still new and immature), 
testing is beneficial for the stability of a software.

[Laika](http://arunoda.github.io/laika/) is a project to create rich tests, which are able to emulate client/server
operability. It is a 3rd party, non-official tool and - like Meteor - it is still in its infancy.
Unlike SematAcc (server and client), Laika is not able to run on Windows. Therefore, the tests can only be run where
Laika can be installed - either on GNU/Linux or Mac OS X.

As [Laika installation](http://arunoda.github.io/laika/getting-started.html) is not straightforward, we wrote 
more detailed and easier [instructions to properly install Laika on Ubuntu 13.04](http://task3.cc/1880/how-to-use-laika-testing-framework-for-meteor-on-ubuntu-13-04/).

Another tutorial (screencast) [is available for OS X](www.discovermeteor.com/2013/06/06/testing-meteor-apps-with-laika/)

After proper installation of Laika, the tests should be run from _within SematAcc project root_, with:

    laika -t 5000

Some notes:
- The -t option specifies a timeout in ms. If timeout errors appear, try to higher it to 7000-10000.
- The test need memory and rapid disk I/O operations. Tests from Virtual Machines sometimes fail because of timeouts.
- Sometimes, the externally installed MongoDB remains dirty if the tests fails. Delete the contents of /data/db to clean it.
- Also, look for active Node.js and Meteor processes when the tests finish. Kill them eventually.
- Be patient :-) Laika is very new.
