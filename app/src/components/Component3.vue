<template>
    <sub-component
    nameVal="Fox"
    boop="thing"
    :name.sync="name"
    :description.sync="description"
    :showImg.sync="showImg"
    v-on:update:name="setEmittedName"
    v-on:update:description="setEmittedDescription"
    >
        <transition name='slde-fade'>
            <button
            class="slide-btn"
            v-if="showImg"
            @click="toggleElements">{{ buttonText }}</button>
        </transition>
        <transition name='slide-fade'>
            <button
            class="slide-btn"
            v-if="showImg === false"
            @click="toggleElements">{{ buttonText }}</button>
        </transition>
        <br>
        <br>
        <transition-group name="fade" :duration="{ enter: 1000, leave: 200 }">
            <div data-index="1" key="1" v-if="name" id="name"> {{ name }} </div>
            <div data-index="2" key="2" v-if="description" class="sub-comp-slot">{{ description }}</div>
            <img data-index="3" key="3" v-if="showImg" class="sub-comp-img" :src="image" />
        </transition-group>
        <br>
        <br>
        <!-- <button @click="makeApiCall">Make API Request</button> -->
        <button @click="makeDbCall">Make DB Request</button>
        <br>
        <br>

        <transition-group name="fade">
        <div key="-2" v-if="employees">
            <h2 key="-1">Some employees from the api</h2>
            <div v-for="(employee, index) in employees" :key="index">
            <!-- :style="{ transitionDelay: `${(index * 2)}s` }"> -->
                <!-- <br> -->
                <div>
                    <div><span style="padding-right:10px;">Name:</span>{{ employee.name }}</div>
                    <div><span style="padding-right:10px;">Company:</span>{{ employee.organization }}</div>
                </div>
                <br>
            </div>
        </div>
        </transition-group>

        <br>
            <input @keyup="onDbEntryInput" @keyup.enter="addNewDbEntry" :value="dbEntryUN" />
            <button @click="addNewDbEntry">Add DB Entry</button>
        <br>

        <div v-for="(data, index) in dbResult" :key="index">
            <div><span :style="spanMargin">id:</span>{{ data.id }}</div>
            <div><span :style="spanMargin">name:</span>{{ data.username }}</div>
            <div><span :style="spanMargin">created_at:</span>{{ data.created_at }}</div>
            <br>
        </div>

    </sub-component>    
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import SubComponent from './SubComponent.vue'
import imgStr from './imgStr'
import { Watch } from 'vue-property-decorator'
import delay from 'delay'

@Component({
    components: {
        SubComponent
    },
    computed: {
        buttonText() {
            if (this.$data.showImg) {
                return 'Remove Elements'
            } else {
                return 'Show Elements'
            }
        }
    }
})
export default class Component3 extends Vue {
    name=''
    emittedName=''
    description=''
    emittedDescription=''
    image=imgStr
    showImg=false
    employees=null //[{ test: 'thing' }, { name: 'another thing' }]
    enterOpts = {
        opacity: 1,
        scale: 1,
        translateX: '10px'
    }
    leaveOpts = {
        translateX: '200px',
        scale: 1,
        opacity: 0
    }
    dbResult=null
    spanMargin="margin-right:10px;"
    dbEntryUN=''

    onDbEntryInput($event) {
        this.dbEntryUN = $event.target.value;
        console.log(this.dbEntryUN);
    }

    async addNewDbEntry() {
        if (this.$data.dbEntryUN) {
            try {
                // post new entry..
                const postData = await fetch('http://localhost:8000/api/test', {
                    method: 'post',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        'username': this.$data.dbEntryUN.trim()
                    })
                })
                console.log(
                    await postData.json()
                )
                // then retrieve new results from db..
                await this.makeDbCall()
                this.dbEntryUN = ''
            } catch (err) {
                console.log(err)
            }
        } else {
            console.log('no input for db entry')
        }
    }

    async makeDbCall() {
        const data = await fetch('http://localhost:8000/api/dbdata', {
            method: 'GET',
            headers: { 'content-type': 'application/json' }
        })
        const result = await data.json()
        this.dbResult = result
    }

    async makeApiCall() {
        const data = await fetch('http://localhost:8000/api/somedata', {
            method: 'GET',
            headers: { 'content-type': 'application/json' }
        })
        const result = await data.json()
        // this.employees = result
        console.log(
            result
        )
        this.employees = result.employees
        console.log(this.employees)
        
    }

    setEmittedName(val: string) {
        this.emittedName = val
    }

    setEmittedDescription(val: string) {
        this.emittedDescription = val
    }

    // @Watch('showImg')
    // showImgChanged(newVal, oldVal) { console.log('showImg bool val changed') }

    toggleElements() {
        if (this.description === '' || this.name === '') {
            this.name = this.emittedName
            this.description = this.emittedDescription
        } else {
            this.name = ''
            this.description = ''
        }
        this.showImg = !this.showImg
    }

}
</script>

<style scoped>
    .sub-comp-img {
        padding: 20px 0;
        width: 200px;
    }
    .sub-comp-slot {
        padding: 4px 0;
        font-size: 13px;
    }
    .slide-btn {
        margin: auto;
        left: 0; right: 0;
        position: absolute;
    }
    /* css-controlled transitions */
    .fade-enter-active, .fade-leave-active {
        transition: all 1s;
    }
    .fade-enter, .fade-leave-to {
        opacity: 0;
        transform: translateY(50px);
    }
    /* slide-fade */
    .slide-fade-enter-active,
    .slide-fade-leave-active {
        transition: all .5s;
    }
    /* .slide-fade-leave {
        opacity: 0;
    } */
    .slide-fade-enter {
        opacity: 0;
        transform: scale(1.25) rotate(-30deg);
    }
    .slide-fade-enter-to {
        opacity: 1;
        transform: scale(1.0);
    }
    .slide-fade-leave-to {
        opacity: 0;
        transform: translateX(100px) rotate(60deg);
    }
</style>
