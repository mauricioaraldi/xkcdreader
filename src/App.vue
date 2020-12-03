<template>
  <div id="app" class="flex-column">
    <router-view />
  </div>
</template>

<script>
  export default {
    name: 'App',
    components: {},
  }
</script>

<style>
  @import '~normalize.css';

  body {
    background-color: #96a8c8;
  }

  #app {
    margin: auto;
    max-width: 300px;
  }

  .outer-container {
    width: 100%;
  }

  .flex-column {
    align-self: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .container {
    background-color: #ffffff;
    border: 1px solid #071419;
    border-radius: 8px;
  }

  .form {
    padding: 8px;
  }

  .form label, .form-label {
    margin: 8px 0;
  }

  .form span, .form-label span {
    display: block;
    text-align: left;
  }

  @media only screen and (min-width: 480px) {
    #app {
      max-width: 460px;
    }
  }

  @media only screen and (min-width: 620px) {
    #app {
      max-width: 600px;
    }
  }

  @media only screen and (min-width: 800px) {
    #app {
      max-width: 780px;
    }
  }
</style>
