if [ "$(pwd | awk -F/ '{print $NF}')" != "ui" ]
then
  echo -e "\033[31mError: Please run this script from the 'packages/ui' folder or the project root directory\033[39m"
  exit 1
fi

base_dir=.
inter_file=${base_dir}/scripts/output
script_file=${base_dir}/scripts/modules/exposeComponents.ts

required_file=${base_dir}/libs/prettier.ts

# Generate a single typescript file containing the prettier function

# Step1: add the prettier function
cat $required_file > ${inter_file}.ts

# Step2: add a blank line
echo >> ${inter_file}.ts

# Step3: add the createComponent script, by removing the import of
# prettier at the top of the file
tail -n +2 $script_file >> ${inter_file}.ts

# transpile and rename
tsc ${inter_file}.ts && cp ${inter_file}.js ${inter_file}.cjs

# run..
if node ${inter_file}.cjs;
then
  printf "\033[32m\nComponents exposed successfully\n\033[39m"
  # clean up
  rm ${inter_file}*
else
  printf "\033[31m\nError: Components exposition failed\n\033[39m"
  # clean up anyway and exit with error
  rm ${inter_file}* && exit 1
fi
