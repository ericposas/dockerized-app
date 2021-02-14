<script lang='ts'>
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import SomeComponent from '../components/SomeComponent.vue';

@Component({
    components: {
        SomeComponent,
    }
})
export default class Home2 extends Vue {
    @Prop({ default: 'slateblue' }) colorStr!: string
    @Prop(String) prop1!: string
    @Prop({ default: 'not updated' }) updatedPropValue!: string
    // same as: // colorStr: string = 'darkgreen';
    // vm = this
    mounted() {
        console.log('component mounted')
        // this.$on('updateProp1', this.handleUpdateProp1)
        this.$on('update-prop-event', this.onUpdateProp)
    }
    onUpdateProp(val: string) {
        this.updatedPropValue = val
    }
    // updatePropEvent() {
    //     console.log('fired')
    // }
    handleUpdateProp1(val: string) {
        console.log(`some-component says: ${val}`)
        this.$emit('update-prop-event', val)
        // this.updatedProp = val
        // this.$emit('parent-event', { data: 'some data from parent' })
        // console.log('heres an emitted event log')
    }
    // get updatedProp(): string {
    //     return this.updatedPropValue
    // }
    // set updatedProp(val: string) {
    //     this.updatedPropValue = val
    // }
}
</script>

<style scoped>
</style>

<template>
    <div>
        <div>we $emit an event from the child, the parent recieves it, <br>and passes down an updated value to the child component:<br>
        </div>
        <br>
        <!-- <custom-comp :prop1.sync="prop1"></custom-comp> -->
        <some-component
        @update-prop1="handleUpdateProp1"
        parent-prop="parent property"
        :updated-prop="updatedPropValue"
        >
            <div>Here is prop1 from the child component: {{ prop1 }}</div>
            <div :style="`color:${colorStr};`">
                It looks as if the slot component is to render children inside of a custom vue component
            </div>
        </some-component>
    </div>
</template>
