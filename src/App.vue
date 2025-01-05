<script>
import { mapActions } from 'pinia';
import logoBatoi from './assets/logoBatoi.png';
import AddBook from './components/AddBook.vue';
import AppAbout from './components/AppAbout.vue';
import AppCart from './components/AppCart.vue';
import AppMenu from './components/AppMenu.vue'
import AppMessages from './components/AppMessages.vue';
import BookList from './components/BookList.vue';
import {useDataStore } from './stores/store';
export default {
  components: {
    AppMenu,
    AppMessages,
    BookList,
    AddBook,
    AppCart,
    AppAbout,
  },
  data() {
    return {
      logoBatoi,
    }
  },

  methods: {
    ...mapActions(useDataStore, ['populate']),
  },
  mounted() {
    this.populate()
  }
}
</script>

<template>
  <div>
    <img :src="logoBatoi" alt="Batoi Logo" />
    <h1>BatoiBooks</h1>
    <AppMenu></AppMenu>
    <AppMessages></AppMessages>
    <router-view></router-view>
  </div>
  <footer>Ivana - BatoiBooks</footer>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');

.books-container {
  display: flex;
  flex-wrap: wrap;
  gap: 25px;
}
</style>
