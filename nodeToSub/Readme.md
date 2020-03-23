# 功能

将 vmess/ss/ssr 节点转换成订阅。

节点传输使用的是 GET 模式，传输数据量有限，建议在少量节点转换时使用。

使用 GET 的优点是，节点信息不必保存在服务器上，增加安全性，以及减少服务器的压力。缺点是传输信息较少，如果是 vmess 链接的话可能只能转换1-2个。

# 实现

使用了 cloudflare workers。

注册/登录 cloudflare，新建一个 worker。

![workers.png](https://i.loli.net/2020/03/23/rB5qfHFiRIb73jd.png)

然后把 **nodeToSub.js** 文件中的所有代码粘贴进去。

保存之后，一个节点转换订阅的服务器就搭建好了，可以看到该服务器的域名，类似： https://xxxxx.xxxx.workers.dev 

# 使用

节点信息通过 GET 参数传递，最终的订阅链接格式为： https://服务器域名/?nd=节点。 

多个节点： https://服务器域名/?nd=节点1&nd=节点2&nd=节点3

如果要把普通 v2rayN 格式的 vmess 节点转换为 QuanX 可用格式，在域名后面添加 **quanx** 即可，类似： https://服务器域名/quanx?nd=节点1&nd=节点2&nd=节点3

## 实例（注意替换域名为实际服务器地址）

假设要转换的节点为： *vmess://eyJwcyI6Indzc2tpdCIsImFkZCI6InVuaS5raXRzdW5lYmkuZnVuIiwicG9ydCI6IjU2NjYiLCJ2IjoiMiIsImlkIjoiOTUxMzc4NTctNzBmYS00YWM4LThmOTAtNGUyMGFlYjY2MmNmIiwiYWlkIjoiMCIsIm5ldCI6IndzIiwidHlwZSI6Im5vbmUiLCJob3N0IjoiIiwicGF0aCI6Ii92MiIsInRscyI6InRscyJ9*

### 直接转换

则订阅链接为： https://服务器域名/?nd=vmess://eyJwcyI6Indzc2tpdCIsImFkZCI6InVuaS5raXRzdW5lYmkuZnVuIiwicG9ydCI6IjU2NjYiLCJ2IjoiMiIsImlkIjoiOTUxMzc4NTctNzBmYS00YWM4LThmOTAtNGUyMGFlYjY2MmNmIiwiYWlkIjoiMCIsIm5ldCI6IndzIiwidHlwZSI6Im5vbmUiLCJob3N0IjoiIiwicGF0aCI6Ii92MiIsInRscyI6InRscyJ9

### 转换为 QuanX 可用格式

则订阅链接为： https://服务器域名/quanx?nd=vmess://eyJwcyI6Indzc2tpdCIsImFkZCI6InVuaS5raXRzdW5lYmkuZnVuIiwicG9ydCI6IjU2NjYiLCJ2IjoiMiIsImlkIjoiOTUxMzc4NTctNzBmYS00YWM4LThmOTAtNGUyMGFlYjY2MmNmIiwiYWlkIjoiMCIsIm5ldCI6IndzIiwidHlwZSI6Im5vbmUiLCJob3N0IjoiIiwicGF0aCI6Ii92MiIsInRscyI6InRscyJ9