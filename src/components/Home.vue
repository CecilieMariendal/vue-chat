<template>
    <div>
        <h2>Home.vue</h2>
    
        <User>
            <template v-slot:user="{user}">
                <div v-if="user">
                    <UserProfile :user="user"/>
                    <ChatList :uid="user.uid" />
                </div>

                <Login v-else />
            </template>
        </User>
    </div>
</template>

<script>
import User from './User'
import UserProfile from './UserProfile'
import ChatList from './ChatList'
import Login from './Login'

export default {
    components: {
        User,
        UserProfile,
        ChatList,
        Login,
    }
}
</script>