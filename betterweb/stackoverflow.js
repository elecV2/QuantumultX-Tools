/**
 * 名称: stackoverflow.js
 * 说明: stackoverflow 网页显示优化
 * 制作: https://t.me/elecV2
 * 更新: 2022-08-22 19:56
 **********
[rewrite]
// 一键订阅: https://raw.githubusercontent.com/elecV2/QuantumultX-Tools/master/betterweb/stackoverflow.snippet

// 或者手动添加:
// 注入 CSS 进行优化
^https://stackoverflow|superuser\.com/question url script-response-body https://raw.githubusercontent.com/elecV2/QuantumultX-Tools/master/betterweb/stackoverflow.js

^https://.+\.stackexchange\.com/question url script-response-body https://raw.githubusercontent.com/elecV2/QuantumultX-Tools/master/betterweb/stackoverflow.js

[mitm]
stackoverflow.com, *.stackexchange.com, superuser.com
 *
 * 备注: 理论上适用于所有 stackexchange 模板网站 https://stackexchange.com/sites
**/

if (typeof $response !== 'undefined') {
  let body = $response.body

  if (/<\/head>/.test(body)) {
    body = body.replace(/<\/head>/, `<style type="text/css">.pl8,#left-sidebar,#sidebar,#js-gdpr-consent-banner,.bs-sm,.ws4, .js-consent-banner,.ml12,.post-taglist,.js-post-menu,.postcell .mt24,.-flair span:not(.reputation-score),.ai-end,.v2cele,.gs8>.mr16,.gsx>.d-flex,.js-dismissable-hero,.site-header,.js-new-contributor-indicator{display: none !important}#content {padding: 3px 6px !important;border: none !important;}#mainbar{width: 100% !important}.votecell.post-layout--left {position: absolute;right: 1em;padding-right: 0px !important;opacity: .6;}.post-layout--left:hover {opacity: 1;}.user-info {display: flex;padding-bottom: 0 !important;}.user-action-time {min-width: 272px;white-space: nowrap;z-index: 0;margin-top: 4px !important;}.relativetime {font-size: 22px;color: #FAFAFD;}.comments.js-comments-container,.postcell .mb16,.answercell .mt24,.post-layout--right,.gs8.gsy,.js-top-bar{margin: 0 !important;padding: 0 !important;}.js-top-bar{padding-right: 1em !important;}.post-layout {border: 1px solid #003153;border-radius: 6px;overflow: hidden;}.js-post-body {padding: 6px;}.post-signature.flex--item {width: 380px;max-width: 100%;height: 42px;background: #003153;border-radius: 0px;margin-bottom: 0 !important;}.comment-actions {width: 22px !important;}.comment-score {width: 22px !important;padding-right: 0 !important;text-align: right;}.gs8{justify-content: space-around !important;}.user-details{white-space: nowrap;text-overflow: ellipsis;overflow: hidden;}.new-login-form {max-width: 100%;margin: 0;}pre code {white-space: pre-wrap;}</style></head>`)

    // console.log('添加 tamperJS: stackoverflow.js')
  }
  $done({ body })
} else {
  console.log('stackoverflow.js 用于重写(rewrite) 网络请求，请勿直接运行该脚本\nBY: https://t.me/elecV2')
  $done()
}