<template>
    <div>
        <slot name="user" :user="user"></slot>
        <slot name="userLoading" :userLoading="userLoading"></slot>
    </div>
</template>

<script>
import {auth, db} from '../firebase'
import {ref} from '@vue/composition-api'

export default {
    setup() {
        const user = ref(null);
        const userLoading = ref(true);
        const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {

            if (firebaseUser) {            
                const snapshot = await db.collection('usernames')
                .where('uid', '==', firebaseUser.uid)
                .limit(1)
                .get();
                
                if (snapshot.docs.length) {
                    firebaseUser.username = snapshot.docs[0].id;
                }  
                  
                user.value = firebaseUser;
            }

            userLoading.value = false;
        });
        
        return {
            user,
            userLoading,
            unsubscribe,
        }
    },
    unmounted() {
        this.unsubscribe()
    }
}
</script>