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
        async addOrEdit() {
            if (this.isEdit) {
                await store.changeBook(this.newBook)
            } else {
                await store.addBook(this.newBook)
            }
            this.newBook = {}
            this.isEdit = false
            this.$router.push({ name: 'list' })
        },
        async loadForm() {
            const bookId = this.$route.params.id
            if (bookId) {
                const book = await store.getDBBook(bookId)
                this.isEdit = true
                this.newBook = book
            }
        }
    },
    data() {
        return {
            newBook: {},
            isEdit: false,
        }
    },
    mounted() {
        this.loadForm()
    }
}
</script>

<template>
    <h1 id="form">{{ isEdit ? 'Editar Libro' : 'Añadir Libro' }}</h1>
    <form @submit.prevent="addOrEdit" id="bookForm">
        <div>
            <label> Id:</label>
            <input v-model="newBook.id" type="text" id="id" disabled>
        </div>

        <div>
            <label for="id-module">Módulo:</label>
            <select v-model="newBook.moduleCode" id="id-module" required>
                <option value="" disabled selected>- Selecciona un módulo -</option>
                <option v-for="modulo in modules" :value="modulo.code">{{ modulo.cliteral }}</option>
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
            <input type="radio" id="nuevo" value="new" v-model="newBook.status" name="status" required>
            <label for="nuevo">Nuevo</label>
            <input type="radio" id="bueno" value="good" v-model="newBook.status" name="status" required>
            <label for="viejo">Bueno</label>
            <input type="radio" id="malo" value="bad" v-model="newBook.status" name="status" required>
            <label for="viejo">Malo</label>
            <span class="error"> </span>

        </div>

        <div>
            <label for="comments">Comentarios:</label>
            <textarea v-model="newBook.comments" id="comments"></textarea>
        </div>

        <button type="submit">{{ isEdit ? 'Guardar Cambios' : 'Añadir' }}</button>
        <button type="reset">Reset</button>
    </form>
</template>