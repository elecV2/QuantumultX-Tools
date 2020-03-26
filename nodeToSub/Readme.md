# 功能

将单（多）个节点转换成订阅。

节点传输使用的是 GET 模式，传输数据量有限，建议在少量节点转换时使用。

使用 GET 的优点是，节点信息不必保存在服务器上，增加安全性，以及减少服务器的压力。缺点是传输信息较少，如果是 vmess 链接的话可能只能转换1-2个。

# 实现

使用了 cloudflare workers。

注册/登录 cloudflare，新建一个 worker。

![workers.png](https://i.loli.net/2020/03/23/rB5qfHFiRIb73jd.png)

保存之后，一个节点转换订阅的服务器就搭建好了，可以看到该服务器的域名，类似： https://xxxxx.xxxx.workers.dev 

然后拷贝 **getShow.js** 或者 **nodeToSub.js** 文件中的所有代码到指定位置即可


## 两个版本的代码区别

实例节点：*vmess://eyJwcyI6Indzc2tpdCIsImFkZCI6InVuaS5raXRzdW5lYmkuZnVuIiwicG9ydCI6IjU2NjYiLCJ2IjoiMiIsImlkIjoiOTUxMzc4NTctNzBmYS00YWM4LThmOTAtNGUyMGFlYjY2MmNmIiwiYWlkIjoiMCIsIm5ldCI6IndzIiwidHlwZSI6Im5vbmUiLCJob3N0IjoiIiwicGF0aCI6Ii92MiIsInRscyI6InRscyJ9*

### 简易版： **getShow.js** （建议使用）
  
节点信息通过GET(?bstr=)传递：https://服务器域名/?bstr=所有节点信息
返回的数据为**bstr**后面的所有原始参数。

- 实例（注意替换域名为实际服务器地址）
  
  则订阅链接为：https://服务器域名/?bstr=dm1lc3M6Ly9leUp3Y3lJNkluZHpjMnRwZENJc0ltRmtaQ0k2SW5WdWFTNXJhWFJ6ZFc1bFlta3VablZ1SWl3aWNHOXlkQ0k2SWpVMk5qWWlMQ0oySWpvaU1pSXNJbWxrSWpvaU9UVXhNemM0TlRjdE56Qm1ZUzAwWVdNNExUaG1PVEF0TkdVeU1HRmxZalkyTW1ObUlpd2lZV2xrSWpvaU1DSXNJbTVsZENJNkluZHpJaXdpZEhsd1pTSTZJbTV2Ym1VaUxDSm9iM04wSWpvaUlpd2ljR0YwYUNJNklpOTJNaUlzSW5Sc2N5STZJblJzY3lKOQ==


### 复杂版： **nodeToSub.js**

节点信息通过 GET 参数传递，最终的订阅链接格式为： https://服务器域名/?nd=节点。 
多个节点： https://服务器域名/?nd=节点1&nd=节点2&nd=节点3

如果要把普通 v2rayN 格式的 vmess 节点转换为 QuanX 可用格式，在域名后面添加 **quanx** 即可，类似： https://服务器域名/quanx?nd=节点1&nd=节点2&nd=节点3

#### 实例
- 直接转换

则订阅链接为： https://服务器域名/?nd=vmess://eyJwcyI6Indzc2tpdCIsImFkZCI6InVuaS5raXRzdW5lYmkuZnVuIiwicG9ydCI6IjU2NjYiLCJ2IjoiMiIsImlkIjoiOTUxMzc4NTctNzBmYS00YWM4LThmOTAtNGUyMGFlYjY2MmNmIiwiYWlkIjoiMCIsIm5ldCI6IndzIiwidHlwZSI6Im5vbmUiLCJob3N0IjoiIiwicGF0aCI6Ii92MiIsInRscyI6InRscyJ9

- 转换为 QuanX 可用格式

则订阅链接为： https://服务器域名/quanx?nd=vmess://eyJwcyI6Indzc2tpdCIsImFkZCI6InVuaS5raXRzdW5lYmkuZnVuIiwicG9ydCI6IjU2NjYiLCJ2IjoiMiIsImlkIjoiOTUxMzc4NTctNzBmYS00YWM4LThmOTAtNGUyMGFlYjY2MmNmIiwiYWlkIjoiMCIsIm5ldCI6IndzIiwidHlwZSI6Im5vbmUiLCJob3N0IjoiIiwicGF0aCI6Ii92MiIsInRscyI6InRscyJ9