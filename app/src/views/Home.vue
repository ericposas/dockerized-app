<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/> -->
    <h2 v-text="title"></h2>
    <br>
    <div>String: {{ completeString }}</div>
    <br>
    <!-- <br> -->
    <input class="input" :value="inputVal" @input="inputVal = $event.target.value" />
    <br>
    <br>
    <div class="btn" @click="clickHandler">Change String</div>
    <br>
    <!-- <div>Was another method called yet? {{ methodCalled }}</div> -->
    <div
    v-if="methodCalled"
    >
      Our second method was called with the value <span class="var">{{ completeString }}</span>!
    </div>
  </div>
</template>

<style scoped>
  .var {
    color: red;
    font-weight: bold;
  }
  .btn {
    margin: auto;
    position: relative;
    width: fit-content;
    padding: 20px;
    border: 1px solid #ccc;
    user-select: none;
    border-radius: 3px;
    transition: all .35s;
    transform: scale(1.0);
    /* font-size: 30px; */
  }
  .btn:hover {
    cursor: pointer;
    transition: all .35s;
    transform: scale(1.05);
  }
</style>

<script lang="ts">
import Vue from 'vue';
import HelloWorld from '../components/HelloWorld.vue'; // @ is an alias to /src
import { Component } from 'vue-property-decorator';

@Component({
  components: {
    // HelloWorld,
  },
})
export default class Home extends Vue {
  // private testString = 'hello there';
  private title: string = 'Learning Vue 2';
  private inputVal: string = 'null';
  private completeString: string = '';
  private placeholderString: string = '';
  private setMethodCalled: boolean = false;
  get methodCalled() {
    return this.setMethodCalled;
  }
  set methodCalled(val) {
    this.setMethodCalled = val;
  }
  get testString() {
    return this.completeString;
  }
  set testString(value: string) {
    // this.completeString = `${this.testString} ${value}`;
    this.completeString = `${value}`;
  }
  private anotherMethodCall(val: boolean) {
    this.methodCalled = val;
  }
  private clickHandler() {
    // this.testString = 'new';
    // this.testString = this.placeholderString;
    this.testString = this.inputVal;
    this.inputVal = '';
    this.anotherMethodCall(true);
  }
}

// export default Vue.extend({
//   name: 'Home',
//   components: {
//     // HelloWorld,
//   },
//   data() {
//     return {
//       testString: 'a test string',
//     };
//   },
// });
</script>
