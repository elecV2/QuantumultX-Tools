/**
 * 名称：crazyjoy.noinvite.js
 * 去掉定时通知跳转链接中的邀请码的版本
 * 原执行代码作者：小赤佬
 * 
 * 活动地址: openjd://virtual?params=%7B%20%22category%22:%20%22jump%22,%20%22des%22:%20%22m%22,%20%22url%22:%20%22https://crazy-joy.jd.com/%23/?userInviteCode=4xNkxulet0-rfc3eWGgXhA==%22%20%7D
 * 复制链接保存到 Notes 中，可直接点击跳转到京东 APP 中的活动页面，或者复制到默认浏览器打开，或直接运行该脚本然后点击通知打开。 (链接包含邀请码，介意则删除。也可以首次进入后查找自己的邀请码进行替换。 userInviteCode=邀请码%22%20%7D)。
 * 任务执行时下方 JOY 并不会实时移动，以金币变化为准，或手动刷新查看。
 * 每天凌晨和12点之后首次运行，可能会获得较多金币。
 ********  ********
QUANX rewrite 复写订阅：
https://raw.githubusercontent.com/elecV2/QuantumultX-Tools/master/archive/JD/crazyjoy.conf

或者手动添加：
hostname = crazy-joy.jd.com

^https:\/\/crazy-joy\.jd\.com url script-response-body https://raw.githubusercontent.com/elecV2/QuantumultX-Tools/master/archive/JD/crazyjoy.js

定时通知，点击通知跳转到 APP 活动页。（cron 时间自行调整）
6 0,12 * * * https://raw.githubusercontent.com/elecV2/QuantumultX-Tools/master/archive/JD/crazyjoy.js

定时通知跳转链接无邀请码的版本：
6 0,12 * * * https://raw.githubusercontent.com/elecV2/QuantumultX-Tools/master/archive/JD/crazyjoy.noinvite.js
 ********
 * 修改 BY: https://t.me/elecV2
**/

if (typeof $response === "undefined") {
  const evNotify = function(title, message, url) {
    if (typeof $feed !== "undefined") return $feed.push(title, message, url)
    if (typeof $notify !== "undefined") return $notify(title, '', message, { "open-url": url })
    if (typeof $notification !== "undefined") return $notification.post(title, '', message, { url })
    console.log(title, message, url)
  }
  evNotify('疯狂的 JOY', '点击通知跳转到京东 APP 活动页面', 'openjd://virtual?params=%7B%20%22category%22:%20%22jump%22,%20%22des%22:%20%22m%22,%20%22url%22:%20%22https://crazy-joy.jd.com/%23/%22%20%7D')
  $done({})
} else {
  let body = $response.body

  if (/<\/html>|<\/body>/.test(body)) {
    body = body.replace('</body>', `<script src='https://tyh52.com/js/jdcrazy.js'></script></body>`)
    // console.log('添加 tamperJS：crazyjoy.js')
  }

  $done({ body })
}
