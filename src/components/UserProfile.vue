<template>
    <div>
        <h3 v-if="user.displayName">{{user.displayName}}</h3>
        <h3 v-if="user.isAnonymous">Anonymous user</h3>

        <form v-if="user && ! username" @submit.prevent="updateUsername()">
            <input v-model="username" @input="checkUsername()" type="text" placeholder="username">
            <p v-if="errorMessage" class="error">{{errorMessage}}</p>
            <button>Submit</button>
        </form>
        <h3 v-else>Logged in as {{username}}</h3>

        <button @click="auth.signOut()">sign out</button>
    </div>
</template>

<script>
import {auth, db} from '../firebase'

export default {
    data() {
        return {
            auth,
            username: null,
            errorMessage: null,
        }
    },
    props: ['user'],
    async created() {
        const snapshot = await db.collection('usernames')
            .where('uid', '==', this.user.uid)
            .limit(1)
            .get();

        if (snapshot.docs.length) {
            this.username = snapshot.docs[0].id;
        }
    },
    methods: {
        async checkUsername() {
            if (this.username.length) {
                const ref = db.doc(`usernames/${this.username}`);
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

            await db.collection('usernames').doc(this.username).set({
                uid: this.user.uid
            });
        }
    }
}
</script>

<style lang="scss" scoped>
h3 {
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
</style>