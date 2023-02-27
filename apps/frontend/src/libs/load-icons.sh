#!/bin/bash

BASE_DIR=./src/libs
SCRIPT_NAME=getAvailableIcons

SCRIPT_FILE=${BASE_DIR}/${SCRIPT_NAME}.ts
GENERATED_JS=${BASE_DIR}/${SCRIPT_NAME}.js
CONVERTED_CJS=${BASE_DIR}/${SCRIPT_NAME}.cjs
OUTPUT_FILE=${BASE_DIR}/types/icons.type.ts

# transpile...
tsc $SCRIPT_FILE &&
 # rename...
 cp $GENERATED_JS $CONVERTED_CJS &&
  # run..
  node $CONVERTED_CJS &&
   # clean...
   rm $GENERATED_JS && rm $CONVERTED_CJS &&
     # format...
    npx eslint $OUTPUT_FILE --fix
