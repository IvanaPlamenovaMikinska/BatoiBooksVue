<script>
import { mapActions, mapState } from 'pinia';
import { useDataStore } from '../stores/store'
import { ErrorMessage, Form, Field } from 'vee-validate';
export default {
    name: 'AddBook',
    components:{
        ErrorMessage,
        Form,
        Field,
    },
    computed: {
        ...mapState(useDataStore, {
            books: 'books',
            modules: 'modules',
        })
    },

    methods: {
        ...mapActions(useDataStore, ['changeBook', 'addBook', 'getDBBook']),
        async addOrEdit() {
            if (this.isEdit) {
                await this.changeBook(this.newBook)
            } else {
                await this.addBook(this.newBook)
            }
            this.newBook = {}
            this.isEdit = false
            this.$router.push({ name: 'list' })
        },
        async loadForm() {
            const bookId = this.$route.params.id
            if (bookId) {
                const book = await this.getDBBook(bookId)
                this.isEdit = true
                this.newBook = book
            } else {
                this.isEdit = false
                this.newBook = {}
            }
        }
    },

    watch: {
        $route() {
            this.loadForm()
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
    <Form @submit="addOrEdit" id="bookForm">
        <div>
            <label> Id:</label>
            <input v-model="newBook.id" type="text" id="id" disabled>
        </div>

        <div>
            <label for="id-module">Módulo:</label>
            <Field as="select" name="moduleCode" v-model="newBook.moduleCode" id="id-module" required>
                <option value="" disabled selected>- Selecciona un módulo -</option>
                <option v-for="modulo in modules" :value="modulo.code">{{ modulo.cliteral }}</option>
            </Field>
            <ErrorMessage name="moduleCode" class="error" />
        </div>

        <div>
            <label for="publisher">Editorial:</label>
            <Field name="publisher" v-model="newBook.publisher" type="text" id="publisher" required></Field>
            <ErrorMessage name="publisher" class="error" />

        </div>

        <div>
            <label for="price">Precio:</label>
            <Field name="price" v-model="newBook.price" type="number" id="price" required min="0" step="0.01"
                placeholder="0.00"></Field>
            <ErrorMessage name="price" class="error" />

        </div>

        <div>
            <label for="pages">Páginas:</label>
            <Field name="pages" v-model="newBook.pages" type="number" id="pages" required min="0" step="1"
                placeholder="0"></Field>
            <ErrorMessage name="pages" class="error" />

        </div>

        <div>
            <label>Estado:</label>
            <Field name="status" type="radio" id="nuevo" value="new" v-model="newBook.status" required></Field>
            <label for="nuevo">Nuevo</label>
            <Field name="status" type="radio" id="bueno" value="good" v-model="newBook.status" required></Field>
            <label for="viejo">Bueno</label>
            <Field name="status" type="radio" id="malo" value="bad" v-model="newBook.status" required></Field>
            <label for="viejo">Malo</label>
            <ErrorMessage name="status" class="error" />
        </div>

        <div>
            <label for="comments">Comentarios:</label>
            <textarea v-model="newBook.comments" id="comments"></textarea>
        </div>

        <button type="submit">{{ isEdit ? 'Guardar Cambios' : 'Añadir' }}</button>
        <button type="reset">Reset</button>
    </Form>
</template>