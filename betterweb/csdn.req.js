/**
 * 名称: csdn.req.js
 * 作用: blog.csdn.net 免跳转应用商店
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
 * 更新频道: https://t.me/elecV2
**/

if (typeof $request !== 'undefined') {
  let url = $request.url
  let b64 = url.split('/').pop()
  let obj = atob(b64)
  
  obj = JSON.parse(obj)

  $done({
    status: "HTTP/1.1 307 Temporary Redirect",
    headers: { "Location": obj.d.url },
  })
} else {
  console.log('csdn.req.js 用于 rewrite 重写规则，请勿直接运行\nBY: https://t.me/elecV2')
  $done()
}