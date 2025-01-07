import { defineStore } from 'pinia'
import { addDBBook, getDBBooks, removeDBBook, getDBBook, changeDBBook } from '../books.api'
import { getDBModules } from '../modules.api'
export const useDataStore = defineStore('data', {
    state() {
        return {
            books: [],
            modules: [],
            messages: [],
            cart: [],
        }
    },

    getters: {
        modulesName: (state) => (code) => state.modules.find(module => module.code === code)?.cliteral
    },


    actions: {
        async addBook(book) {
            try {
                const nuevoLibro = await addDBBook(book)
                this.books.push(nuevoLibro)
                return nuevoLibro;
            } catch (error) {
                this.messages.push(error)
            }
        },

        async populate() {
            try {
                const libros = await getDBBooks();
                const modulos = await getDBModules();
                this.books = libros;
                this.modules = modulos;
                this.cart = this.getCart();
            } catch (error) {
                this.messages.push(error)
            }
        },

        async removeBook(id) {
            try {
                if (confirm("Seguro que quieres eliminar el libro?")) {
                    const libro = await removeDBBook(id)
                    const index = this.books.indexOf(libro)
                    this.books.splice(index, 1)
                }
            } catch (error) {
                this.messages.push(error)
            }
        },

        async changeBook(libro) {
            try {
                const libroCambiado = await changeDBBook(libro)
                const index = this.books.findIndex(book => book.id === libro.id)
                this.books.splice(index, 1, libroCambiado)
            } catch (error) {
                this.messages.push(error)
            }
        },

        remove(index) {
            try {
                this.messages.splice(index, 1);
            } catch (error) {
                this.messages.push(error)
            }
        },

        getDBBook(id) {
            try {
                return getDBBook(id)
            } catch (error) {
                this.messages.push(error)
            }
        },

        addToCart(book) {
            try {
                if (this.cart.find(libro => libro.id === book.id)) {
                    this.messages.push("Libro ya en el carrito")
                } else {
                    this.cart.push(book)
                    localStorage.setItem('cart', JSON.stringify(this.cart))
                }
            } catch (error) {
                this.messages.push(error)
            }
        },

        removeFromCard(book) {
            try {
                if (confirm("Seguro que quieres eliminar el libro del carrito?")) {
                    this.cart.splice(book, 1)
                    localStorage.setItem('cart', JSON.stringify(this.cart))
                }
            } catch (error) {
                this.messages.push(error)
            }
        },

        comprarLibros() {
            try {
                if (confirm("Importe a pagar: " + this.cart.reduce((total, libro) => total + libro.price, 0) + " €")) {
                    this.cart = []
                    alert("Libros comprados con exito")
                    localStorage.removeItem('cart')
                }
            } catch (error) {
                this.messages.push(error)
            }
        },

        vaciarCarrito() {
            try {
                if (confirm("Seguro que quieres vaciar el carrito?")) {
                    this.cart = []
                    localStorage.removeItem('cart')
                }
            } catch (error) {
                this.messages.push(error)
            }
        },

        getCart() {
            if (localStorage.cart) {
                return JSON.parse(localStorage.getItem('cart'))
            }
            return []
        },
    }

})

