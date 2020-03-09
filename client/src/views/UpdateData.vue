<template>
  <div>
    <h1>This is an an Update data page</h1>
    <form
    id="app"
    @submit="glucoseform"
    method="post"
    >
        
        <input id="datetime" v-model="datetime" placeholder="enter date and time">    
        <input id="glucoseLevel" v-model="glucoseLevel" placeholder="enter glucose level">
        <p>Glucose level is: {{ glucoseLevel }}</p>

        <input type="submit" value="Submit">
 



    </form>

  </div>
</template>
