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
git remote -v

git fetch upstream $UPSTREAM_BRANCH

git checkout "$DOWNSTREAM_BRANCH"

REBASE_RESULT=$(git rebase --force "upstream/$UPSTREAM_BRANCH")

if [[ $REBASE_RESULT == "Current branch main is up to date, rebase forced." ]]; then
  git push --force origin "$DOWNSTREAM_BRANCH"
fi

cd ..
rm -rf work
_train = np.array([
    
])
