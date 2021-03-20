#!/bin/bash
# run from in the parent directory

docker run -v `pwd`/client/src/_designsystem:/usr/app -it conf_designsystem /bin/bash
