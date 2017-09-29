更新对React Router的History的认识
地址: http://levy.work/2017-01-09-update-knowledge-of-react-router-history/
React Router提供的三种History, 之前认识得比较肤浅, 只是从字面上去比较, 经过实践后, 有了新的认识

browserHistory

browserHistory是文档重点推荐的: 它提供了更干净的url, 同时也是借助了History API来操作浏览器历史.

借助History API操作浏览器历史意味着什么呢? 这就意味着, 每次改变路由, 浏览器上的地址会改变, 也即window.location会改变, 同时window.history也会改变

此时的this.props.router.goBack() 相当于window.history.back(), 而浏览器的后退按钮及移动端的硬件返回也是调用了window.history.back(),

则在浏览器上, 可以前进/后退按钮来跳转至下一个/上一个路由, 这与用户平时访问网页的体验一致, 的确值得推荐

不过它有个缺点, 就是它开发出来的应用, 需要配置服务器

这就意味着, 使用browserHistory编译出来的静态文件, 必须通过http服务器才能访问, 本地直接通过file协议是无法正常访问的. 这是个注意点

这一点, 对于普通web应用来说, 无关紧要, 因为服务机上的静态资源一般都会有个服务器(如Ngnix)来提供的, 但对Hybrid应用就是不是了. 如果想把静态文件放到手机里, 直接在手机里打开, browserHistory编译的文件是会报错的.

因此, 如果需要编译出来的文件在本地打开, 则不能使用browserHistory

下面给出http服务器的生产示例配置, 以Nginx为例

1
2
3
4
5
location / {
  root   /Users/levy/repo/git/demo/dist; # 静态资源目录
  index  index.html;
  try_files $uri /index.html; # 总是返回index.html, 因为是单页应用
}
它还有个缺点, IE8/IE9不支持局部刷新, 而下面两种则可以

createMemoryHistory

createMemoryHistory编译出来的静态文件, 可以本地打开, 不过它把路由历史放到内存里, 不会修改浏览器历史, 也不会改变浏览器地址

window.location的pathname始终不变则意味着, 假如首页点击后显示详情页, 无法把详情页的地址分享出去, 因为浏览器的地址仍然是首页的地址

同时, 页面上必须提供返回按钮, 因为浏览器的返回已不可靠. 前进后退必须通过react-router的api来实现

hashHistory

hashHistory具有以上两者的优点: 编译文件可以本地打开; 每一个路由都有单独的url, 可以使用浏览器的前进/后退按钮

它的缺点是, url”不干净”, 带着一串hash值. 如example.com/#/somepath?_k=kfeu3k, #/somepath?_k=kfeu3k就是window.location.hash.
以上面的示例为说明, 它路由改变时, window.location.pathname始终是不变的, 变的是hash值:

如果下一个路由与当前路由不同, 则#后面的的部分全部改变
如果下一个路由与当前路由相同, 则=后面的部分改变
也就是说, 除了前进/后退, 用户先一次点击同一个链接, 浏览器的url都是不同的

服务端渲染

文档上说, 服务端渲染就要使用browserHistory, hashHistory是做不到的. 可是, 我实验了一下, 并非如此啊, 服务端渲染根本与使用哪种历史没关系啊, 只是一定要有个nodejs服务器而已, 这里可能是个疑问点

实践

最后在实际项目中, 我使用的是createMemoryHistory.

场景是这样的: 对方用与我们完全不同的技术栈开发了一个app, 现在是要在其首页加一个icon, 点击后跳到我们的首页. 因为对方会把我们的首页资源放到手机里, 在本地打开, 并非通过http协议来访问, 所以不能用browserHistory.

那么, 为什么不使用hashHistory呢?

毕竟我们的页面是属于 “外来页面”, 对方要求在我们的页面里, 无论跳转了几个页面, 只要想返回, 都能返回到他们的首页.

考虑到我们的页面上已有返回按钮, 再添加一个按钮, 不好看, 而且还要考虑硬件返回的情况, 另外就是, 该app不会有分享链接的功能. 综上考虑, 我就选择了createMemoryHistory. 因为此时路由的改变记录是在内存的, 不会改变浏览器历史, 因此在我们的页面里, 无论嵌套有多深, history.back()返回的都是对方的首页. 而手机的硬件返回调用的是history.back(), 则对方直接操作手机就可以达到目的了, 我们也不需要在页面中多添加一个返回按钮

参考资料

react-router histories