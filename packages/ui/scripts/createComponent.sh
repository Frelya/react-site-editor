#!/bin/bash

if [ "$(pwd | awk -F/ '{print $NF}')" != "ui" ]
then
  echo -e "\033[31mError: Please run this script from the 'packages/ui' folder or the project root directory\033[39m \n"
  exit 1
fi

  echo -e "Wait a minute"


# Récupération du nom du composant
componentName=$1

# Récupération du nom de la categorie
categoryName=$2

BASE_DIR=.

INTER_FILE=${BASE_DIR}/scripts/output
OUTPUT_DIR=${BASE_DIR}/src/component/exposed/${componentName}
SCRIPT_FILE=${BASE_DIR}/scripts/createComponent.ts

REQUIRED_FILE=libs/prettier.ts

# Generate a single typescript file containing the prettier function

# Step1: add the prettier function
cat $REQUIRED_FILE > ${INTER_FILE}.ts

# Step2: add a blank line
echo >> ${INTER_FILE}.ts

# Step3: add the createComponent script, by removing the import of
# prettier at the top of the file
tail -n +2 $SCRIPT_FILE >> ${INTER_FILE}.ts

# transpile...
tsc ${INTER_FILE}.ts
 # rename...
 cp ${INTER_FILE}.js ${INTER_FILE}.cjs &&
   # run..
  node ${INTER_FILE}.cjs ${componentName} ${categoryName}
    # clean...
   rm ${INTER_FILE}*

