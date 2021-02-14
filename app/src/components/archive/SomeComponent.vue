<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop, PropSync } from 'vue-property-decorator';

@Component({
    model: {
        prop: 'prop1',
        event: 'updateProp1'
    }
})
export default class SomeComponent extends Vue {
    // prop1 = 'a private prop'
    @Prop({ default: 'I am handleClick2\'s message' }) click2Msg!: string
    @Prop(String) parentProp!: string
    @Prop(String) prop1!: string
    @Prop(String) updatedProp!: string
    
    handleClick() {
        console.log('handle the click')
    }
    handleClick2() {
        console.log(this.click2Msg)
    }
    handleTheClicks() {
        this.handleClick()
        this.handleClick2() 
    }
    // watch() {
    //     this.prop1,
    //     () => {
    //         console.log('prop1 changed')
    //     }
    // }
    handleEmit() {
        this.$emit('update-prop1', 'new prop1 value')
        // console.log('should emit an updateProp1 event')
    }
    mounted() {
        this.$on('updateProp1', () => {
            console.log('handle the event')
        })
        // this.$on('parent-event', this.handleParentEvent)
    }
    // updateProp1Handler() {
    //     console.log('updateProp1Handler called')
    // }
    // handleParentEvent(data: object) {
    //     console.log(
    //         data
    //     )
    // }
}
</script>

<style scoped>
    .updated-prop {
        color: indianred;
    }
</style>

<template>
    <div>
        <div>
            <span class="updated-prop">{{ updatedProp }}</span>
        </div>
        <br>
        <br>
        <!-- <div v-on:updateProp1="updateProp1Handler"></div> -->
        <div>This is a prop value from my parent: {{ parentProp }}</div><br>
        <div @click="handleEmit">Click to emit update event</div>
        <div
        @click="handleTheClicks"
        class="some-component"
        >
            <div>SomeComponent: Hello, I'm a Component</div>
            <br>
            <slot></slot>
            <!-- <slot></slot> -->
        </div>
    </div>
</template>

<style scoped>
    .some-component > div {
        color: #ccc;
        font-size: 11px;
    }
</style>
