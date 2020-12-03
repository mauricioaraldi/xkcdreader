<template>
  <header class="container">
    <h1>XKCD Reader</h1>
    <h3 v-if="subtitle">{{ subtitle }}</h3>
  </header>
</template>

<script>
  export default {
    name: 'Header',
    props: {
      subtitle: String,
    },
  }
</script>

<style scoped>
  header {
    box-sizing: border-box;
    margin: 8px 0;
    padding: 8px;
    text-align: center;
    width: 100%;
  }
</style>
