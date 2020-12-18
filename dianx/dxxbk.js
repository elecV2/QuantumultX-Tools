// 功能：中国电信 星播客签到+30金豆任务（其他任务需手动完成）
// 作者：https://t.me/elecV2
// 地址：https://github.com/elecV2/QuantumultX-Tools/tree/master/dianx
// 
// 使用：
// 首先添加 rewrite 复写订阅进行 cookie 获取。（此为 QuantumultX 订阅，其他 APP 参照修改）
// https://raw.githubusercontent.com/elecV2/QuantumultX-Tools/master/dianx/dianx.cookie.conf
// 
// cookie 获取：打开电信营业厅，我->(已)签到->2元话费（热门兑换）->立即兑换->兑换。如果设置没问题，会弹出 cookie 获取成功的提醒。然后注释掉复写规则，防止重复弹窗。
// 
// 接着设置定时任务，在 10 点整进行话费兑换。每月 5 次兑换机会，下面的 cron 表示差不多每 3 天尝试兑换一次，可根据个人情况进行适当调整。
// 0 10 */3 * * https://raw.githubusercontent.com/elecV2/QuantumultX-Tools/master/dianx/dianx.js, tag=电信金豆兑换话费, img-url=https://raw.githubusercontent.com/elecV2/QuantumultX-Tools/master/dianx/dianx.png, enabled=true

// *建议配合 chavyleung 的电信签到脚本使用 https://github.com/chavyleung/scripts/tree/master/10000

const COOKIELIST = {
  'dianx_headers': ``,
  'dxxbk_body': ``,
  'dxxbk_cookie': ``
}

// 是否在日志中显示 cookie 信息。是：true , 否：false (默认)
const bShowCookie = false

const cookieMod = {
  get(key){
    if (COOKIELIST && COOKIELIST[key]) return COOKIELIST[key]
    if (typeof $store !== "undefined") return $store.get(key)
    if (typeof $prefs !== "undefined") return $prefs.valueForKey(key)
    if (typeof $persistentStore !== "undefined") return $persistentStore.read(key)
    if (typeof localStorage !== "undefined") return localStorage.getItem(key)
  },
  put(val, key){
    if (typeof $store !== "undefined") return $store.put(val, key)
    if (typeof $prefs !== "undefined") return $prefs.setValueForKey(val, key)
    if (typeof $persistentStore !== "undefined") return $persistentStore.write(val, key)
    if (typeof localStorage !== "undefined") {
      try { 
        localStorage.setItem(key, val)
        return true
      } catch(e) { return false }
    }
  }
}

const simpPost = function(req, type) {
  if (typeof $axios !== "undefined") return $axios(req)
  if (typeof $task !== "undefined") return $task.fetch(req)
  if (typeof $httpClient !== "undefined") {
    const post = type ? $httpClient[type] : $httpClient.post
    return new Promise((resolve, reject)=>{
      post(req, (error, response, body) => error ? reject(error) : resolve(body))
    })
  }
  if (typeof fetch !== "undefined") {
    return new Promise((resolve, reject)=>{
      fetch(req.url, req).then(res=>res.text()).then(res=>resolve(res)).catch(e=>reject(e))
    })
  }
}
// if (typeof window === "object") window.$done=(obj)=>console.log('done li ge done', obj)

const evNotify = function(title, message, url) {
  if (typeof $feed !== "undefined") return $feed.push(title, message, url)
  if (typeof $notify !== "undefined") return $notify(title, '', message, url)
  if (typeof $notification !== "undefined") return $notification.post(title, '', message, url)
  console.log(title, message, url)
}

/*********** 程序主要运行部分 ***************/
if (typeof $request === "undefined") {
  const dianx_headers = oDianxHd(cookieMod.get('dianx_headers'))
  const dianx_body = cookieMod.get('dxxbk_body')
  if (dianx_body && Object.keys(dianx_headers).length) {
    const req = {
      url: 'https://wapside.189.cn:9001/api/home/sharingRewards',
      method: 'post',
      headers: dianx_headers,
      body: dianx_body
    }
    Promise.all([simpPost(req), simpPost({
      url: 'http://xingboke.189.cn:8081/luntan/operation/add.do?type=signin',
      method: 'get',
      headers: oDianxHd(cookieMod.get('dxxbk_cookie'))
    }, 'get')]).then(res=>{
      console.log((res[0].data || res[0]), (res[1].data || res[1]))
    }).finally($done)
  } else {
    evNotify('🎭 金豆兑换话费的 cookie 尚未设置', '请根据脚本内的注释，去电信营业厅 APP 进行获取')
    $done({})
  }
} else {
  saveCookie()
}
/******* end 程序主要运行部分 end ***********/

function oDianxHd(str) {
  if (typeof str === 'object') return str
  try {
    return JSON.parse(str)
  } catch(e) {
    return {
      "Cookie": str,
      "Content-Type": "application/json;charset=utf-8",
      "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;CtClient;8.4.1;iOS;14.2;",
    }
  }
}

function sJson(str) {
  if (typeof str === 'object') return str
  try {
    return JSON.parse(str)
  } catch(e) {
    return str
  }
}

function showCookie() {
  Object.keys(COOKIELIST).forEach(c=>console.log('KEY:' + c + '\nVAULE:' + cookieMod.get(c)))
}

function saveCookie() {
  if ($request.headers && $request.url.match(/api\/exchange\/consume/)) {
    // console.log($request)
    if (cookieMod.put($request.headers.Cookie, 'dianx_headers') && cookieMod.put($request.body, 'dianx_body')){
      console.log('金豆兑换话费相关 cookie 获取成功')
      evNotify('🎭 金豆兑换话费 cookie 获取成功！', '请注释掉相关复写规则。\n每天 10 点可兑换话费，请提前设置好定时任务')
      bShowCookie && showCookie()
    }
  } else {
    evNotify('🎭 金豆兑换话费相关 cookie 获取失败', '可能是复写匹配 URL 设置不正确。请仔细检查后再次尝试')
    console.log('金豆兑换话费相关 cookie 获取失败。\n' + $request.url + ' 并不匹配 /api\/exchange\/consume/')
  }
  $done({})
}

function exchange(headers, body) {
  const req = {
    url: 'https://wapside.189.cn:9001/api/exchange/consume',
    method: 'POST',
    headers, body
  }
  let title = '🎭 金豆兑换话费结果通知', message = ''
  simpPost(req).then(res=>{
    message = res.body || res.data || res
    console.log(message)
    message = sJson(message)
    if (Number(message.resoultCode) === 0) {
      title = '🎭 金豆兑换话费成功'
      message = '通常半小时内会收到充值成功的短信。具体以实际到账时间为准'
    } else {
      message = message.resoultMsg || JSON.stringify(message)
    }
  }).catch(err=>{
    console.log(err)
    message = (err.error || err.message || err) + '\n如超时并不表示兑换失败，以实际是否扣除金豆为准'
  }).finally(()=>{
    evNotify(title, message)
    bShowCookie && showCookie()
    $done({})
  })
}