/**
 * simplifyurl - 移除 Google 搜索 url 中多余的参数
 ****************
 
[rewrite]
// 以下两种方式任选其一
https:\/\/www\.google\.com\/(m|search).+(q=[^&]+)&.+ url script-request-header https://raw.githubusercontent.com/elecV2/QuantumultX-Tools/master/google/simplifyurl.js

// 307 重定向，无需 JS。缺点是不能翻页、无法查看图片/视频等其他搜索项
// https:\/\/www\.google\.com\/(m|search).+(q=[^&]+)&.+ url 307 $1?$2

[mitm]
hostname = www.google.com

 ********
 * 作者: TG@elecV2
**/

const log = true

const url = $request.url
if (!url.match(/\?/)) {
  $done({})
}

const qs = {
  google: ['q', 'location', 'uule', 'hl', 'nfpr', 'filter', 'tbm', 'tbs', 'start', 'num', 'lr', 'ijn', 'nirf', 'safe']
}

const qkey = []

function getQs(url, key) {
  let kp = url.match(key + '=[^&]+')
  return kp ? kp[0] : null
}

qs.google.forEach(sp=>{
  let qs = getQs(url, sp)
  if(qs) qkey.push(qs)
})

let path = '/m?' + qkey.join('&')
// path = '/m?q=elecV2'    // 验证脚本是否生效

if(log) console.log('simply url path to ' + path)

$done({ path })