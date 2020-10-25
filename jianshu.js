/**
 * 名称：jianshu.js
 * 作者：elecV2
 *
 ******** Quantumult X conf ********

host = www.jianshu.com

// 以下规则仅对手机网页版有效，如使用APP 请勿添加
// 先重写到桌面版
^https:\/\/www\.jianshu\.com\/p url request-header (\r\n)User-Agent:.+(\r\n) request-header $1User-Agent: Mozilla/5.0 (Windows Phone 10)$2
// 再注入 CSS 进行优化
^https:\/\/www\.jianshu\.com\/p url script-response-body https://raw.githubusercontent.com/elecV2/QuantumultX-Tools/master/jianshu.js

 ********
 * 频道: https://t.me/elecV2
**/

let body = $response.body

if (/<\/html>|<\/body>/.test(body)) {
  body = body.replace('</head>', `<style type="text/css">
*{max-width:100%!important;box-sizing:border-box!important;}.side-tool, #note-fixed-ad-container, #free-reward-panel, .show-foot, .meta-bottom, aside, nav, ._13lIbp, ._3Pnjry, ._7hb9O4, ._1kCBjS, .note-graceful-button, .call-app-btn, .recommend-ad{display:none !important}._3VRLsv, .ouvJEz{padding: 12px}.post{width:86% !important}
</style></head>`)

  console.log('添加 tamperJS：jianshu.js')
}

$done({ body })