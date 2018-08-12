<template>
  <div id="app">
    <nav-bar/>
    <div id="content">
      <message/>
      <w-form/>
    </div>
  </div>
</template>

<script>
import NavBar from './components/NavBar'
import Message from './components/Message'
import WForm from './components/WForm'

export default {
  name: 'App',
  components: {
    NavBar,
    Message,
    WForm
  }
}
</script>

<style>
  #app {
    font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", YuGothic, "ヒラギノ角ゴ ProN W3", Hiragino Kaku Gothic ProN, Arial, "メイリオ", Meiryo, sans-serif;
  }
  #content {
    margin: 0 10%;
  }

</style>
