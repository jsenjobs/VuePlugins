<template>
  <div class="container-column">
    <div>
      <h1 class="title">Glue</h1>
      <div class="content">简洁而不简单</div>
      <div class="content">一切源自热爱--Instreet</div>
      <h3 class="title" style="margin-bottom: 6px;">联系我们</h3>
      <div class="content small-margin small-text">如果你有任何意见或者想加入我们，可以联系我们，我们将尽快回复。</div>
      <div class="content small-margin">QQ：1922279340</div>
      <div class="content">微信：jsenjobs</div>
      <h3 class="title" style="margin-bottom: 6px;">意见反馈</h3>
      <div class="content small-margin">jsen1922279340@163.com</div>
      <h3 class="title" style="margin-bottom: 6px;">捐助</h3>
      <div class="content small-margin small-text">您的每一份支持都是我们前进的动力。</div>
      <div class="horizonal">
        <div class="item">
          <div class="vertical">
            <div class="pay-title">支付宝</div>
            <img class="pay-icon" src="https://raw.githubusercontent.com/jsenjobs/Res/master/glue/alipay.png" />
          </div>
        </div>
        <div class="item">
          <div class="vertical">
            <div class="pay-title">微信</div>
            <img class="pay-icon" src="https://raw.githubusercontent.com/jsenjobs/Res/master/glue/wechat.png" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
    }
  },
  created: function () {
  },
  methods: {
  }
}
</script>

<style>
html, body {
  min-height:100%;
  height:100%;
  display: -webkit-flex;
  display: flex;
  flex-direction:column;
}
.container-column {
  display: -webkit-flex;
  display: flex;
  flex-direction:column;
  justify-content:center;
  flex: 1;
}
.title {
  text-align: center;
}
.content {
  margin-bottom: 10px;
  text-align: center;
}
.small-margin {
  margin-bottom: 4px;
}
.small-text {
  padding-left: 20px;
  padding-right: 20px;
}
.horizonal {
  display: -webkit-flex;
  display: flex;
  flex-direction:row;
  height: 100px;
  margin-top: 10px;
  margin-bottom: 21px;
}
.item {
  flex: 1;
  display: -webkit-flex;
  display: flex;
  justify-content:center;
  flex-direction:row;
}
.vertical {
  display: -webkit-flex;
  justify-content:center;
  display: flex;
  flex-direction:column;
}
.pay-title {
  text-align: center;
}
.pay-icon {
  width: 80px;
  height: 80px;
}
</style>
