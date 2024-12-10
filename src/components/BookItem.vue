<script>
import { store } from '@/store';

export default {
    props: {
        book: {
            type: Object,
            required: true,
        },
    },
    methods: {
        remove() {
            this.$emit('removeBook', this.book.id)
        }
    },
    computed: {
        modules() {
            return store.state.modules
        }
    }
}
</script>

<template>
    <div>
        <h2>Id: {{ book.id }}</h2>
        <p>Modulo: {{ modules.find(module => module.code === book.moduleCode).cliteral }}</p>
        <p>Editorial: {{ book.publisher }}</p>
        <p>Precio: {{ book.price }}€</p>
        <p>Páginas: {{ book.pages }}</p>
        <p>Estado: {{ book.status }}</p>
        <p>{{ book.soldDate ? "Vendido el " + book.soldDate : "En venta" }}</p>
        <p>Comentarios: {{ book.comments }}</p>

        <button @click="add" class="add">
            <span class="material-icons">add_shopping_cart</span>
        </button>
        <button @click="edit" class="edit">
            <span class="material-icons">edit</span>
        </button>
        <button @click="remove" class="delete">
            <span class="material-icons">delete</span>
        </button>
    </div>

</template>