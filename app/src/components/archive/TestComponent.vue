<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import TestChildComponent from './TestChildComponent.vue'

@Component({
    components: { TestChildComponent }
})
export default class TestComponent extends Vue {
}
</script>

<template>
    <test-child-component
        parent-string="this is a string from parent"
    >
    </test-child-component>
</template>

<style scoped>

</style>
