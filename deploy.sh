#!/bin/bash

if [ "$TRAVIS_BRANCH" == "development" ]; then
  yarn add global firebase-tools;
  unset CI;
  yarn build;
  firebase deploy --token $FIREBASE_TOKEN;
fi
