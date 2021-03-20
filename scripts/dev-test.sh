#!/bin/bash
# run from in the parent directory

docker run -v `pwd`/client:/usr/app -it conf_frontendtest /bin/bash
