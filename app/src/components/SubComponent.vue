<template>
    <div>
        <slot />
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Prop } from 'vue-property-decorator'
import Component from 'vue-class-component'
import delay from 'delay'

@Component
export default class SubComponent extends Vue {
    
    @Prop(String) nameVal!: string
    @Prop(undefined) someProp!: number | string
    
    mounted() {
        this.$emit('update:name', this.nameVal)
        this.$emit('update:description', 'The Leader of StarFox')
        this.$emit('update:showImg', true)    
    }

    // async created() {
    //     await delay(2000)
    //     this.$emit('update:name', 'Fox')
    //     await delay(100)
    //     this.$emit('update:description', 'The Leader of StarFox')
    //     await delay(100)
    //     this.$emit('update:showImg', true)
    // }

}
</script>

<style scoped>

</style>
