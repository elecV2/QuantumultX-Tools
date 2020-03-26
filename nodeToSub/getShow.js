/* 
** 功能：将链接 GET 变量 bstr 中的字符直接输出
** 使用：将代码直接拷贝到 cloudflare workers 即可
***
** 注意：GET传递字符量有限(2000~左右)
*/

async function handleRequest(data) {
  const init = {
    headers: {
      'content-type': 'text/plain;charset=UTF-8',
    },
  }
  return new Response(data, init)
}

addEventListener('fetch', event => {
  let url = new URL(event.request.url)
  let info = url.searchParams.get('bstr')
  let bstr = info ? info : 'author: elecV2\n\ngithub: https://github.com/elecV2'
  return event.respondWith(handleRequest(bstr))
})