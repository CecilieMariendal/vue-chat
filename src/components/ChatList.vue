<template>
    <div>
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
    methods: {
        async createChatRoom() {
            const newChat = await db.collection('chats').add({
                createdAt: Date.now(),
                owner: this.uid,
                members: [this.uid],
            })

            console.log(newChat);
        }
    },
    props: ['uid']
}
</script>