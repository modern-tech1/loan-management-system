<template>
    <div class="aa">
      <fieldset>
        <h1 style="color: rgb(15, 15, 15);">login page</h1>
      <label for="">USERNAME:</label>
      <input type="text"v-model="username"/><br><br>
      <label for="">PASSWORD:</label>
      <input type="password"v-model="password"/><br><br>
      <button style="background-color: blue; width: 130px; height: 50px; border-radius: 10px;margin-left: 40px;">login</button>
      <p>you don't have an account? <a href="#">create</a></p>
    </fieldset>
    </div>
  </template>
  <script>
    export default{
      data(){
        return{
          username:"",
          password:""
        }
      }
    }
  </script>
  <style>
    fieldset{
      margin-top: 100px;
      margin-left: 200px;
      margin-right: 200px;
      background-color: white;
      border-radius: 50px;
    }
    input{
      width: 200px;
      height: 25px;
      border-radius: 10px;
    }
    label{
      color: black;
    }
    a{
      text-decoration: auto;
    }
  </style>  
  