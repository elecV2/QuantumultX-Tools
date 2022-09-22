/**
 * simplifyurl - 移除 Google 搜索 url 中多余的参数
 * 说明：在自动加载下一页时有问题，待修复
 ****************
 
[rewrite]
// 以下两种方式任选其一
https://www\.google\.com/(m|search)\? url script-request-header https://raw.githubusercontent.com/elecV2/QuantumultX-Tools/master/google/simplifyurl.js

// 307 重定向，无需 JS。缺点是不能翻页、无法查看图片/视频等其他搜索项
// https:\/\/www\.google\.com\/(m|search).+(q=[^&]+)&.+ url 307 $1?$2

[mitm]
hostname = www.google.com

 ********
 * 作者: TG@elecV2
**/

if (typeof $request === 'undefined') {
  console.log('脚本用于重写(rewrite) 网络请求，请勿直接运行该脚本\n问题反馈: https://t.me/elecV2')
  typeof $done !== 'undefined' && $done()
}

const url = $request.url
if (!url.match(/\?/)) {
  $done({})
}

const qs = {
  google: ['q', 'location', 'uule', 'hl', 'nfpr', 'filter', 'tbm', 'tbs', 'start', 'num', 'lr', 'ijn', 'nirf', 'safe']
}

let urlb = new URL(url);

const skey = [];
qs.google.forEach(key=>{
  const v = urlb.searchParams.get(key);
  if (v) {
    skey.push(`${key}=${v}`);
  }
});
if ([...urlb.searchParams].length !== skey.length) {
  const path = urlb.pathname + '?' + encodeURI(skey.join('&'));
  console.log(`${url} redirectPath to ${path}`);
  $done({ path });
} else {
  $done({});
}