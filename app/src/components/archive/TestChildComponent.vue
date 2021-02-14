<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import { uniqueNamesGenerator, Config, adjectives, colors, animals } from 'unique-names-generator';
 
const customConfig: Config = {
  dictionaries: [adjectives, colors],
  separator: ' ',
  length: 2,
} 

@Component({
    computed: {
        computedChildStr() {
            return this.$data.childStr + ' ' + (this.$data.rand * 10).toString()
        }
    }
})
export default class TestChildComponent extends Vue {
    
    @Prop(String) parentString!: string

    // data -- or we can simply list it here and it just works
    childStr = 'child string'
    otherStr = undefined
    last = ''
    first = ''
    full: string = ''
    rand: string = '0'
    color: string = 'blue'
    // computed getters setters 
    get name() {
        return this.first + ' ' + this.last
    }
    set name(val) {
        // this.full = val
        const parts = val.split(' ')
        this.first = parts[0][0].toUpperCase() + parts[0].slice(1, parts[0].length)
        this.last = parts[1][0].toUpperCase() + parts[1].slice(1, parts[1].length)
        this.full = `${this.first} ${this.last}`
        this.color = this.last
        console.log(this.color)
    }
    get num(): string {
        return this.rand
    }
    set num(val: string) {
        const floatVal = val
        const floatStr = floatVal.toString()
        this.rand = parseFloat(floatStr).toFixed(3)
    }

    // methods
    handleClick() {
        this.name = uniqueNamesGenerator(customConfig)
        this.num = Math.random().toString()
    }
    created() {
        console.log('component created')
    }
    mounted() {
        this.handleClick()   
    }
}
</script>

<template>
    <fragment>
        <div>parent string: {{ parentString }}</div><br>
        <div>computed string: {{ computedChildStr }}</div><br>
        <div
        @click="handleClick">computed name (with get set):
            <span :style="`color:${color};`">{{ full }}</span>
        </div>
        <br>
    </fragment>
</template>

<style scoped>

</style>