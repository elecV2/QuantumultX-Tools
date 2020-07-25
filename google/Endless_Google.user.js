/**
 * 名称：Endless_Google.user.js
 * 地址：https://openuserjs.org/install/tumpio/Endless_Google.user.js
 * 
 * 制作：elecV2
 *
 ******** (已调整)以下为 tamperJS 自动生成的 rewrite 相关信息，可能需要根据情况适当调整 ********

[rewrite]
https:\/\/www\.google\.com\/(m|search) url script-response-body https://raw.githubusercontent.com/elecV2/QuantumultX-Tools/master/google/Endless_Google.user.js

[mitm]
hostname = www.google.com

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
document.body.insertAdjacentHTML("beforeend",\`<ul id='tamperJSLog' style='background: #000000a8;color: #eee;position: fixed;bottom: 1em;top: initial;right: 0;left: 0;width: 95%;margin: 0 2%;border-radius: 8px;font-size: 16px;line-height: 1.6em;list-style: none;padding: 8px 12px;max-height: 100%;overflow: auto;white-space: pre-wrap;word-break: break-all;z-index: 9999 ;box-sizing: border-box' ondblclick="this.style.height === '2em'?Object.assign(this.style, { top: '1em', height: 'initial' }):Object.assign(this.style, { top: 'initial', height: '2em' })"><span style="position: sticky;top: 61.8%;font-size: 8px;opacity: 0.5;line-height: 1em;float: right;margin-right: 1em;">tamperJS by @elecV2</span></ul>\`);const tamperJSLog=document.querySelector("#tamperJSLog"),console={...elecV2,log:(...e)=>{e=e.map(e=>"string"!=typeof e?JSON.stringify(e):e).join(" "),tamperJSLog.insertAdjacentHTML("afterbegin","<li>"+e+"</li>"),elecV2.log(e)},error:(...e)=>{e=e.map(e=>"string"!=typeof e?JSON.stringify(e):e).join(" "),tamperJSLog.insertAdjacentHTML("afterbegin",'<li style="background: #ff0000a8; border-radius: 8px;">error: '+e+"</li>"),elecV2.error(e)}}; console.log("成功添加 tamperJS Endless_Google.user.js");
/*********/
// ==UserScript==
// @name            Endless Google
// @description     Load more results automatically and endlessly.
// @author          tumpio
// @namespace       tumpio@sci.fi
// @homepageURL     https://openuserjs.org/scripts/tumpio/Endless_Google
// @supportURL      https://github.com/tumpio/gmscripts/issues
// @icon            https://github.com/tumpio/gmscripts/raw/master/Endless_Google/large.png
// @include         http://www.google.*
// @include         https://www.google.*
// @include         https://encrypted.google.*
// @run-at          document-start
// @version         0.0.6
// @license         MIT
// @noframes
// ==/UserScript==

if (location.href.indexOf("tbm=isch") !== -1) // NOTE: Don't run on image search
    return;
if (window.top !== window.self) // NOTE: Do not run on iframes
    return;

const centerElement = "#center_col";
const loadWindowSize = 1.6;
const filtersAll = ["#foot", "#bottomads"];
const filtersCol = filtersAll.concat(["#extrares", "#imagebox_bigimages"]);
let   msg = "";

const css = \`
.page-number {
  position: relative;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
	margin-bottom: 2em;
	color: #808080;
}
.page-number::before {
  content: "";
  background-color: #ededed;
  height: 1px;
  width: 100%;
  margin: 1em 3em;
}
.endless-msg {
  position:fixed;
  bottom:0;
  left:0;
  padding:5px 10px;
  background: darkred;
  color: white;
  font-size: 11px;
  display: none;
}
.endless-msg.shown {
  display:block;
}
\`;

let pageNumber = 1;
let prevScrollY = 0;
let nextPageLoading = false;

function requestNextPage() {
    nextPageLoading = true;
    let nextPage = new URL(location.href);
    if (!nextPage.searchParams.has("q")) return;

    nextPage.searchParams.set("start", String(pageNumber * 10));
    !msg.classList.contains("shown") && msg.classList.add("shown");
    fetch(nextPage.href)
        .then(response => response.text())
        .then(text => {
            let parser = new DOMParser();
            let htmlDocument = parser.parseFromString(text, "text/html");
            let content = htmlDocument.documentElement.querySelector(centerElement);

            content.id = "col_" + pageNumber;
            filter(content, filtersCol);

            let pageMarker = document.createElement("div");
            pageMarker.textContent = String(pageNumber + 1);
            pageMarker.className = "page-number";

            let col = document.createElement("div");
            col.className = "next-col";
            col.appendChild(pageMarker);
            col.appendChild(content);
            document.querySelector(centerElement).appendChild(col);

            if (!content.querySelector("#rso")) {
                // end of results
                window.removeEventListener("scroll", onScrollDocumentEnd);
                nextPageLoading = false;
                msg.classList.contains("shown") && msg.classList.remove("shown");
                return;
            }

            pageNumber++;
            nextPageLoading = false;
            msg.classList.contains("shown") && msg.classList.remove("shown");
        });
}

function onScrollDocumentEnd() {
    let y = window.scrollY;
    let delta = y - prevScrollY;
    if (!nextPageLoading && delta > 0 && isDocumentEnd(y)) {
        requestNextPage();
    }
    prevScrollY = y;
}

function isDocumentEnd(y) {
    return y + window.innerHeight * loadWindowSize >= document.body.clientHeight;
}

function filter(node, filters) {
    for (let filter of filters) {
        let child = node.querySelector(filter);
        if (child) {
            child.parentNode.removeChild(child);
        }
    }
}

function init() {
    prevScrollY = window.scrollY;
    window.addEventListener("scroll", onScrollDocumentEnd);
    filter(document, filtersAll);
    let style = document.createElement("style");
    style.type = "text/css";
    style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);
    msg = document.createElement("div");
    msg.setAttribute("class", "endless-msg");
    msg.innerText = "Loading next page...";
    document.body.appendChild(msg);
}

document.addEventListener("DOMContentLoaded", init);

}(console)</script></body>`)

  console.log('添加 tamperJS：Endless_Google.user.js')
}

$done({ body })