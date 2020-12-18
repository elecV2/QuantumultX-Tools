// tamperJS 日志输出。在网页上显示 console.log/error 的内容。
// 双击展开/收缩，三击清空日志
document.body.insertAdjacentHTML("beforeend",`<ul id='tamperJSLog' style='background: #000000a8;color: #eee;position: fixed;bottom: 1em;top: initial;right: 0;left: 0;width: 95%;margin: 0 2%;border-radius: 8px;font-size: 16px;line-height: 1.6em;list-style: none;padding: 8px 12px;max-height: 100%;overflow: auto;white-space: pre-wrap;word-break: break-all;z-index: 9999 ;box-sizing: border-box' ondblclick="this.style.height === '2em'?Object.assign(this.style, { top: '1em', height: 'initial' }):Object.assign(this.style, { top: 'initial', height: '2em' })"><span style="position: sticky;top: 61.8%;font-size: 8px;opacity: 0.5;line-height: 1em;float: right;margin-right: 1em;">tamperJS by @elecV2</span></ul>`);
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