<template>
    <main>
        <h2>Home</h2>
        <User>
            <template #user="{user}">
                <div v-if="user">
                    <UserProfile :user="user"/>
                    <ChatList :uid="user.uid" />
                </div>

                <Login v-else />
            </template>
        </User>
    </main>
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

<style lang="scss" scoped>
main {
    padding: 8px;

    h2 {
        margin-top: 0;
        text-align: center;
    }
}
</style>