/**
 * 名称：baiduPan.js
 * 说明：百度网盘手机网页优化
 *
 ******** (已修改) 以下为 tamperJS 自动生成的 rewrite 相关信息，可能需要根据情况适当调整 ********

[rewrite]
^https:\/\/pan\.baidu\.com url request-header (\r\n)User-Agent:.+(\r\n) request-header $1User-Agent: Mozilla/5.0 (Windows Phone 10)$2

^https:\/\/pan\.baidu\.com url script-response-body https://raw.githubusercontent.com/elecV2/QuantumultX-Tools/master/baiduPan.js

[mitm]
pan.baidu.com

 ********
 * 工具: tamperJS BY @elecV2
 * 频道: https://t.me/elecV2
**/

let body = $response.body

if (/<\/html>|<\/body>/.test(body)) {
  body = body.replace('</head>', `<style>
* {max-width: 100% !important;box-sizing: border-box;}#layoutAside, #layoutHeader, .EzLavy, .OFaPaO, div[class*=ad-], .cloud-bg, [class*=banner],.bd-aside {display: none !important;}.tools-more {display: inline-table !important;}#layoutApp {min-width: 100% !important;}#layoutMain, #aapAWV,.acss-header {position: absolute;top: 0 !important;left: 0 !important;right: 0 !important;margin: 0 !important;}.frame-content{margin: 0 !important;}.file-name {width: 53% !important;}.jhgmqNAl {overflow: hidden;text-overflow: ellipsis;width: 30% !important;}.slide-show-left, .slide-show-right, .slide-show-left h2.file-name {width: 100% !important;}.x-button-box {min-width: 120px !important;height: initial !important;display: flex;flex-wrap: wrap;justify-content: space-around;}.module-share-top-bar .bar {float: initial !important;right: 0 !important;}.dialog {left: 0 !important;}.KPDwCE .NHcGw .g-dropdown-button .menu, .g-dropdown-button.button-open>.menu {position: unset!important;display: inline-table !important;}.DxdbeCb .thqvm4 {margin-right: 0 !important;}.DxdbeCb .QDDOQB {margin-left: 50px !important;}#mkG63p {height: 40px;}.clearfix.input-area {display: flex;align-items: center;justify-content: space-around;}#bd, #bd-main .bd-left {margin: 0 !important;padding: 0 !important;min-width: initial !important;}
</style></head>`)

  console.log('添加 tamperJS：baiduPan.js')
}

$done({ body })