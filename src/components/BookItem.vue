<script>
import { useDataStore } from '../stores/store';
import { mapActions, mapState } from 'pinia';


export default {
    props: {
        book: {
            type: Object,
            required: true,
        },
    },
    computed: {
        ...mapState(useDataStore, {
            modules: 'modules',
            modulesName: 'modulesName',
        })
    }
}
</script>

<template>
    <div>
        <h2>Id: {{ book.id }}</h2>
        <p>Modulo: {{ modulesName(book.moduleCode) }}</p>
        <p>Editorial: {{ book.publisher }}</p>
        <p>Precio: {{ book.price }}€</p>
        <p>Páginas: {{ book.pages }}</p>
        <p>Estado: {{ book.status }}</p>
        <p>{{ book.soldDate ? "Vendido el " + book.soldDate : "En venta" }}</p>
        <p>Comentarios: {{ book.comments }}</p>
        <slot></slot>
    </div>

</template>