<template>
    <div>
        <h3>Chats</h3>
        <ul>
            <li v-for="chat of chats" :key="chat.id">
                <router-link :to="{name: 'chat', params: {id: chat.id}}">{{chat.name}}</router-link>
            </li>
        </ul>

        <form  @submit.prevent="createChatRoom()">
            <input type="text" v-model="chatRoomName" name="chatRoomName" placeholder="Name for chat room...">
            <p v-if="errorMessage">{{errorMessage}}</p>
            <button>Create new chat room</button>
        </form>
    </div>
</template>

<script>
import {db} from '../firebase'

export default {
    data() {
        return {
            chatRoomName: null,
            chats: [],
            errorMessage: null,
        }
    },
    firestore() {
        return {
            chats: db.collection('chats').where('owner', '==', this.uid)
        }
    },
    methods: {
        async createChatRoom() {
            this.errorMessage = this.validateChatName();

            if (this.errorMessage) {
                return;
            }

            await db.collection('chats').add({
                createdAt: Date.now(),
                owner: this.uid,
                members: [this.uid],
                name: this.chatRoomName,
            })
        },
        validateChatName() {
            if (! this.chatRoomName) {
                return 'Name for chatroom is required';
            } else if (this.chatRoomName.length <= 3) {
                return 'Chat name must be at least 3 characters';
            } else if (this.chatRoomName.length >= 50) {
                return 'Chat name must not exceed 50 characters';
            }

            return null;
        }
    },
    props: {
        uid: {
            type: String,
            required: true,
        }
    }
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