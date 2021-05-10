<template>
    <main>
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

<style lang="scss">
main {
    flex: 1;
    display: flex;
    flex-direction: column;
    max-width: 500px;
    width: 100%;
    margin: 0 auto;
    padding: 8px;

    h2 {
        margin-top: 0;
        text-align: center;
    }

    button {
        background-color: white;
        border-radius: 4px;
        font-size: 1rem;
    }
}
</style>