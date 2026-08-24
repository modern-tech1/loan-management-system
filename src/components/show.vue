<template>
  <div>
    <p>let see about ruhango</p>
  <button v-on:click="tap">see more</button>
  <div v-if="show">
<h1>ruhango district</h1>
<p>this district is located at southern province<br>and it has nine(9) sectors</p>
  </div>
  </div>
</template>
<script>
  export default{
    data(){
      return{
        show:false
      }
    },
    methods:{
      tap(){
        this.show=!this.show
      }
    }
  }
</script>
