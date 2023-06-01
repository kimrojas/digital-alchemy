#!/bin/bash

# Colored prompt
GREEN='\033[0;32m'
BLUE='\033[0;35m'
NC='\033[0m'

echo -e """\
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

        FULL SETUP:                               
            1. Create python environment            
            2. Install DFTB+ version 21.2 (OpenMP)  
            3. Install AGOX                         

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
"""


# ----------------------------------------------------------
# SETTINGS
# APP_DIR="~/APPS"
APP_DIR="./APPS"
MAIN_DFTB_DIR="${APP_DIR}/dfbtplus"
MAIN_AGOX_DIR="${APP_DIR}/agox_stable"


DFTB_VER="22.1"
DFTB_PAR="OpenMP"
DFTB_LINK="https://github.com/dftbplus/dftbplus/releases/download/${DFTB_VER}/dftbplus-${DFTB_VER}.tar.xz"
DFTB_SRC="${MAIN_DFTB_DIR}/dftb_src-${DFTB_VER}-${DFTB_PAR}"
# https://github.com/dftbplus/dftbplus/releases/download/22.1/dftbplus-22.1.tar.xz
# https://github.com/dftbplus/dftbplus/releases/download/21.2/dftbplus-21.2.tar.xz
DFTB_CMD_DL="curl -o ${DFTB_SRC}.tar.xz -L ${DFTB_LINK}"
DFTB_CMD_TAR="tar xvf ${DFTB_SRC}.tar.xz -C ${DFTB_SRC} --strip-components=1"

# ----------------------------------------------------------


mkdir -p $DFTB_SRC
eval $(${DFTB_CMD_DL})
eval $(${DFTB_CMD_TAR})
# DFTB_CMD_TAR="tar xvf ${DFTB_SRC}.tar.xz -C ${DFTB_SRC}"





echo "STAGE 1: Create python environment"



echo "run:"








