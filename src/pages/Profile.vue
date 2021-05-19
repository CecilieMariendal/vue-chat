<template>
    <main>
        <User>
            <template #user="{user}">
                <div v-if="user">
                    <h3 v-if="user.username">{{user.username}}</h3>
                    <h3 v-else-if="user.displayName">{{user.displayName}}</h3>
                    <h3 v-else-if="user.isAnonymous">Anonymous user</h3>

                    <form v-else @submit.prevent="updateUsername()">
                        <input v-model="newUsername" @input="checkUsername()" type="text" placeholder="username">
                        <p v-if="errorMessage" class="error">{{errorMessage}}</p>
                        <button>Submit</button>
                    </form>

                    <button @click="auth.signOut()">sign out</button>
                </div>

                <Login v-else />
            </template>
        </User>
    </main>
</template>

<script>
import {auth, db} from '../firebase';

import User from '../components/User';
import Login from '../components/Login';

export default {
    components: {
        auth,
        User,
        Login,
    },
    data() {
        return {   
            errorMessage: null,
            newUsername: null,
        }
    },
    methods: {
        async checkUsername() {
            if (this.newUsername.length) {
                const ref = db.doc(`usernames/${this.newUsername}`);
                const {exists} = await ref.get();
                
                if (exists) {
                    this.errorMessage = 'Username is taken';

                    return;
                }
            }

            this.errorMessage = null;
        },
        async updateUsername() {
            if (this.errorMessage) {
                return;
            }

            await db.collection('usernames').doc(this.newUsername).set({
                uid: this.user.uid
            });
        }
    },
}
</script>

<style lang="scss">
div {
    h3 {
        margin: 0 0 0 0.5rem;
        font-size: 1rem;
    }

    form {
        margin-bottom: 1rem;

        .error {
            margin: 0.5rem 0 1rem;
            color: red;
            font-size: .85rem;
            font-weight: bold;
        }
    }
}
</style>