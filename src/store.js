import { reactive } from 'vue'
import { addDBBook, getDBBooks, removeDBBook } from './books.api'
import { getDBModules } from './modules.api'
export const store = {
    state: reactive({
        books: [],
        modules: [],
    }),


    async addBook(book) {
        try {
            const nuevoLibro = await addDBBook(book)
            store.state.books.push(nuevoLibro)
            return nuevoLibro;
        } catch (error) {
            alert(error)
        }

    },

    async populate() {
        const libros = await getDBBooks();
        const modulos = await getDBModules();
        store.state.books = libros;
        store.state.modules = modulos;
    },

    async removeBook(id) {
        const libro = await removeDBBook(id)
        const index = store.state.books.indexOf(libro)
        store.state.books.splice(index, 1)
    },

    async changeBook(libro) {
        const libroCambiado = await changeDBBook(libro)
        const index = store.state.books.indexOf(libro)
        store.state.books.splice(index, 1, libroCambiado)
    }

}

