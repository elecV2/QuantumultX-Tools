/**
 * 名称：v2ex.js
 *
 ******** (已修改) 以下为 tamperJS 自动生成的 rewrite 相关信息，可能需要根据情况适当调整 ********

[rewrite]
^https:\/\/v2ex\.com url script-response-body v2ex.js

[mitm]
v2ex.com

 ********
 * 工具: tamperJS BY @elecV2
 * 频道: https://t.me/elecV2
**/

let body = $response.body

if (/<\/html>|<\/body>/.test(body)) {
  body = body.replace('</head>', `<style>
#ad_unit,
#google-center-div,
.box:last-child {
    display: none !important;
}
</style></head>`)

  console.log('添加 tamperJS：v2ex.js')
}

$done({ body })