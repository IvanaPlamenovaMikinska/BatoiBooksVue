<script>
import { mapActions, mapState } from 'pinia';
import BookItem from './BookItem.vue';
import { useDataStore } from '@/stores/store';

export default {
   components: {
      BookItem
   },

   computed: {
      ...mapState(useDataStore, {
         cart: 'cart',
      }),
      totalOfBooks() {
         return this.cart.reduce((total, book) => total + book.price, 0)
      }
   },

   methods: {
      ...mapActions(useDataStore, ['removeFromCard', 'comprarLibros', 'vaciarCarrito']),
   }
}
</script>

<template>
   <h1>Carrito</h1>
   <h2>Total de libros: {{ cart.length }}</h2>
   <div id="cart" class="books-container">
      <BookItem v-for="book in cart" :key="book.id" :book="book">
         <button @click="removeFromCard(book)" class="removeFromCard">
            <span class="material-icons">remove_shopping_cart</span>
         </button>
      </BookItem>
   </div>
   <h3>Importe total: {{ totalOfBooks }} €</h3>
   <button @click="comprarLibros">Comprar Libros</button>
   <button @click="vaciarCarrito">Vaciar Carrito</button>
</template>