#!/usr/bin/env python3
import os
import sys

try:
    os.system("rm -rf ./book/_build/*")
except Exception as e:
    print(e)

os.system("jupyter-book build ./book")
