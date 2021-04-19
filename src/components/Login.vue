<template>
    <aside>
        <h3>Sign in Anonymously</h3>
        <button @click="auth.signInAnonymously()">Sign in</button>

        <div v-if="newUser">
            <h3>Sign in with a new account</h3>
            <a href="#" @click="newUser = false">Returning user?</a>
        </div>

        <div v-else>
            <h3>Sign in with Email</h3>
            <a href="#" @click="newUser = true">New user?</a>
        </div>

        <label for="email">
            Email
            <input v-model="email" type="email" placeholder="Email">
        </label>

        <label for="password">
            Password
            <input v-model="password" type="password" placeholder="Password">
        </label>

        <button :class="{loading}" @click="signInOrCreateUser">
            {{newUser ? 'Sign up' : 'login'}}
        </button>

        <p v-if="errorMessage">{{errorMessage}}</p>
    </aside>
</template>

<script>
import {auth} from '../firebase'

export default {
    data() {
        return {
            auth,
            newUser: false,
            email: '',
            password: '',
            errorMessage: '',
            loading: false,
        }
    },
    methods: {
        async signInOrCreateUser() {
            this.loading = true
            this.errorMessage = ''

            try {
                if (this.newUser) {
                    await auth.createUserWithEmailAndPassword(this.email, this.password)
                } else {
                    await auth.signInWithEmailAndPassword(this.email, this.password)
                }
            } catch(error) {
                this.errorMessage = error.message
            }

            this.loading = false;
        }
    }
}
</script>
