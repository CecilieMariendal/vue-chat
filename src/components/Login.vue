<template>
    <aside>
        <h3 v-if="newUser">Sign up</h3>
        <h3 v-else>Sign in</h3>

        <button v-if="!newUser" @click="auth.signInAnonymously()">Continue anonymously</button>


        <label for="email">
            <span>Email</span>
            <input v-model="email" type="email" placeholder="Enter email">
        </label>

        <label for="password">
            <span>Password</span>
            <input v-model="password" type="password" placeholder="Enter password">
        </label>

        <p v-if="errorMessage" class="error-message">{{errorMessage}}</p>
        <button :class="{loading}" @click="signInOrCreateUser">
            {{newUser ? 'Sign up' : 'Sign in'}}
        </button>


        <p>
            <a v-if="newUser" href="#" @click="newUser = false">Returning user? Sign in</a>
            <a v-else href="#" @click="newUser = true">New user? Sign up</a>
        </p>
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
<style lang="scss" scoped>
aside {
    h3 {
        margin-top: 0;
    }

    label {
        display: block;
        font-weight: 600;

        input {
            display: block;
            width: 100%;
            box-sizing: border-box;
            height: 2.5rem;
            margin-bottom: 0.5rem;
            padding: 0 0.75rem;
            border: none;
            border-radius: 4pxpx;
            background-color: #efefef;
        }
    }

    button {
        margin-bottom: 1rem;
        display: block;
        width: 100%;
        height: 2.5rem;
    }

    p {
        text-align: center;

        &.error-message {
            color: rgb(215, 15, 15);
            font-weight: 700;
        }
        
        a {
            display: inline-block;
        }
    }
}
</style>
