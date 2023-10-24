#!/bin/bash

NEW_TITLE="API Documentation"

echo "Re-titling documentation website..."

sed -i "s/<title>.*<\/title>/<title>$NEW_TITLE<\/title>/g" docs/index.html

echo "Done!"
