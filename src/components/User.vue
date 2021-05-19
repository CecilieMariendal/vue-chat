<template>
    <div>
        <slot name="user" :user="user"></slot>
    </div>
</template>

<script>
import {auth, db} from '../firebase'
import {ref} from '@vue/composition-api'

export default {
    setup() {
        const user = ref(null);
        const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
            user.value = firebaseUser
            
            const snapshot = await db.collection('usernames')
                .where('uid', '==', firebaseUser.uid)
                .limit(1)
                .get();
                
                if (snapshot.docs.length) {
                    user.value.username = snapshot.docs[0].id;
                }
        })


        return {
            user,
            unsubscribe,
        }
    },
    unmounted() {
        this.unsubscribe()
    }
}
</script>