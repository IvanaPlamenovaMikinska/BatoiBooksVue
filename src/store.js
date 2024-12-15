import { reactive } from 'vue'
import { addDBBook, getDBBooks, removeDBBook, getDBBook, changeDBBook } from './books.api'
import { getDBModules } from './modules.api'
export const store = {
    state: reactive({
        books: [],
        modules: [],
        messages: [],
    }),


    async addBook(book) {
        try {
            const nuevoLibro = await addDBBook(book)
            store.state.books.push(nuevoLibro)
            return nuevoLibro;
        } catch (error) {
            store.state.messages.push(error)
        }
    },

    async populate() {
        try {
            const libros = await getDBBooks();
            const modulos = await getDBModules();
            store.state.books = libros;
            store.state.modules = modulos;
        } catch (error) {
            store.state.messages.push(error)
        }
    },

    async removeBook(id) {
        try {
            const libro = await removeDBBook(id)
            const index = store.state.books.indexOf(libro)
            store.state.books.splice(index, 1)
        } catch (error) {
            store.state.messages.push(error)
        }
    },

    async changeBook(libro) {
        try {
            const libroCambiado = await changeDBBook(libro)
            const index = this.state.books.findIndex(book => book.id === libro.id)
            store.state.books.splice(index, 1, libroCambiado)
        } catch (error) {
            store.state.messages.push(error)
        }
    },

    remove(index) {
        store.state.messages.splice(index, 1);
    },

    getDBBook(id) {
        try{
            return getDBBook(id)
        } catch (error) {
            store.state.messages.push(error)
        }
    }
}

