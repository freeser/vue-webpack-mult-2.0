<template>
  <div id="app">
    <img class="logo" src="../assets/img/zjh.png">
    <hello :title="'404 / 500'" :subtitle="'页面异常！请重试或者联系管理员。'"></hello>
    <p>
      版权归北京康信医疗信息技术有限公司所有
    </p>
  </div>
</template>

<script>
  import Hello from '@components/Hello'

  export default {
    components: {
      Hello
    }
  }

</script>

<style>
  html {
    height: 100%;
  }

  body {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  #app {
    color: #2c3e50;
    margin-top: -100px;
    max-width: 600px;
    font-family: Source Sans Pro, Helvetica, sans-serif;
    text-align: center;
  }

  #app a {
    color: #42b983;
    text-decoration: none;
  }

  #app p {
    position: absolute;
    bottom: 1em;
    left: 0;
    width: 100%;
  }

  .logo {
    width: 140px;
    margin: 1.5em auto;
  }
</style>