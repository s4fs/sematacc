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

After proper installation of Laika, the tests should be run from _within SematAcc project root_, with:

    laika -t 15000

Some notes _WIP_:
- timeout 10000+
- need memory and disk I/O, beware of VMs
- clean mongodb /data/db
- kill node sometimes
- be patient :-)
