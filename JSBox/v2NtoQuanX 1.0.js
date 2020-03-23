/*
* 功能: 将 v2rayN 格式的 vmess 链接转化为 QuantumultX 可用格式(不支持 kcp 等 udp 类协议)
* 使用: 先复制好要转化的 vmess 链接，然后点击运行。转化结果会自动复制到剪贴板，然后手动打开 QuanX, 编辑配置文件，将结果复制到 [sever_local] 那一栏下面即可
* 作者: elecV2
* 频道: https://t.me/elecV2
*/

var vmess = $clipboard.text,
    fv = v2ntoquanx(vmess)

$clipboard.text = fv

$ui.alert("转化结果\n\n" + fv + "\n\n已复制到剪贴板，请打开 QuanX, 编辑配置文件，将结果复制到 [sever_local]")


function v2ntoquanx(vmess, method="chacha20-poly1305", tag=null) {
  // 只支持 v2rayN 格式的链接转换
  // method 可选： chacha20-poly1305 aes-128-gcm none
  let quanxv2 = "vmess="
  let serjson = JSON.parse($text.base64Decode(vmess.split("://")[1]))
  console.log(serjson)
  // $ui.alert(serjson)
  if (serjson.net == "kcp") {
    $ui.alert("quanx 暂时不支持 kcp 协议")
    return false
  }
  let obfs = ""
  if (serjson.net == "tcp" && serjson.tls == "tls") {
    obfs += `obfs=over-tls,`
  } else if (serjson.net == "ws") {
    if (serjson.tls == "tls") obfs += `obfs=wss, obfs-uri=${serjson.path},`
    else obfs += `obfs=ws, obfs-uri=${serjson.path},`
  }
  quanxv2 += `${serjson.add}:${serjson.port}, method=${ method || serjson.method }, password=${serjson.id}, ${obfs} fast-open=false, udp-relay=false, tag=${tag || serjson.ps || serjson.name || "vmess"}`

  console.log(quanxv2)
  return quanxv2
}
