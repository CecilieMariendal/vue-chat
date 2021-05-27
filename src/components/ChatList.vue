<template>
    <div>
        <h3>Chats</h3>
        <ul>
            <li v-for="(chat, index) in chats" :key="chat.id" :style="{animationDelay: 'calc(' + index + '00ms)'}">
                <router-link :to="{name: 'chat', params: {id: chat.id}}">{{chat.name}}</router-link>
                <button @click="deleteChat(chat.id)">
                    <font-awesome-icon :icon="['fas', 'trash-alt']" />
                </button>
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
            chats: db.collection('chats')
                .where('owner', '==', this.uid)
                .where('achived', '==', false)
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
                achived: false,
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
        },
       async deleteChat(chatId) {
            await db.collection('chats').doc(chatId).update({
                achived: true,
            })
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
@keyframes shiftIn {
    100% {
        opacity: 0;
        transform: translateY(-10px)
    }
}

div {
    ul {
        flex: 1;
        list-style: none;
        padding: 0;
        filter: drop-shadow(4px 4px 10px rgba(200, 200, 200, 0.3));

        li  {
            display: flex;
            justify-content: space-between;
            margin: 1rem 0;
            padding: 1rem;
            background-color: white;
            overflow: hidden;
            animation: shiftIn 0.2s reverse backwards;
            
            button {
                width: 2rem;
                height: 2rem;
                border: none;
                background: var(--color-danger);
                color: white;
            }
        }
    }
    form {
        button {
            margin-top: 1.5rem;
        }
    }
}
</style>