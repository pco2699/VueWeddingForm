<template>
  <div id="app">
    <nav-bar/>
    <message/>
  </div>
</template>

<script>
import NavBar from './components/NavBar'
import Message from './components/Message'

export default {
  name: 'App',
  components: {
    NavBar,
    Message
  }
}
</script>

<style>

</style>
