<template>
  <main class="flex-column outer-container">
    <Header subtitle="Create account" />

    <form class="container form flex-column" @submit="handleSubmit">
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

    <router-link to="/" exact>Go back</router-link>
  </main>
</template>

<script>
  import * as firebase from 'firebase';
  import Header from '../components/Header';

  export default {
    name: 'NewAccount',
    props: {},
    components: {
      Header,
    },
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
            console.error(error);
            alert(error.message);
          });
      }
    }
  }
</script>

<style scoped>
  main {
    text-align: center;
  }

  button {
    margin-top: 8px;
  }

  a {
    display: block;
    margin-top: 32px;
  }
</style>
