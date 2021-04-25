<template>
    <div>
        <h2>Home.vue</h2>
    
        <User>
            <template #user="{user}">
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
import User from '../components/User'
import UserProfile from '../components/UserProfile'
import ChatList from '../components/ChatList'
import Login from '../components/Login'

export default {
    components: {
        User,
        UserProfile,
        ChatList,
        Login,
    }
}
</script>