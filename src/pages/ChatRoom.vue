<template>
    <main>
        <h3>ChatRoom: {{chatId}}</h3>
        <User>
            <template #user="{user}">
                <div v-if="user">
                    <ul>
                        <li v-for="message of messages" :key="message.id">
                            <ChatMessage :message="message.text" :messageTx="message.sender === user.uid"></ChatMessage>
                        </li>
                    </ul>

                    <form @submit.prevent="addMessage(user.uid)">
                        <input type="text" v-model="newMessageText">
                        
                        <label>
                            Record Audio
                            <button v-if="!recorder" @click="record()" type="button" class="record">Record</button>
                            <button v-else type="button" @click="stop()" class="stop">Stop</button>
                        </label>

                        <button type="submit" :disabled="!newMessageText || loading">
                            Send
                        </button>
                    </form>

                    <audio v-if="newAudio" :src="newAudioUrl" controls></audio>
                </div>
                <Login v-else />
            </template>
        </User>
    </main>
</template>

<script>
import User from '../components/User'
import ChatMessage from '../components/ChatMessage'
import Login from '../components/Login'
import {db} from '../firebase'

export default {
    components: {
        User,
        ChatMessage,
        Login
    },
    computed: {
        chatId() {
            return this.$route.params.id
        },
        messageCollection() {
            return db.doc(`chats/${this.chatId}`).collection('messages')
        },
        newAudioUrl() {
            return URL.createObjectURL(this.newAudio)
        }
    },
    data() {
        return {
            newMessageText: '',
            loading: false,
            messages: [],
            newAudio: null,
            recorder: null,
        }
    },
    firestore() {
        return {
            messages: this.messageCollection.orderBy('createdAt').limitToLast(10)
        }
    },
    methods: {
        async record() {
            this.newAudio = null;

            const stream = await navigator.mediaDevices.getUserMedia({
                audio: true,
                video: false,
            })

            const options = {MimeType: 'audio/webm'}
            const recordedChunk = [];
            this.recorder = new MediaRecorder(stream, options)

            this.recorder.addEventListener('dataavailable', (event) => {
                if (event.data.size > 0) {
                    recordedChunk.push(event.data)
                }
            })

            this.recorder.addEventListener('stop', () => {
                this.newAudio = new Blob(recordedChunk)
            })

            this.recorder.start()
        },
        async stop() {
            this.recorder.stop();
            this.recorder = null
        },
        async addMessage(uid) {
            this.loading = true

            const {id: messageId} = this.messageCollection.doc();

            await this.messageCollection.doc(messageId).set({
                text: this.newMessageText,
                sender: uid,
                createdAt: Date.now(),
            });

            this.loading = false;
            this.newMessageText = '';
        }
    }
}
</script>

<style lang="scss" scoped>
main {
    max-width: 500px;
    margin: auto;

    h3 {
        text-align: center;
    }
    
    ul {
        list-style: none;
        padding: 0;

        li {
            display: flex;
        }
    }

    form {
        display: flex;

        input {
            flex: 1;
        }
    }
}
</style>