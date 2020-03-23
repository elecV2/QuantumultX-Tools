async function handleRequest(data) {
  const init = {
    headers: {
      'content-type': 'text/plain;charset=UTF-8',
    },
  }
  return new Response(data, init)
}

addEventListener('fetch', event => {
  let url = event.request.url
  let nodes = url.match(/(?<=nd=)([^&]+)/g)

  if (/quanx/.test(url)) {
    nodes = nodes.map(node=>{
      // if(/^ss/.test(node)) return true
      let isV2n = /^vmess/.test(node) && isJson(atob(node.split("://")[1]))
      return isV2n ? v2ntoquanx(node) : node
    })
  }
  let base64 = btoa(nodes.join("\n"))
  return event.respondWith(handleRequest(base64))
})

function isJson(str){
  try {
    JSON.parse(str)
    return true
  } catch {
    return false
  }
}

function v2ntoquanx(vmess, method="chacha20-poly1305", tag=null) {
  // 只支持 v2rayN 格式的链接转换
  // method 可选： chacha20-poly1305 aes-128-gcm none
  let quanxv2 = "vmess="
  let v2data = atob(vmess.split("://")[1])
  let elecV2 = isJson(v2data) ? JSON.parse(v2data) : ''
  if (!elecV2 || elecV2.net == "kcp") {
    console.log("quanx 暂时不支持 kcp 协议")
    return false
  }
  let obfs = ""
  if (elecV2.net == "tcp" && elecV2.tls == "tls") {
    obfs += `obfs=over-tls,`
  } else if (elecV2.net == "ws") {
    if (elecV2.tls == "tls") obfs += `obfs=wss,`
    else obfs += `obfs=ws,`
  }
  quanxv2 += `${elecV2.add}:${elecV2.port}, method=${ method || elecV2.method }, password=${elecV2.id}, ${obfs} fast-open=false, udp-relay=false, tag=${tag || elecV2.ps || elecV2.name || "vmess"}`

  return quanxv2
}