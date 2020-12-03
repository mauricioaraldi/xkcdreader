<template>
  <main>
    <h1>XKCD Reader</h1>

    <template v-if="loading">Loading!</template>

    <template v-else>
      Comic
      <input v-model="currentComic" type="number" />
      <img v-bind:src="comicInfo.img" />
      <button @click="favorite(currentComic, true)">{{ this.favorites.has(parseInt(this.currentComic)) ? 'Unfavorite' : 'Favorite' }}</button>
    </template>

    <div v-if="autoFavoriteComicInfo">
      <h2>Auto Favorite</h2>
      Each
      <input v-model="autoFavoriteInterval" type="number" min=10 />
      seconds

      <p v-show="loadingAutoFavorite">Loading auto favorite</p>

      <img v-show="!loadingAutoFavorite" @load="loadingAutoFavorite = false" v-bind:src="autoFavoriteComicInfo.img" />
    </div>
  </main>
</template>

<script>
  import * as firebase from 'firebase';

  export default {
    name: 'Home',
    props: {},
    data() {
      const autoFavoriteInterval = 60;
      const favoriteTimer = setInterval(this.getAutoFavoriteImage, autoFavoriteInterval * 1000);

      return {
        autoFavoriteInterval,
        favoriteTimer,
        autoFavoriteComicInfo: {},
        comicInfo: {},
        currentComic: 0,
        favorites: new Set(),
        latestComicNumber: 2393,
        loadingAutoFavorite: false,
        loading: true,
        userUid: '',
      };
    },
    watch: {
      /**
       * When current comic number changes, fetches it's info, and saves the last seen comic number
       */
      currentComic() {
        this.loading = true;

        this.getComic(this.currentComic)
          .then(data => {
            this.comicInfo = data;
          })
          .finally(() => {
            this.loading = false;
          });

        firebase
          .firestore()
          .doc(`users/${this.userUid}`)
          .update({ lastSeenComic: this.currentComic })
      },

      /**
       * When autoFavorite interval in seconds change, recreate the interval that fetches the info
       */
      autoFavoriteInterval() {
        console.log(11111, this.autoFavoriteInterval)
        clearInterval(this.favoriteTimer);

        if (this.autoFavoriteInterval < 10) {
          this.autoFavoriteInterval = 10;
        }

        this.favoriteTimer = setInterval(this.getAutoFavoriteImage, this.autoFavoriteInterval * 1000);
      }
    },
    /**
     * Upon creating component, gets user info and last comic number
     */
    created() {
      const userUid = firebase.auth().currentUser.uid;

      firebase
        .firestore()
        .doc(`users/${userUid}`)
        .get()
        .then(userDoc => {
          const userData = userDoc.data();

          this.currentComic = userData.lastSeenComic;
          this.favorites = new Set(userData.favorites);
          this.loading = false;
          this.userUid = userUid;

          return this.getComic();
        })
        .then(data => {
          this.latestComicNumber = data.num;
        });
    },
    methods: {
      /**
       * Fetches a comic from the server
       *
       * @param {Number} comicNumber Which comic to fetch
       * @return {ComicData} The data of the comic
       */
      getComic(comicNumber = '') {
        return new Promise((resolve, reject) => {
          fetch(
            `http://localhost:5678/${comicNumber}`,
            {
              method: 'GET',
              headers: new Headers({
                'Content-type': 'application/json',
              }),
            },
          )
          .then(data => data.json())
          .then(data => resolve(data))
          .catch(error => reject(error));
        })
      },

      /**
       * Mark a comic as favorite
       * @param {Number} comicNumber Which comic to mark as favorite
       */
      favorite(comicNumber, showLoading) {
        if (showLoading) {
          this.loading = true;
        }

        let undo;

        if (this.favorites.has(parseInt(comicNumber))) {
          this.favorites.delete(parseInt(comicNumber));
          undo = this.favorites.add;
        } else {
          this.favorites.add(parseInt(comicNumber));
          undo = this.favorites.delete;
        }

        firebase
          .firestore()
          .doc(`users/${this.userUid}`)
          .update({ favorites: Array.from(this.favorites) })
          .catch(() => undo(parseInt(comicNumber)))
          .finally(() => {
            if (this.loading) {
              this.loading = false;
            }
          })
      },

      /**
       * Gets an image for the autoFavorite function, and marks it as favorite
       */
      getAutoFavoriteImage() {
        this.loadingAutoFavorite = true;

        const initialRandomNumber = Math.floor(Math.random() * this.latestComicNumber + 1);
        let shouldRetry = false;
        let randomComicNumber = initialRandomNumber;

        while (this.favorites.has(randomComicNumber)) {
          if (shouldRetry && randomComicNumber === initialRandomNumber) {
            randomComicNumber = 0;
            break;
          }

          shouldRetry = true;

          if (randomComicNumber === this.latestComicNumber) {
            randomComicNumber = 1;
          } else {
            randomComicNumber++;
          }
        }

        if (randomComicNumber === 0) {
          alert('All comics favorited!');
          clearInterval(this.favoriteTimer);
          this.loadingAutoFavorite = false;
          this.autoFavoriteComicInfo = null;
          return;
        }

        this.getComic(randomComicNumber)
          .then(data => {
            this.autoFavoriteComicInfo = data;
            this.favorite(data.num);
          })
          .catch(error => {
            console.error(error);
            this.loadingAutoFavorite = false;
          })
      },
    },
  }
</script>

<style scoped>
</style>
