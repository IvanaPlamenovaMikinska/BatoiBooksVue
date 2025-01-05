<script>
import { mapActions, mapState } from 'pinia';
import { useDataStore } from '../stores/store'
import BookItem from './BookItem.vue';
export default {
    components: {
        BookItem,
    },
    computed: {
        ...mapState(useDataStore, {
            books: 'books',
            cart: 'cart',
        })
    },
    methods: {
        ...mapActions(useDataStore, ['removeBook', 'addToCart']),
        edit(id) {
            this.$router.push({ name: 'form', params: { id: id } })
        },
        add(book) {
            this.addToCart(book)
        },

        booksInCart(book) {
           return !this.cart.find(libro => libro.id === book.id)
        },
        
    },
}
</script>

<template>
    <h1>Libros</h1>
    <h2>Total de libros: {{ books.length }}</h2>
    <div id="list" class="books-container">
        <BookItem v-for="book in books" :book="book">
            <button v-if="booksInCart(book)" @click="add(book)" class="add">
                <span class="material-icons">add_shopping_cart</span>
            </button>
            <button @click="edit(book.id)" class="edit">
                <span class="material-icons">edit</span>
            </button>
            <button @click="removeBook(book.id)" class="delete">
                <span class="material-icons">delete</span>
            </button>
        </BookItem>
    </div>
</template>

<style scoped>
.error {
    color: red;
}
</style>