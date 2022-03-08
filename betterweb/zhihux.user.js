/**
 * 名称: zhihux.user.js
 * 参考: https://userstyles.org/styles/userjs/167694/zhihux.user.js
 * 
 * 制作: https://t.me/elecV2
 **********
[rewrite]
// 以下规则仅对手机网页版有效，如使用APP 请勿添加
// 一键订阅: https://raw.githubusercontent.com/elecV2/QuantumultX-Tools/master/betterweb/zhihu.conf

// 手动添加: 
// 先重写到桌面版
^https:\/\/www\.zhihu\.com\/ url request-header (\r\n)User-Agent:.+(\r\n) request-header $1User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.82 Safari/537.36$2
// 再注入 CSS 进行优化
^https:\/\/www\.zhihu\.com\/question url script-response-body https://raw.githubusercontent.com/elecV2/QuantumultX-Tools/master/betterweb/zhihux.user.js
^https:\/\/www\.zhihu\.com\/topic url script-response-body https://raw.githubusercontent.com/elecV2/QuantumultX-Tools/master/betterweb/zhihux.user.js

// 去掉知乎跳转第三方网站的中间页面。可选，记得加 mitmhost: link.zhihu.com
^https?://link\.zhihu\.com/\?target=(https?)%3A//(.*) url 307 $1://$2

// 可选。知乎专栏底部推荐阅读文章直接打开，免跳转应用商店。mitmhost: oia.zhihu.com
^https:\/\/oia\.zhihu\.com\/answers\/([0-9]+)\?.* url 307 https://www.zhihu.com/answer/$1
^https:\/\/oia\.zhihu\.com\/articles\/([0-9]+)\?.* url 307 https://zhuanlan.zhihu.com/p/$1

[mitm]
www.zhihu.com
**/

if (typeof $response !== 'undefined') {
  let body = $response.body

  if (/<\/html>|<\/body>/.test(body)) {
    body = body.replace('</head>', `<style type="text/css">*{box-sizing: border-box;;min-width: initial!important;max-width: 100%!important;}html{overflow-y: auto!important;}body{position: absolute!important;top: 0!important;width: 100%;-webkit-font-smoothing: antialiased;text-rendering: optimizeLegibility;}.RichContent-actions.is-fixed,.Question-sideColumn,.ContentLayout-sideColumn,.QuestionHeader-footer,#free-reward-panel,.show-foot,.meta-bottom,.QuestionHeader-profile{display: none !important;}.Question-mainColumn,.ContentLayout-mainColumn{width: 100% !important;margin: 0!important;padding: 6px!important;}#free-reward-panel,.AdblockBanner,.AppHeader-Tabs,.AppHeader-userInfo,.Modal-wrapper,.Pc-word,.Question-sideColumn,.QuestionHeader-footer,.RichContent-actions.is-fixed,.meta-bottom,.show-foot,body > div:last-child,.Question-mainColumnLogin,.Profile-sideColumn,.QuestionHeader-side,.ModalWrap,.ShareMenu{display: none!important;}.Topstory{padding: 0!important;}.GlobalSideBar,.Question-sideColumn,.QuestionHeader-side,.TopstoryItem--advertCard,.TopstorySideBar,.css-1qefhqu{display: none!important;}.AppHeader,.AppHeader-widescreenResponsive .AppHeader-inner{box-sizing: content-box!important;;width: 100%!important;min-width: 100%!important;padding: 0!important;}.QuestionHeader{min-width: initial;}.Question-mainColumn,.Topstory-mainColumn,.TopstoryMain,.TopstoryV2-mainColumn{width: 100%!important;max-width: 100%!important;}.Topstory-mainColumn{margin: 0!important;}.TopstoryItem .ZVideoItem{margin: 0;}.TopstoryItem .ZVideoItem .RichContent{overflow: hidden;;margin-top: 20px;}.ContentItem-more .ContentItem-arrowIcon{vertical-align: -2px;}.AnswerItem,.ArticleItem,.Layout-main.av-card{font-size: 120%!important;}.RichText pre{font-size: 90%!important;padding: .8em 1.2em!important;;padding-top: .6em;padding-bottom: .6em;}.RichText code,.RichText pre{font-family: 'JetBrains Mono',FiraMono-Regular,Menlo,Courier,monospace!important;}.ContentItem-time,.Post-Header,.Post-NormalMain > div,.Post-NormalSub .Comments-container,.Post-RichTextContainer,.Post-topicsAndReviewer,.PostIndex-Contributions,.TitleImage{width: 100%!important;}.Post-RichText{font-size: 18px;}.Footer{display: none!important;}.SearchResult-Card .ContentItem-title{color: #0084ff!important;}.Search-container .RichContent.is-collapsed .RichContent-inner{font-size: 16px!important;}.Profile-lightList{padding: 6px 20px;}.Profile-lightItem:first-child{border-top: 0 none!important;}.Profile-lightItem:last-child{border-bottom: 0 none!important;}.ProfileMain .RichContent{line-height: 1.8;}.ContentItem-actions{margin: 6px 0;padding: 0;;flex-wrap: wrap;justify-content: space-between;}.QuestionHeader-main,.Question-main{padding: 0;}.Post-Main{margin: 0 2em;}.AppHeader-inner.css-qqgmyv{padding: 6px 10px;}.QuestionHeader-content{padding: 0 12px;}.List-item{padding: 10px 12px;}</style></head>`)

    console.log('添加 tamperJS: zhihux.user.js')
  }
  $done({ body })
} else {
  console.log('zhihux.user.js 用于重写 rewrite 规则，请勿直接运行该脚本\nBY: https://t.me/elecV2')
  $done()
}