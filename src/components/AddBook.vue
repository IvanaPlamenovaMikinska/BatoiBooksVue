<script>
import { mapActions, mapState } from 'pinia';
import { useDataStore } from '../stores/store'
import { ErrorMessage, Form, Field } from 'vee-validate';
import * as yup from 'yup';
export default {
    name: 'AddBook',
    components: {
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
            const exists = this.books.find(
                (book) =>
                    book.moduleCode === this.newBook.moduleCode &&
                    book.id !== this.newBook.id &&
                    book.userId === this.newBook.userId
            );

            if (exists) {
                alert('El libro con ese módulo ya existe');
                return;
            }
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
                this.newBook = {userId: 1}
            }
        }
    },

    watch: {
        $route() {
            this.loadForm()
        }
    },

    data() {
        const mySchema = yup.object({
            moduleCode: yup.string().required('El módulo es obligatorio.'),
            publisher: yup.string().required('La editorial es obligatoria.'),
            price: yup.number().required('El precio es obligatorio.').min(0, 'El precio debe ser mayor o igual a 0.')
                .typeError('El precio debe ser un número válido.'),
            pages: yup.number().required('El número de páginas es obligatorio.').min(0, 'El número de páginas debe ser mayor o igual a 0.')
                .integer('El número de páginas debe ser un número entero.').typeError('El número de páginas debe ser un número válido.'),
            status: yup.string().required('El estado es obligatorio.'),
        })
        return {
            newBook: {},
            isEdit: false,
            schema: mySchema,
        }
    },
    mounted() {
        this.loadForm()
    }
}
</script>

<template>
    <h1 id="form">{{ isEdit ? 'Editar Libro' : 'Añadir Libro' }}</h1>
    <Form @submit="addOrEdit" id="bookForm" :validation-schema="schema">
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

<style scoped>
.error {
    color: red;
    font-size: 0.9em;
    margin-top: 0.25em;
}
</style>
