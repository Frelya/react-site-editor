#!/usr/bin/env bash
set -e

SCRIPT_DIR=$(cd ${0%/*} && pwd -P)

# Known variables
SRC='./src'
DST='./dist'
name="rse"
input="./${SRC}/index.ts"

# Find executables
esbuild=$(npx esbuild)
tsc=$(npx tsc)
resolver="${SCRIPT_DIR}/modules/resolve-files.js"
rewriteImports="${SCRIPT_DIR}/modules/rewrite-imports.js"
rewriteStyles="${SCRIPT_DIR}/modules/rewrite-styles.cjs"

# Setup shared options for esbuild
echo Setup shared options for esbuild...
sharedOptions=()
sharedOptions+=("--platform=browser")
sharedOptions+=("--target=es2017")

# Generate actual builds
# ESM
# chmod +x $resolver
resolverOptions=()
resolverOptions+=($SRC)
resolverOptions+=('/**/*.{ts,tsx,css}')
resolverOptions+=('--ignore=.test.,__mocks__')
INPUT_FILES=$(node $resolver ${resolverOptions[@]})

echo Execute script for esm..

NODE_ENV=production  npx esbuild $INPUT_FILES --format=esm --outdir=$DST               --outbase=$SRC --minify --pure:React.createElement --define:process.env.TEST_BYPASS_TRACKED_POINTER="false" --define:__DEV__="false" ${sharedOptions[@]} &
NODE_ENV=production  npx esbuild $input       --format=esm --outfile=$DST/$name.esm.js --outbase=$SRC --minify --pure:React.createElement --define:process.env.TEST_BYPASS_TRACKED_POINTER="false" --define:__DEV__="false" ${sharedOptions[@]} &

echo Execute script for cjs..

# Common JS
NODE_ENV=production  npx esbuild $input --format=cjs --outfile=$DST/$name.prod.cjs --minify --bundle --pure:React.createElement --define:process.env.TEST_BYPASS_TRACKED_POINTER="false" --define:__DEV__="false" ${sharedOptions[@]} $@ &
NODE_ENV=development npx esbuild $input --format=cjs --outfile=$DST/$name.dev.cjs           --bundle --pure:React.createElement --define:process.env.TEST_BYPASS_TRACKED_POINTER="false" --define:__DEV__="true" ${sharedOptions[@]} $@ &

echo Generate types...

# Generate types
tsc -d true -p ./tsconfig.json --outDir $DST &

# Copy build files over
cp -rf ./build/ $DST

# Wait for all the scripts to finish
wait


# Rewrite ESM imports 😤
# echo Rewrite import...
# node $rewriteImports "$DST" '/**/*.js'
# node $rewriteImports "$DST" '/**/*.d.ts'

node $rewriteStyles 

# Remove test related files
# node $rewriteImports "$DST" 

rm -rf `node $resolver "$DST" '/**/*component.d.ts'`
rm -rf `node $resolver "$DST" '/**/*.{test,__mocks__,}.*'`
rm -rf `node $resolver "$DST" '/**/test-utils/*'`
