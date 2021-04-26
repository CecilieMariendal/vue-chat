<template>
    <main>
        <h3>Welcome to ChatRoom.vue {{chatId}}</h3>
        
        <User>
            <template #user="{user}">
                <div v-if="user">
                    <ul>
                        <li v-for="message of messages" :key="message.id">
                            {{message.text}}
                        </li>
                    </ul>

                    <form @submit.prevent="addMessage(user.uid)">
                        <input type="text" v-model="newMessageText">

                        <button type="submit" :disabled="!newMessageText || loading">
                            Send
                        </button>
                    </form>
                </div>
                <Login v-else />
            </template>
        </User>
        <router-link to="/">Back</router-link>
    </main>
</template>

<script>
import User from '../components/User'
import Login from '../components/Login'
import {db} from '../firebase'

export default {
    components: {
        User,
        Login
    },
    computed: {
        chatId() {
            return this.$route.params.id
        },
        messageCollection() {
            return db.doc(`chats/${this.chatId}`).collection('messages')
        }
    },
    data() {
        return {
            newMessageText: '',
            loading: false,
            messages: [],
        }
    },
    firestore() {
        return {
            messages: this.messageCollection.orderBy('createdAt').limitToLast(10)
        }
    },
    methods: {
        async addMessage(uid) {
            this.loading = true

            const {id: messageId} = this.messageCollection.doc();

            await this.messageCollection.doc(messageId).set({
                text: this.newMessageText,
                id: uid,
                createdAt: Date.now(),
            });

            this.loading = false;
            this.newMessageText = '';
        }
    }
}
</script>