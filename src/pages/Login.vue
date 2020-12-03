<template>
  <main class="flex-column outer-container">
    <Header />

    <form class="container form flex-column" @submit="handleSubmit">
      <label>
        <span>Email</span>
        <input type="text" v-model="email" />
      </label>

      <label>
        <span>Password</span>
        <input type="password" v-model="password" />
      </label>

      <button>Enter</button>
    </form>

    <router-link to="/newAccount" exact>Create new account</router-link>
  </main>
</template>

<script>
  import * as firebase from 'firebase';
  import Header from '../components/Header';

  export default {
    name: 'Login',
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

        firebase.auth()
          .signInWithEmailAndPassword(this.email, this.password)
          .then(value => {
            if (!value.user || value.user.isAnonymous) {
              throw new Error('User not found');
            }

            this.$router.push('/home');
          })
          .catch(error => {
            console.error(error);
          })
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
