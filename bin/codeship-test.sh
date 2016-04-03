#!/bin/bash

echo "Testing branch: ${CI_BRANCH}"

echo "Installing global dependencies"
npm install -g web-component-tester@v3.1.7
#make sure wct-sauce plugin works with old version of wct
npm install -g wct-sauce@1.6.0
export NPM_ROOT=$(npm root -g)
cp -r $NPM_ROOT/wct-sauce $NPM_ROOT/web-component-tester/node_modules

echo "Pulling uqlibrary-elements"
git clone -b ${CI_BRANCH} --single-branch https://github.com/uqlibrary/uqlibrary-elements ../uqlibrary-elements
chmod 755 ../uqlibrary-elements/bin/*.sh

echo "Running tests on Elements and Research"
cd ../uqlibrary-elements
./bin/elements_local_tests.sh
cd ../uqlibrary-research
../uqlibrary-elements/bin/sauce.sh