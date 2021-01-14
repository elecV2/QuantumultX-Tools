/**
 * 名称：cookieshow.js
 * 功能：显示任意网页的cookie。（网页 cookie 和实际向服务器发送请求的 cookie 可能有所不同）
 * 
 * 制作：elecV2
 *
 ******** 以下为 tamperJS 自动生成的 rewrite 相关信息，可能需要根据情况适当调整 ********

// bean.m.jd.com 可以更换为任意其他域名，比如 baidu.com, www.google.com 等
[rewrite]
https:\/\/bean\.m\.jd\.com\/ url script-response-body cookieshow.js

[mitm]
, bean.m.jd.com

 ********
 * 工具: tamperJS BY @elecV2
 * 频道: https://t.me/elecV2
 *
**/

let body = $response.body

if (/<\/html>|<\/body>/.test(body)) {
  body = body.replace('</body>', `
<script>const elecJSPack = function(elecV2){
/****** tamperJS 日志输出 ******/
document.body.insertAdjacentHTML("beforeend",\`<ul id='tamperJSLog' style='background: #000000a8;color: #eee;position: fixed;bottom: 1em;top: initial;right: 0;left: 0;width: 95%;margin: 0 2%;border-radius: 8px;font-size: 16px;line-height: 1.6em;list-style: none;padding: 8px 12px;max-height: 100%;overflow: auto;white-space: pre-wrap;word-break: break-all;z-index: 9999 ;box-sizing: border-box' ondblclick="this.style.height === '2em'?Object.assign(this.style, { top: '1em', height: 'initial' }):Object.assign(this.style, { top: 'initial', height: '2em' })"><span style="position: sticky;top: 61.8%;font-size: 8px;opacity: 0.5;line-height: 1em;float: right;margin-right: 1em;">tamperJS by @elecV2</span></ul>\`);
const tamperJSLog = document.querySelector("#tamperJSLog");
tamperJSLog.addEventListener('click', (evt) => {
  if (evt.detail === 3) {
    document.querySelectorAll('#tamperJSLog li').forEach(e=>e.remove())
  }
})
const elecV2 = console;
window.console = {
  ...elecV2,
  log:(...e)=>{
    e=e.map(e=>"string"!=typeof e?JSON.stringify(e):e).join(" ")
    tamperJSLog.insertAdjacentHTML("afterbegin","<li>"+e+"</li>") 
    elecV2.log(e)
  },
  error:(...e)=>{
    e=e.map(e=>"string"!=typeof e?JSON.stringify(e):e).join(" ")
    tamperJSLog.insertAdjacentHTML("afterbegin",'<li style="background: #ff0000a8; border-radius: 8px;">error: '+e+"</li>")
    elecV2.error(e)
  }
};
/*********/
const cookie=document.cookie

if(cookie) console.log('该网页cookie:', cookie)
else console.log('没有检测到该网页包含任何 cookie')
}(console)</script></body>`)

  console.log('添加 tamperJS：cookieshow.js')
}

$done({ body })