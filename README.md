# XKCD Reader

A XKCD (webcomic) reader, to display VueJS abilities.

Currently the app can be accessed in https://xkcd-reader-6f9fc.web.app

## Disclaimer
This project is licensed under GNU General Public License 3. See LICENSE file for more informations.

No results are guaranteed. Use this software at your own risk.

## How to run the project
Run `npm run serve`;

## Deploying

### Front-end
The VUEjs deploys to firebase hosting. Run `npm run deploy` and it's done!;

### Back-end
The NodeJS proxy is being automatically deployed to Heroku when anything is pushed to master;

## Improvements

1. Firestore rules need to be more strict;
2. Use some Functions service for proxy (e.g.: Azure Functions, Firebase Functions). For now Heroku is being used for pricing reasons (it's free);
3. Apply Server-side caching (saving files in Firebase Storage and serving them from there) as a second-layer cache;
4. Improve visuals;