<script lang="ts" setup>
import { RouterView } from 'vue-router'
import TheHead from '@/components/TheHead.vue'
</script>
<template lang="pug">

TheHead

RouterView(v-slot="{ Component }")
    Suspense
        component(:is="Component")

</template>
<style src="@/styles/main.sass"></style>
<style lang="sass" scoped></style>
