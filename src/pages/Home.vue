<template>
  <main>
    <h1>XKCD Reader</h1>

    <template v-if="loading">Loading!</template>

    <template v-else>
      Comic
      <input v-model="currentComic" type="number" />
      <img v-bind:src="comicInfo.img" />
    </template>
  </main>
</template>

<script>
  import * as firebase from 'firebase';

  export default {
    name: 'Home',
    props: {},
    data() {
      return {
        comicInfo: {},
        currentComic: 0,
        loading: true
      };
    },
    watch: {
      currentComic: function() {
        this.loading = true;

        fetch(
          `http://localhost:5678/${this.currentComic}`,
          {
            method: 'GET',
            headers: new Headers({
              'Content-type': 'application/json',
            }),
          },
        )
        .then(data => data.json())
        .then(data => {
          this.comicInfo = data;
        })
        .finally(() => {
          this.loading = false;
        });
      },
    },
    created() {
      const userUid = firebase.auth().currentUser.uid;

      firebase
        .firestore()
        .doc(`users/${userUid}`)
        .get()
        .then(userDoc => {
          const userData = userDoc.data();

          this.currentComic = userData.lastSeenComic;
          this.loading = false;
        });
    },
    methods: {},
  }
</script>

<style scoped>
</style>
