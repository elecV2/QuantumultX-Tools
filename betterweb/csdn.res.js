/**
 * 名称: csdn.res.js
 * 作用: blog.csdn.net 手机网页优化
 *
 ******** QuantumultX conf ********
// 规则仅对手机网页版有效，如使用APP 请勿添加
// QuantumultX rewrite 订阅地址: https://raw.githubusercontent.com/elecV2/QuantumultX-Tools/master/betterweb/csdn.conf

hostname = blog.csdn.net, *.openinstall.io

// 先重写到桌面版
^https:\/\/blog\.csdn\.net\/ url request-header (\r\n)User-Agent:.+(\r\n) request-header $1User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36$2

// 再注入 CSS 进行优化
^https:\/\/blog\.csdn\.net\/.*\/article\/details url script-response-body https://raw.githubusercontent.com/elecV2/QuantumultX-Tools/master/betterweb/csdn.res.js

// 免跳转应用商店(也可以直接 filter 屏蔽 openinstall.io)
^https:\/\/wvhzpj\.openinstall\.io\/ulink url script-echo-response https://raw.githubusercontent.com/elecV2/QuantumultX-Tools/master/betterweb/csdn.req.js

 ********
 * 频道: https://t.me/elecV2
**/

if (typeof $response !== 'undefined') {
  let body = $response.body

  if (/<\/html>|<\/body>/.test(body)) {
    const cookieMod = {
      get(key){
        if (typeof $store !== "undefined") return $store.get(key)
        if (typeof $prefs !== "undefined") return $prefs.valueForKey(key)
        if (typeof $persistentStore !== "undefined") return $persistentStore.read(key)
        if (typeof localStorage !== "undefined") return localStorage.getItem(key)
      }
    }

    let config = {
      recommendblock: cookieMod.get('csdn_recommend_block') === 'false' ? false : true,     // 是否屏蔽推荐文章。默认 true: 屏蔽
      logshow: cookieMod.get('csdn_log_show') === 'false' ? false : true,   // 是否显示 JS 注入成功的 log。默认 true: 显示
    }

    body = body.replace('</head>', `<style type="text/css">*{min-width: initial !important;box-sizing:border-box}html{overflow-y:auto!important}body{-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;position:absolute!important;top:0!important;width: 100%;}.more-toolbox,.blog-footer-bottom,.csdn-side-toolbar,.slide-content-box,.blog-tags-box,.operating,#blog_detail_zk_collection,.article-copyright,#csdn-toolbar,aside,.tool-box,.template-box,.item-m,.dec,.more,.tool-item,.passport-login-container,.signin,#blogColumnPayAdvert${ config.recommendblock ? ',.recommend-box,.recommend-tit-mod' : '' }{display:none !important}main,.content{width:100% !important}.blog_title_box{width:unset !important}#mainBox {margin-left: 0;max-width: 100%;}.blog-content-box,.main_father,.recommend-item-box{padding: 8px 2px 0 4px!important;}.hljs-ln{overflow-x: auto !important;display: flex;flex-wrap: wrap;}.htmledit_views code ol li {display: inline-flex;width: 100%;}.article-type-img {position: absolute;right: 0;margin-right: 0!important;background: #de3e31d6;border-radius: 15px 5px 5px 15px;}.time{position: absolute!important;top:-1.8em;right:0;}.article-bar-top{align-items: center;}pre,code{user-select: text!important;}</style></head>`)

    if (config.logshow) {
      console.log('CSDN 手机网页优化')
    }
  }
  $done({ body })
} else {
  console.log('csdn.res.js 用于 rewrite 重写规则，请勿直接运行\nBY: https://t.me/elecV2')
  $done()
}