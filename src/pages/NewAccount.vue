<template>
  <div>
    <h1>XKCD Reader - Create account</h1>

    <form @submit="handleSubmit">
      <label>
        <span>Email</span>
        <input type="text" v-model="email" />
      </label>

      <label>
        <span>Password</span>
        <input type="password" v-model="password" />
      </label>

      <button>Create</button>
    </form>
  </div>
</template>

<script>
  import * as firebase from 'firebase'

  export default {
    name: 'NewAccount',
    props: {},
    data() {
      return {
        email: '',
        password: '',
      };
    },
    methods: {
      handleSubmit(ev) {
        ev.preventDefault();

        const auth = firebase.auth();

        auth
          .createUserWithEmailAndPassword(this.email, this.password)
          .then(createdUser => {
            firebase.firestore().collection('users').doc(createdUser.user.uid).set({
              favorites: [],
              lastSeenComic: 1,
            })
          })
          .then(() => {
            return auth.signInWithEmailAndPassword(this.email, this.password);
          })
          .then(() => this.$router.push('/home'))
          .catch(error => {
            console.error(error)
          });
      }
    }
  }
</script>

<style scoped>
</style>
