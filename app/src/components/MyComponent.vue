<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Watch } from 'vue-property-decorator'
import {
    Getter,
    Action,
    namespace
} from 'vuex-class'

const bModule = namespace('bModule')

@Component
export default class MyComponent extends Vue {

    @Getter ('someVar') someVar
    @Getter('msg') msg
    @Getter('inputVal') inputVal
    @Action('action1') changeSomeVar
    @Action('action:changeInputVal') changeInputVal
    @bModule.Getter('bVar') bVar

    inputData: string | number = ''

    changeTxt() {
        this.changeSomeVar({ type: 'changeText', text: 'some new text' })
        .then(data => console.log(`.then() chain: ${data}`))
        .catch(err => console.log(err))
    }

    async changeText() {
        try {
            const data = await this.changeSomeVar({ type: 'changeText', text: 'some new text' })
            console.log(`async await: ${data}`)
        } catch (err) {
            console.log(err)
        }
    }

    handleKeyPress($event) {
        this.changeInputVal({ type: 'changeInputVal', value: $event.target.value })
    }

    handleInputChange() {
        this.changeSomeVar({ type: 'changeText', text: this.inputVal })
    }

    handleEnterKey() {
        console.log(this.inputData)
        this.changeSomeVar({ type: 'changeText', text: this.inputData })
    }

    @Watch('someVar', { deep: true })
    onSomeVarChanged(val: string | number) {
        console.log('someVar was changed!')
        // do something imperative here
        if (document !== null) {
            const elt = document.getElementById('div-outside-of-vue')!
            elt.style.color = 'red'
        }
    }

    onEnterEvent() {
        console.log('element has entered')
    }

    onElementLeft() {
        console.log('element has left the page')        
    }

}
</script>

<template>
    <transition appear>
        <fragment>
            <div>Another test using v-model</div>
            <input v-model="inputData" @keyup="changeSomeVar({ type: 'changeText', text: inputData })" @keyup.enter="handleEnterKey" />
            <div>value of inputData: {{ inputData }}</div>
            <br>
            <br>
            <div>input stores in vuex store</div>
            <input
            @keyup="handleKeyPress"
            @change="handleInputChange"
            />
            <br>
            <transition
            name="fade"
            @after-enter="onEnterEvent"
            @after-leave="onElementLeft"
            >
                <div
                    v-if="inputVal.length > 10"
                >{{ inputVal }}</div>
            </transition>
            <br>
            <br>
            <div>
                {{ bVar }}<br><br>
                <div
                >{{ someVar }}</div>
            </div>
            <br>
            <div>
                {{ msg }}
            </div>
        </fragment>
    </transition>
</template>

<style scoped>
    .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
    }
    /* #div-outside-of-vue {
        color: red;
    } */
</style>