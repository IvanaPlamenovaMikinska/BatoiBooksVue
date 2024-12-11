<script>
import { store } from '../store'
export default {
    name: 'AppMessages',
    computed: {
        menssages() {
            return store.state.messages
        }
    },
    methods: {
        remove(index) {
            store.remove(index)
        }
    }
}
</script>

<template>
    <div id="messages">
        <div class="tipo-recibido alert alert-danger alert-dismissible" role="alert" v-for="(menssage, index) in menssages" :key="index">
            {{menssage}}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" @click="remove(index)">x</button>
        </div>
    </div><br>
</template>