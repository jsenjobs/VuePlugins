<template>
  <div class='box' :style="valueContainer">
    <div style="display: -webkit-flex;display: flex;flex:1;overflow:auto;justify-content:center;flex-direction:column;">
      <div v-if='showLogo' style="display: -webkit-flex;display: flex;justify-content:center;">
        <div :style="logoImage"></div>
      </div>
    </div>
      <div class='box-h'>
          <input class="search-input" id="search-box" type="text"
            placeholder='搜索关键字'
            v-model='key'
            @keyup='getKey'
            @keydown.40.prevent="itemDown"
            @keydown.38.prevent="itemUp"
            @keyup.enter='open'
            v-focus>
      </div>
      <div class='box-h' style="flex:1;">
      <div style="overflow:auto;width:80%;">
        <ul class="s-ul">
          <li class="s-li" v-show='lists.length!=0' v-for='(item, index) in lists' v-bind:key='index' :class="{sitem:current == index}"
            @click='openUrl(item)'
            @mouseover='over(index)'
            @mouseout='out()'
          >{{item}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import engine from './engine.json'
export default {
  name: 'App',
  data () {
    return {
      valueContainer: {
        // backgroundImage: 'url(' + require('./devassets/timg.jpeg') + ')',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      },
      logoImage: {
        width: '80px',
        height: '80px',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundImage: 'url(' + require('../../assets/ic_launcher_round.js').data + ')'
      },
      showLogo: true,
      selectedEngine: '百度',

      key: '',
      oKey: '',
      lists: [],
      current: -1,
      sUrls: {}
    }
  },
  created: function () {
    var self = this
    window.sogou = {}
    window.sogou.sug = (json) => {
      self.lists = json[1]
    }
    window.youdao = {}
    window.youdao.setSearchMoreParams = (str) => {
    }
    window.youdao.updateCall = (data) => {
      // console.log(decodeUTF8(data))
    }
    this.sUrls = engine
    let se = prompt('jjs://HOMECUSTOMER#hold')
    if (se && se !== 'OK') {
      try {
        let data = JSON.parse(se)
        this.selectedEngine = data.engine
        if (data.backgroundImage) {
          this.valueContainer.backgroundImage = 'url(' + data.backgroundImage + ')'
        }
        if (data.showLogo != null) {
          this.showLogo = data.showLogo
        }
        if (data.logoSrc) {
          this.logoImage.backgroundImage = 'url(' + data.logoSrc + ')'
        }
      } catch (e) {}
    }
  },
  methods: {
    getKey: function (events) {
      if (events.keyCode === 40 || events.keyCode === 38 || events.keyCode === 13) return
      this.current = -1
      var uc = this.getUc()
      if (!uc) return

      if (this.selectedEngine === '搜狗') {
        this.hintFromSougou(uc, this.key)
        return
      }
      if (this.selectedEngine === '淘宝') {
        this.hintFromTaobao(uc, this.key)
        return
      }
      var params = {}
      params[uc.kW] = this.key
      this.$http.jsonp(uc.hint, {
        params: params,
        jsonp: uc.jsonp
      }).then((res) => {
        this.lists = res.data[uc.hS]
      })
      this.oKey = this.key
    },
    hintFromSougou: function (uc, key) {
      var params = {}
      params[uc.kW] = key
      params = Object.assign(params, uc.params)
      this.$http.jsonp(uc.hint, {params: params, jsonp: uc.jsonp}).then()
    },
    hintFromTaobao: function (uc, key) {
      var params = {}
      params[uc.kW] = key
      this.$http.jsonp(uc.hint, {params: params, jsonp: uc.jsonp}).then((res) => {
        var result = res.data.result
        var self = this
        if (result) {
          self.lists = []
          result.forEach((item) => {
            self.lists.push(item[0])
          })
        }
      })
    },
    itemDown: function () {
      this.current++
      if (this.current >= this.lists.length) this.current = -1
      if (this.current === -1) {
        this.key = this.oKey
      } else {
        this.key = this.lists[this.current]
      }
    },
    itemUp: function () {
      this.current--
      if (this.current <= -2) {
        this.current = this.lists.length - 1
      }
      if (this.current === -1) {
        this.key = this.oKey
      } else {
        this.key = this.lists[this.current]
      }
    },
    open: function (events, u) {
      /*
      var url = u
      if (!url) {
        var uc = this.getUc()
        if (!uc) return
        url = uc.search + this.key
        if (this.current >= 0) {
          url = uc.search + this.lists[this.current]
        };
      }
      this.key = ''
      this.lists = []
      this.current = -1
      window.open(url)
      */
      prompt('jjs://SEARCH#' + this.key)
    },
    openUrl: function (item) {
      /*
      var uc = this.getUc()
      if (!uc) return
      this.open(null, uc.search + item)
      */
      prompt('jjs://SEARCH#' + item)
    },
    getUc: function () {
      var uc = this.sUrls[this.selectedEngine]
      if (!uc) {
        this.selectedEngine = '百度'
        uc = this.sUrls[this.selectedEngine]
      }
      return uc
    },
    over: function (index) {
      this.current = index
    },
    out: function () {
      this.current = -1
    }
  }
}
</script>

<style>
.box {
    position:absolute;
    top:0px;
    bottom:0px;
    left:0px;
    right:0px;
    display: -webkit-flex;
    display: flex;
    justify-content:center;
    flex-direction:column;
}
.box-h {
    display: -webkit-flex;
    display: flex;
    justify-content:center;
    flex-direction:row;
}
.search-input {
    border:1px solid black;
    width:80%;
    padding:12px;
    padding-top:14px;
    padding-bottom:10px;
    border-radius:50px;
    outline:none;
    background-color: transparent;
}
::-webkit-input-placeholder { /* WebKit browsers */
  color:#000;
}
:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
  color:#000;
}
::-moz-placeholder { /* Mozilla Firefox 19+ */
  color:#000;
}
:-ms-input-placeholder { /* Internet Explorer 10+ */
  color:#000;
}
.sitem {
  background: #ccc;
}
.s-li {
  cursor: pointer;
  padding: 8px;
  margin: 0px;
}
.s-ul {
  list-style-type:none;
  padding: 0px;
  margin: 0px;
  width: 100%;
  background: #efefef;
}

</style>
