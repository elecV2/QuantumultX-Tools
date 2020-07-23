// 复制本文件代码到 cloudflare worker，搭建自己的加速服务器

addEventListener(
  "fetch",event => {
     let url=new URL(event.request.url);
     url.hostname="raw.githubusercontent.com";
     let request=new Request(url,event.request);
     event.respondWith(
       fetch(request)
     )
  }
)