/**
 * 用于去除谷歌搜索结果的重定向
 * 更新频道：https://t.me/elecV2
 *
 * QuanX 重写订阅：https://raw.githubusercontent.com/elecV2/QuantumultX-Tools/master/google/rewriteG.conf
 *
 * 或者手动添加：
 * [rewrite]
 * ^https://www\.google\.com/url\? url script-echo-response https://raw.githubusercontent.com/elecV2/QuantumultX-Tools/master/google/google_noredirect.js
 *
 * [mitm host]
 * www.google.com
 **/

if (typeof $request !== 'undefined') {
  const urlorg = $request.url
  let urlnew = urlorg.match(/url=([^&]+)/)
  if (urlnew) {
    // console.log(JSON.stringify(urlnew))
    $done({
      status: 'HTTP/1.1 307 Temporary Redirect',
      headers: { "Location": decodeURIComponent(urlnew[1]) }
    })
  } else {
    $done({})
  }
} else {
  console.log('脚本用于重写(rewrite) 网络请求，请勿直接运行该脚本\n问题反馈: https://t.me/elecV2')
  typeof $done !== 'undefined' && $done()
}