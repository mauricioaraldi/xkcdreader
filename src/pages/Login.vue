<template>
  <div>
    <h1>XKCD Reader</h1>

    <form @submit="handleSubmit">
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
  </div>
</template>

<script>
  import { auth } from '../firebase'

  export default {
    name: 'Login',
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

        auth
          .signInWithEmailAndPassword(this.email, this.password)
          .then(value => {
            if (!value.user || value.user.isAnonymous) {
              throw new Error('User not found')
            }
          })
          .catch(error => {
            console.error(error)
          })
      }
    }
  }
</script>

<style scoped>
</style>
