/**
 * 名称: smzdm.res.js
 * 作用: SMZDM 手机网页优化
 *
 ******** QuantumultX conf ********
// 规则仅对手机网页版有效，如使用APP 请勿添加
// QuantumultX rewrite 订阅地址: https://raw.githubusercontent.com/elecV2/QuantumultX-Tools/master/betterweb/smzdm.conf

hostname = post.smzdm.com, post.m.smzdm.com

// post.m.smzdm.com 重定向及更改到桌面版 User-Agent
^https:\/\/post\.m\.smzdm\.com url 307 https://post.smzdm.com
^https:\/\/post\.smzdm\.com\/ url request-header (\r\n)User-Agent:.+(\r\n) request-header $1User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36$2

// 再注入 CSS 进行优化
^https:\/\/post\.smzdm\.com\/ url script-response-body https://raw.githubusercontent.com/elecV2/QuantumultX-Tools/master/betterweb/smzdm.res.js

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
      logshow: cookieMod.get('smzdm_log_show') === 'false' ? false : true,   // 是否显示 JS 注入成功的 log。默认 true: 显示
    }

    body = body.replace('</head>', `<meta name="viewport" content="width=device-width,initial-scale=1"><style type="text/css">*{box-sizing: border-box!important;min-width: initial!important;max-width: 100%!important;}html{overflow-y: auto!important;}body{position: absolute!important;top: 0!important;width: 100%;-webkit-font-smoothing: antialiased;text-rendering: optimizeLegibility;}#elevator,#feed-side,#global-nav,.experience-meta-nowrap,.fusion-card,#footer,.article-card,.sub-right-content,#J_hot_price,.right-return-top,#J_guide_toast,.btn-open-app,.tags-wrapper-news,.buying-guide,.hot-price,.discount-list,.module-title,.module-like-wrap,.recommend-goods-wrapper,.basis-tab,.logo-download,.come_from,.comment_operate,#textCommentSubmit br,#J_old_mention,.header-wrap-menu,.feed-right-top,aside,.form_search,.write-article,.category-rec{display: none !important;}.header-white .logo-search{width: 70%;}.J_user_focus_detail{position: absolute;right: 1em;}#feed-wrap,.search-inner,.logo_search,.comment_list,.primary-filter-tab,#feed-main-list,.z-feed-foot-r,.category-title,.list-border{display: flex;justify-content: center;flex-wrap: wrap;}.crumbs{line-height: 1.5em;height: initial;margin: 5px 12px;}#feed-main .m-contant{margin: 0 12px;}.author-card-left.z-clearfix{position: relative;padding: 0 12px;}.z-biaoqian{position: absolute;top: 4em;right: 1em;}.experience-zan.z-clearfix{margin-bottom: 2em;padding-bottom: 1em;}#feed-main .the-end{padding: 6px 0 2em;}#comments{padding-top: 15px;}.comment_sendwrap,#global-search{position: relative;padding-top: 0!important;}.comment_share.new-comment-share{width: 100%;height: 28px;}.slick-track{max-width: initial !important;}.primary-filter-tab-wrapper.J_fixed_tab{top: 0;}.z-group-data{padding-left: 0 !important;}.post-list .pic-left{width: 30%;height: 60px;}.post-list .pic-left img{height: 60px;}.post-list .list-right{width: 67%;margin-left: 2%;}.post-list .item-info{position: absolute;left: 0;}.list.post-list{margin-bottom: 1em;}.post-list .item-name{height: 60px;}.comment_listBox .comment_list {flex-wrap: nowrap;}</style></head>`)

    if (config.logshow) {
      console.log('smzdm 手机网页优化')
    }
  }
  $done({ body })
} else {
  console.log('smzdm.res.js 用于 rewrite 重写规则，请勿直接运行\nBY: https://t.me/elecV2')
  $done()
}