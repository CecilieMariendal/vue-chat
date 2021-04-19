<template>
    <div>
        <h2>Home.vue</h2>
    
        <User>
            <template v-slot:user="{user}">
                <UserProfile v-if="user" :user="user"/>
                <Login v-else />
            </template>
        </User>
    </div>
</template>

<script>
import User from './User'
import UserProfile from './UserProfile'
import Login from './Login'

export default {
    components: {
        User,
        UserProfile,
        Login,
    }
}
</script>