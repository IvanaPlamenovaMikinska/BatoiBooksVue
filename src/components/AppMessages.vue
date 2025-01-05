<script>
import { mapActions, mapState } from 'pinia';
import {useDataStore } from '../stores/store'
export default {
    name: 'AppMessages',
    computed: {
        ...mapState(useDataStore, {
            messages: 'messages'
        })
    },
    methods: {
        ...mapActions(useDataStore, ['remove']),
        remove(index) {
            this.remove(index)
        }
    }
}
</script>

<template>
    <div id="messages">
        <div class="tipo-recibido alert alert-danger alert-dismissible" role="alert" v-for="(message, index) in messages" :key="index">
            {{message}}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" @click="remove(index)">x</button>
        </div>
    </div><br>
</template>