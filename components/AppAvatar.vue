<script lang="ts" setup>
import Avatar from 'vue-boring-avatars'

defineProps<{
    name?: string
}>()
</script>
<template lang="pug">

Avatar.avatar(variant="beam" :colors="['#ffffff', '#46AA38', '#3C50E0', '#232531', '#EAFFE5']" :square="true" :name="name")

</template>
<style lang="sass" scoped></style>
