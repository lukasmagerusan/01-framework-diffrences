<template>
  <div id="app">
    <h1>{{title}}</h1>
    <form @submit.prevent="search()">
        <label>Suche nach einem Bild</label>
        <input v-model="searchTerm" class="u-full-width" type="text">
        <button type="submit">Suche</button>
    </form>
    <img v-if="loading" src="https://media3.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif">
    <section class="images">
      <img v-for="image in images" :src="image.urls.regular" :key="image.id"/>
    </section>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      title: "vue-image-search",
      searchTerm: "",
      images: [],
      loading: false
    }
  },
  methods: {
    search(){
      this.loading = true;
      this.images = [];
      return fetch(`https://api.unsplash.com/search/photos?page=1&query=${this.searchTerm}&client_id=84sHIaQrR9rSmxJKVr4c1O2orNTm00OeANCnpZ-Yta0`)
      .then(response => response.json())
      .then(result => { this.images = result.results, this.loading = false })
    }
  }
}
</script>

<style>
body {
  width: 80%;
  margin: 2em auto 0 auto;
}
img {
  width: 100%;
}
.images {
  column-count: 3;
}
</style>
