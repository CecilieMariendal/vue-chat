<template>
    <div>
        <h3 v-if="user.displayName">{{user.displayName}}</h3>
        <h3 v-else>Anonymous user</h3>
        <button @click="auth.signOut()">sign out</button>
    </div>
</template>

<script>
import {auth} from '../firebase'

export default {
    data() {
        console.log(this.user);
        return {
            auth
        }
    },
    props: ['user']
}
</script>

<style lang="scss" scoped>
h2 {
    font-size: 1rem;
}
</style>