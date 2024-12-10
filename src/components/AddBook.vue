<script>
import { store } from '../store'
export default {
    name: 'AddBook',
    computed: {
        books() {
            return store.state.books
        },
        modules() {
            return store.state.modules
        }
    },
    methods: {
        addBook() {
            store.addBook(this.newBook)
            this.newBook = {}
        }
    },
    data() {
        return {
            newBook: {},
        }
    }
}
</script>

<template>
    <h1 id="form-title">Añadir Libro</h1>
    <form @submit.prevent="addBook" id="bookForm">
        <div>
            <label> Id:</label>
            <input v-model="newBook.id" type="text" id="id" disabled>
        </div>

        <div>
            <label for="id-module">Módulo:</label>
            <select v-model="newBook.moduleCode" id="id-module" required>
                <option value="" disabled selected>- Selecciona un módulo -</option>
                <option v-for="modulo in modules" :value="modulo.code">{{modulo.cliteral}}</option>
            </select>
            <span class="error"> </span>
        </div>

        <div>
            <label for="publisher">Editorial:</label>
            <input v-model="newBook.publisher" type="text" id="publisher" required>
            <span class="error"> </span>

        </div>

        <div>
            <label for="price">Precio:</label>
            <input v-model="newBook.price" type="number" id="price" required min="0" step="0.01" placeholder="0.00">
            <span class="error"> </span>

        </div>

        <div>
            <label for="pages">Páginas:</label>
            <input v-model="newBook.pages" type="number" id="pages" required min="0" step="1" placeholder="0">
            <span class="error"> </span>

        </div>

        <div>
            <label>Estado:</label>
            <input type="radio" id="nuevo" value="nuevo" v-model="newBook.status" name="status" required>
            <label for="nuevo">Nuevo</label>
            <input type="radio" id="bueno" value="bueno" v-model="newBook.status" name="status" required>
            <label for="viejo">Bueno</label>
            <input type="radio" id="malo" value="malo" v-model="newBook.status" name="status" required>
            <label for="viejo">Malo</label>
            <span class="error"> </span>

        </div>

        <div>
            <label for="comments">Comentarios:</label>
            <textarea v-model="newBook.comments" id="comments"></textarea>
        </div>

        <button type="submit">Añadir</button>
        <button type="reset">Reset</button>
    </form>
</template>