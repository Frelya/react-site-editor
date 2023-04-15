#!/bin/bash

if [ "$(pwd | awk -F/ '{print $NF}')" != "frontend" ]
then
  echo -e "\033[31mError: Please run this script from the 'apps/frontend' folder or the project root directory\033[39m \n"
  exit 1
fi

BASE_DIR=.

INTER_FILE=${BASE_DIR}/scripts/output
OUTPUT_FILE=${BASE_DIR}/src/libs/types/icons.type.ts
SCRIPT_FILE=${BASE_DIR}/scripts/modules/loadIcons.ts

REQUIRED_FILE=../../packages/functions/src/stringutils/pascalToKebab.ts

# Generate a single typescript file containing the pascalToKebab function

# Step1: add the pascalToKebab function
cat $REQUIRED_FILE > ${INTER_FILE}.ts

# Step2: add a blank line
echo >> ${INTER_FILE}.ts

# Step3: add the loadIcons script, by removing the import of
# pascalToKebab at the top of the file
tail -n +2 $SCRIPT_FILE >> ${INTER_FILE}.ts

# transpile...
tsc ${INTER_FILE}.ts &&
 # rename...
 cp ${INTER_FILE}.js ${INTER_FILE}.cjs &&
  # run..
  node ${INTER_FILE}.cjs
   # clean...
   rm ${INTER_FILE}* &&
     # format...
    npx eslint $OUTPUT_FILE --fix

echo -e "\033[32m\nIcons types definition generated successfully !\033[39m"
