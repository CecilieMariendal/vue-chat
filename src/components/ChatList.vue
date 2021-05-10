<template>
    <div>
        <h3>Chats</h3>
        <ul>
            <li v-for="chat of chats" :key="chat.id">
                <router-link :to="{name: 'chat', params: {id: chat.id}}">{{chat.id}}</router-link>
            </li>
        </ul>

        <button @click="createChatRoom()">Create new chat room</button>
    </div>
</template>

<script>
import {db} from '../firebase'

export default {
    data() {
        return {
            chats: []
        }
    },
    firestore() {
        return {
            chats: db.collection('chats').where('owner', '==', this.uid)
        }
    },
    methods: {
        async createChatRoom() {
            await db.collection('chats').add({
                createdAt: Date.now(),
                owner: this.uid,
                members: [this.uid],
            })
        }
    },
    props: ['uid']
}
</script>

<style lang="scss" scoped>
ul {
    padding: 0;
    list-style: none;
    
    li  {
        margin: 1rem 0;
    }
}

button {
    margin-top: 1.5rem;
}
</style>