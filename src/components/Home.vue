<template>
    <div>
        <h2>Home.vue</h2>

        <User v-slot:user="{user}">
            <div v-if="user">
                Logged in as {{user.uid}}
            </div>
            <Login v-else />
        </User>
    </div>
</template>

<script>
import User from './User'
import Login from './Login'

export default {
    components: {
        User,
        Login,
    }
}
</script>