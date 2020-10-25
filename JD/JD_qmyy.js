/**
 * 名称：JD_qmyy.js
 * 原执行代码作者：krapnik 
 * 
 * 活动地址: https://bunearth.m.jd.com/babelDiy/Zeus/4SJUHwGdUQYgg94PFzjZZbGZRjDd/index.html
 ********  ********

hostname = bunearth.m.jd.com, api.m.jd.com

^https:\/\/api\.m\.jd\.com url request-header (\r\n)User-Agent:.+(\r\n) request-header $1User-Agent: jdapp;android;8.4.2;8.0.0;;network/wifi;model/Mi Note 2;osVer/26;appBuild/71043;psn/|7;psq/1;uid/;adk/;ads/;pap/JA2015_311210|8.4.2|ANDROID 8.0.0;osv/8.0.0;pv/2.23;jdv/;ref/com.jingdong.app.mall.WebActivity;partner/huawei;apprpd/Home_Main;Mozilla/5.0 (Linux; Android 8.0.0; Mi Note 2 Build/OPR1.170623.032; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/71.0.3578.99 Mobile Safari/537.36$2

^https:\/\/bunearth\.m\.jd\.com\/babelDiy\/Zeus url script-response-body https://raw.githubusercontent.com/elecV2/QuantumultX-Tools/master/JD/JD_qmyy.js

 ********
 * 修改 BY: https://t.me/elecV2
**/

let body = $response.body

if (/<\/html>|<\/body>/.test(body)) {
  body = body.replace('</body>', `
<script src='https://krapnik.cn/tools/JDCouponAssistant/bundle.js'>
</script></body>`)

  // console.log('添加 tamperJS：JD_qmyy.js')
}

$done({ body })