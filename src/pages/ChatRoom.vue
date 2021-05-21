<template>
    <User>
        <template #userLoading="{userLoading}">
            <LoadingSpinner v-if="userLoading" />
        </template>
        <template #user="{user}">
            <main-header :user="user"></main-header>
            <main>
                <h3>ChatRoom: {{chatId}}</h3>
                <template v-if="user">
                    <ul>
                        <li v-for="message of messages" :key="message.id">
                            <ChatMessage :message="message.text" :messageTx="message.sender === user.uid" :audioUrl="message.audioUrl" />
                        </li>
                    </ul>

                    <div v-if="newAudio" class="audio">
                        <audio :src="newAudioUrl" controls></audio>
                    </div>

                    <form @submit.prevent="addMessage(user.uid)">
                        <div class="toolbar">
                            <button v-if="!recorder" @click="record()" type="button" class="record">
                                <font-awesome-icon :icon="['fas', 'microphone']" />
                            </button>
                            <button v-else type="button" @click="stop()" class="stop">Stop</button>
                        </div>

                        <input type="text" v-model="newMessageText">
                        
                        <div class="action">
                            <button type="submit" :disabled="!newMessageText || loading">
                                <font-awesome-icon :icon="['fas', 'paper-plane']" />
                            </button>
                        </div>
                    </form>
                </template>
                <Login v-else />
            </main>
        </template>
    </User>
</template>

<script>
import User from '../components/User';
import ChatMessage from '../components/ChatMessage';
import Login from '../components/Login';
import MainHeader from '../components/MainHeader';
import LoadingSpinner from '../components/LoadingSpinner';
import {db, storage} from '../firebase';

export default {
    components: {
        User,
        ChatMessage,
        Login,
        MainHeader,
        LoadingSpinner,
    },
    computed: {
        chatId() {
            return this.$route.params.id;
        },
        messageCollection() {
            return db.doc(`chats/${this.chatId}`).collection('messages');
        },
        newAudioUrl() {
            return URL.createObjectURL(this.newAudio);
        }
    },
    data() {
        return {
            newMessageText: '',
            loading: false,
            messages: [],
            newAudio: null,
            stream: null,
            recorder: null,
        }
    },
    firestore() {
        return {
            messages: this.messageCollection.orderBy('createdAt').limitToLast(10),
        }
    },
    methods: {
        async record() {
            this.newAudio = null;

            this.stream = await navigator.mediaDevices.getUserMedia({
                audio: true,
                video: false,
            });

            const options = {MimeType: 'audio/webm'};
            const recordedChunk = [];
            this.recorder = new MediaRecorder(this.stream, options);

            this.recorder.addEventListener('dataavailable', (event) => {
                if (event.data.size > 0) {
                    recordedChunk.push(event.data)
                }
            });
            
            this.recorder.addEventListener('stop', () => {
                this.newAudio = new Blob(recordedChunk)
            });

            this.recorder.start();
        },
        async stop() {
            this.stream.getTracks().forEach((track) => {
                track.stop();
            });
            this.stream = null;
            this.recorder.stop();
            this.recorder = null;
        },
        async addMessage(uid) {
            this.loading = true;

            let audioUrl = null;

            const {id: messageId} = this.messageCollection.doc();

            if (this.newAudio) {
                const storageRef = storage
                    .ref('chats')
                    .child(this.chatId)
                    .child(`${messageId}.wav`)

                await storageRef.put(this.newAudio)

                audioUrl = await storageRef.getDownloadURL();
            }
            
            await this.messageCollection.doc(messageId).set({
                text: this.newMessageText,
                sender: uid,
                createdAt: Date.now(),
                audioUrl,
            });

            this.loading = false;
            this.newMessageText = '';
            this.newAudio = null;
        }
    }
}

</script>

<style lang="scss" scoped>
main {
    flex: 1;
    display: flex;
    flex-direction: column;
    max-width: 500px;
    width: 100%;
    margin: 0 auto;
    background-color: #f9f9f9;

    h3 {
        text-align: center;
    }
    
    > div {
        flex: 1;
        display: flex;
        flex-direction: column;

        ul {
            flex: 1;
            list-style: none;
            margin: 0;
            padding: 12px 0;
            border: 1px solid lightgray;

            li {
                display: flex;
            }
        }

        .audio {
            padding: 1vh;

            audio {
                width: 100%;
            }
        }
    
        form {
            display: flex;
            align-items: stretch;
            padding: 1vh 1vw;
            box-sizing: border-box;

            div {
                display: flex;

                &.toolbar { padding-right: 2vw; }
                &.action { padding-left: 2vw; }

                button {
                    height: 100%;
                    background-color: white;
                    border-radius: 4px;
                    font-size: 1rem;
                }
            }

            input {
                flex: 1;
                background-color: #e7e7e7;
                padding: 0.5rem 1rem;
                font-size: 1rem;
                border: 1px solid transparent;
                border-radius: 4rem;
                outline: none;
                transition: border-color 0.2s;

                &:focus {
                    border: 1px solid grey;
                }
            }
        }
    }
}
</style>