#!/usr/bin/env bash

set -x

UPSTREAM_REPO="https://github.com/${UPSTREAM_USER}/${UPSTREAM_REPO_NAME}.git"
UPSTREAM_BRANCH="main"
DOWNSTREAM_BRANCH="main"

echo "UPSTREAM_REPO=$UPSTREAM_REPO"

git clone "https://github.com/${GITHUB_REPOSITORY}.git" work
cd work || { echo "Missing work dir" && exit 2 ; }

git config user.name "${UPSTREAM_USER}"
git config user.email "${UPSTREAM_USER}@users.noreply.github.com"
git remote set-url origin "https://x-access-token:${GITHUB_TOKEN}@github.com/${GITHUB_REPOSITORY}.git"

git remote set-url origin "https://${UPSTREAM_USER}:${GITHUB_TOKEN}@github.com/${GITHUB_REPOSITORY_URL}"
git remote add upstream "$UPSTREAM_REPO"
git fetch upstream 
git remote -v

git checkout "$DOWNSTREAM_BRANCH"

REBASE_RESULT=$(git rebase "upstream/$UPSTREAM_BRANCH")

if [[ $REBASE_RESULT != *"Already up to date."* ]]; then
  git commit -m "Rebased upstream"  
  git push origin "$DOWNSTREAM_BRANCH"
fi

cd ..
rm -rf work
