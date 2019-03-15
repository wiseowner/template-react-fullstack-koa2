#!/usr/bin/env bash

#TARNAME="apidoc.tar.gz"
ssh root@x.x.x.x "cd /data/www; rm -rf bench-apidoc; "

#tar -zcvf ./doc/$TARNAME .doc/apidoc
scp -r ./doc/apidoc root@x.x.x.x:/data/www/bench-apidoc

