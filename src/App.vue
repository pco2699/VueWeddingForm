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
  #app {
    font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", YuGothic, "ヒラギノ角ゴ ProN W3", Hiragino Kaku Gothic ProN, Arial, "メイリオ", Meiryo, sans-serif;
  }

</style>
