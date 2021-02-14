<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    data() {
        return {
            name: 'flask maps',
            prevName: '',
            textColor: 'slateblue',
            className: 'flap-jacks',
            bool: false
        }
    },
    computed: {
        nameProp: {
            get(): string {
                return this.name
            },
            set(val: string) {
                this.prevName = this.prevName === val ? this.name : val 
                const name = val === this.prevName ? 'a-name' : val
                this.name = name.split('-')[0] + ' ' + name.split('-')[1]
            }
        }
    },
    methods: {
        handleClick() {
            this.nameProp = this.className
            this.bool = !this.bool
            console.log(this.bool)
        }
    }
})
</script>
<template lang="html">
    <div :class="className" :style="`color:${textColor}`" @click="handleClick">{{ name }}</div>
</template>
<style lang="css">
    .flap-jacks {
        cursor: pointer;
        transform: scale(1.0);
        transition: all .2s;
    }
    .flap-jacks:hover {
        transform: scale(1.05);
        transition: all .1s;
    }
</style>