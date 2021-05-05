- [循环迭代项目](#循环迭代项目)
  - [前言](#前言)
  - [接口文档](#接口文档)
  - [项目功能简介](#项目功能简介)
  - [html 和 css](#html-和-css)
    - [简单初始化一下样式](#简单初始化一下样式)
    - [确定好页面的整体结构](#确定好页面的整体结构)
    - [完善头部样式](#完善头部样式)
    - [完善左侧菜单样式](#完善左侧菜单样式)
    - [完善右侧内容样式](#完善右侧内容样式)
      - [学生列表](#学生列表)
        - [表格](#表格)
        - [翻页按钮](#翻页按钮)
        - [modal](#modal)
      - [新增学生](#新增学生)
  - [JavaScript](#javascript)
    - [学生列表和新增学生区域切换](#学生列表和新增学生区域切换)
    - [ajax + 添加学生 + 表单校验](#ajax--添加学生--表单校验)
    - [查询所有学生 + 渲染 tbody + 渲染 翻页按钮](#查询所有学生--渲染-tbody--渲染-翻页按钮)
    - [删除功能 + 编辑功能 + 数据回填](#删除功能--编辑功能--数据回填)
    - [翻页功能](#翻页功能)
  - [需要熟练掌握的基本操作](#需要熟练掌握的基本操作)
    - [使用 XMLHttpRequest 来实现一个简单的 ajax](#使用-xmlhttprequest-来实现一个简单的-ajax)
    - [小技巧](#小技巧)
  - [bug](#bug)
  - [提高](#提高)

# 循环迭代项目

| CN         | EN                 |
| ---------- | ------------------ |
| 模态对话框 | Modal Dialogue Box |
| 表格       | form               |

## 前言

```
这个循环迭代项目，后续还会有很多拓展，当前写的仅仅只是 JavaScript 版。之后还会用 jQuery、H5+C3、vue来拓展、完善。

这里面涉及到的业务逻辑还是蛮多的，基本的增删改查操作都涵盖了。
```

## 接口文档

https://developer.duyiedu.com/previewAPI/%E5%AD%A6%E7%94%9F%E4%BF%A1%E6%81%AF%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9F

## 项目功能简介

**1. 新增学生**

- 表单校验
- 新增成功后会有提示弹框, 内容为 '添加成功'
- 新增成功后, 点击确定按钮, 页面发生跳转, 并且会清空新增学生的表单中的数据

**2. 展示学生信息**

- table (使用 table 来实现布局)
- 翻页处理 (当学生数量过多时 需要翻页显示)

**3. 编辑功能**

- 编辑弹框 (遮罩层 视口区域水平垂直居中显示)
- 编辑表单 (和新增学生表单类似)
  - 数据回填 (新增学生表单和编辑表单都需要获取表单数据, 可以提取一个公共函数 专门用于获取表单数据)
  - 学号不可编辑 readonly
  - 表单提交后出现提示弹框, 点击确定后, 重新加载页面数据, 获取最新的数据来渲染页面

**4. 删除功能**

- 提示弹框 (点击删除按钮后, 出现提示弹框, 内容为: '确认要删除学号为 xxx 的学生信息吗?')
  - 点击确认 则删除指定学生 并 获取最新的数据来渲染页面
  - 点击取消 则取消删除操作

## html 和 css

### 简单初始化一下样式

`reset.css`

```css
/* 初始化样式 */
* {
    margin: 0;
    padding: 0;
}

ul {
    list-style: none;
}

button {
    border: none;
    outline: none;
}

body {
    font-size: 14px;
}
```

### 确定好页面的整体结构

![20210504201154](https://cdn.jsdelivr.net/gh/123taojiale/dahuyou_picture@main/blogs/20210504201154.png)

`index.html`

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./css/index.css">
    <title>学生信息管理系统</title>
</head>

<body>
    <!-- 头部区域 -->
    <div id="header"></div>
    <!-- 左侧菜单区域 -->
    <div id="leftMenu"></div>
    <!-- 右侧内容区域 -->
    <div id="rightContent"></div>
</body>

</html>
```

`index.css`

```css
/* 引入初始化 */
@import './reset.css';
/* 页面头部 */
@import './header.css';
/* 左侧菜单 */
@import './left_menu.css';
/* 右侧内容 */
@import './right_content.css';
```

`header.css`

```css
#header {
    position: absolute;
    top: 0;
    left: 0;

    width: 100%;
    height: 70px;
    background-color: #999;
}
```

`left_menu.css`

```css
#leftMenu {
    position: absolute;
    top: 70px;
    left: 0;

    width: 200px;
    height: calc(100% - 70px);
    background-color: #666;
}
```

`right_content.css`

```css
#rightContent {
    position: absolute;
    top: 70px;
    left: 200px;

    width: calc(100% - 200px);
    height: calc(100% - 70px);
    background-color: #333;
}
```

![20210504203907](https://cdn.jsdelivr.net/gh/123taojiale/dahuyou_picture@main/blogs/20210504203907.png)

### 完善头部样式

`header 部分的 HTML`

```html
<!-- 头部区域 -->
<div id="header">
    <div class="logo">
        <img src="./images/logo.jpg" alt="dahuyouのlogo" title="dahuyouのlogo">
        <span>dahuyou の 学生信息管理系统</span>
    </div>
</div>
```

`header.css`

```css
#header {
    position: absolute;
    top: 0;
    left: 0;

    width: 100%;
    height: 70px;
    line-height: 70px;
    background-color: #354457;
}

#header .logo {
    margin-left: 20px;
}

#header .logo img {
    border-radius: 50%;
    width: 30px;
    height: 30px;
    vertical-align: middle;
    transition: .3s;
    cursor: pointer;
}

#header .logo img:hover {
    transform: scale(1.1, 1.1);
    transition: .3s;
}

#header .logo span {
    padding-left: 5px;
    color: #fff;
}
```

```
这有一个很神奇的现象: .logo 下面的 img 标签的变化
  刷新页面, 观察右上角的 img 标签, 会发现一开始时是矩形, 然后渐变为 圆角
  但是, 当该项目完成后, 再刷新页面, 会发现它始终显示的是圆角效果
  PS: 这应该和浏览器的 啥啥啥线程 有关
```

![20210504210757](https://cdn.jsdelivr.net/gh/123taojiale/dahuyou_picture@main/blogs/20210504210757.png)

### 完善左侧菜单样式

`右侧菜单区域的 HTML`

```html
<!-- 左侧菜单区域 -->
<div id="leftMenu">
    <ul class="menu">
        <li>学生管理</li>
        <li data-id="stu-list" class="active">学生信息</li>
        <li data-id="stu-add">新增学生</li>
    </ul>
</div>
```

`right_content.css`

```css
#leftMenu {
    position: absolute;
    top: 70px;
    left: 0;

    width: 200px;
    height: calc(100% - 70px);
    line-height: 40px;

    color: #b3bcc5;
    background-color: #4d5e70;
}

#leftMenu .menu li:first-child {
    padding-left: 10px;
}

#leftMenu .menu li:not(:first-child) {
    padding-left: 40px;
    cursor: pointer;
}

#leftMenu .menu li:not(:first-child):hover {
    color: #354457;
    background-color: rgba(255, 255, 255, .5);
}

#leftMenu .menu li:not(:first-child).active {
    color: #354457;
    background-color: #ddd;
}

/* #leftMenu .menu li:not(:first-child).active {
    color: #354457;
    background-color: #ddd;
}

#leftMenu .menu li:not(:first-child):hover {
    color: #354457;
    background-color: rgba(255, 255, 255, .5);
} */
```

![20210504211750](https://cdn.jsdelivr.net/gh/123taojiale/dahuyou_picture@main/blogs/20210504211750.png)

```
[细节] 样式冲突问题
    学生信息 和 新增学生 两个li 的 .active 和 :hover 冲突的问题
    按照上述写法 它们的权重是相同的 并且作用的元素也相同, 在这种情况下, 若某个指定的 css 样式发生了冲突, 那么后面的会覆盖前面的 (尝试将最后两组样式调换位置 就会发现问题)
```

### 完善右侧内容样式

`HTML`

```html
<!-- 右侧内容区域 -->
<div id="rightContent">
    <!-- 学生列表 -->
    <div id="stu-list">
        ...
    </div>
    <!-- 新增学生 -->
    <div id="stu-add">
        ...
    </div>
</div>
```

`rightContent.css`

```css
/* 学生列表区域 */
/* 表格 */
@import './table.css';
/* 翻页按钮 */
@import './turn_page.css';
/* 编辑表单 (新增学生区域的表单样式也写在里面) */
@import './modal.css';

#rightContent {
    position: absolute;
    top: 70px;
    left: 200px;

    width: calc(100% - 200px);
    height: calc(100% - 70px);
    background-color: #eee;
}

/* 默认显示学生列表 隐藏新增学生 */
#stu-list {
    /* display: none; */
}

#stu-add {
    display: none;
}
```

```
右侧内容主要分为两个部分 学生列表 和 新增学生
```

#### 学生列表

`HTML`

```html
<!-- 学生列表 -->
<div id="stu-list">
    <!-- 表格 -->
    <table>
        ...
    </table>
    <!-- 翻页按钮 -->
    <div class="turn-page">
        ....
    </div>
    <!-- 编辑表单回填 -->
    <div class="modal">
        ...
    </div>
</div>
```

`css`

```css
/* 学生列表区域 */
/* 表格 */
@import './table.css';
/* 翻页按钮 */
@import './turn_page.css';
/* 编辑表单 (新增学生区域的表单样式也写在里面) */
@import './modal.css';

#rightContent {
    position: absolute;
    top: 70px;
    left: 200px;

    width: calc(100% - 200px);
    height: calc(100% - 70px);
    background-color: #eee;
}

/* 默认显示学生列表 隐藏新增学生 */
#stu-list {
    /* display: none; */
}

#stu-add {
    display: none;
}
```

##### 表格

```
表格区域, 即: 数据的展示区域
```

`HTML`

```html
<!-- 表格 -->
<table>
    <thead>
        <tr>
            <th>学号</th>
            <th>姓名</th>
            <th>性别</th>
            <th>邮箱</th>
            <th>手机号</th>
            <th>住址</th>
            <th>操作</th>
        </tr>
    </thead>
    <tbody>
        <!-- 瞎写两组数据 用于调试 -->
        <tr>
            <td>001</td>
            <td>dahuyou</td>
            <td>boy</td>
            <td>123487901@asdf.cm</td>
            <td>12384701234</td>
            <td>大忽悠街道200号</td>
            <td>
                <button class="edit btn">编辑</button>
                <button class="remove btn">删除</button>
            </td>
        </tr>
        <tr>
            <td>002</td>
            <td>xiaohuyou</td>
            <td>girl</td>
            <td>123487901@asdf.cm</td>
            <td>12384701234</td>
            <td>小忽悠街道250号</td>
            <td>
                <button class="edit btn">编辑</button>
                <button class="remove btn">删除</button>
            </td>
        </tr>
    </tbody>
</table>
```

`table.css`

```css
#stu-list table {
    width: 100%;
    text-align: center;
    line-height: 30px;
}

#stu-list table thead {
    background-color: #e3e8ee;
    color: #646987;
}

/* #stu-list table td {
    background-color: #fff;
} */

#stu-list tbody {
    background-color: #fff;
}

#stu-list tbody td:last-child button {
    padding: 5px 10px;
    border-radius: 5%;

    color: #fff;
    cursor: pointer;
}

#stu-list tbody td:last-child button.edit {
    background-color: #008c8c;
}

#stu-list tbody td:last-child button.remove {
    background-color: #f40;
}
```

![20210504223105](https://cdn.jsdelivr.net/gh/123taojiale/dahuyou_picture@main/blogs/20210504223105.png)

##### 翻页按钮

`HTML`

```html
<!-- 翻页按钮 -->
<div class="turn-page">
    <button class="prev-btn btn">&lt; 上一页</button>
    <span class="page-num active">1</span>
    <span class="page-num">2</span>
    <span class="page-num">3</span>
    <button class="next-btn btn">下一页 &gt;</button>
</div>
```

`turn_page.css`

```css
/* 翻页按钮区域 */
.turn-page {
    display: flex;
    /* 若用户信息条数 仅需要一页即可显示 那么 .turn-page 得 隐藏 */
    /* display: none; */
    /* align-items 是否设置 效果都一样 因为子元素的高度 正好撑满父级 */
    /* align-items: center; */
    justify-content: center;

    margin-top: 10px;
    height: 36px;
}

.turn-page button,
.turn-page .page-num {
    /* 文本居中显示 */
    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 6px;
    margin-right: 6px;

    height: 36px;
    background-color: #fff;
    cursor: pointer;
}

.turn-page button {
    width: 80px; /* 翻页按钮宽度为 80px */
}

.turn-page .page-num {
    width: 36px; /* 页码按钮宽度为 36px */
}

.turn-page button:hover,
.turn-page .page-num:hover,
.turn-page .page-num.active {
    color: #fff;
    background-color: #4e6ef2;
}
```

##### modal

![20210504223232](https://cdn.jsdelivr.net/gh/123taojiale/dahuyou_picture@main/blogs/20210504223232.png)

`HTML`

```html
<!-- 编辑表单回填 -->
<div class="modal">
    <div class="modal-content">
        <span class="close">x</span>
        <h2>编辑信息</h2>
        <form action="#" class="stu-form" id="edit-stu-form">
            <p>
                <label for="name">姓名</label>
                <input type="text" name="name" id="name">
            </p>
            <p>
                <label for="">性别</label>
                <input type="radio" name="sex" id="male" value="0">
                <label for="male" class="sex">男</label>
                <input type="radio" name="sex" id="female" value="1">
                <label for="female" class="sex">女</label>
            </p>
            <p>
                <label for="email">邮箱</label>
                <input type="email" name="email" id="email">
            </p>
            <p>
                <label for="sNo">学号</label>
                <input type="text" name="sNo" id="sNo" readonly>
            </p>
            <p>
                <label for="birth">出生年</label>
                <input type="text" name="birth" id="birth">
            </p>
            <p>
                <label for="phone">手机号</label>
                <input type="text" name="phone" id="phone">
            </p>
            <p>
                <label for="address">住址</label>
                <input type="text" name="address" id="address">
            </p>
            <p>
                <label for=""></label>
                <input type="submit" value="提交">
            </p>
        </form>
    </div>
</div>
```

`modal.css`

```css
/* .modal 表单回填样式 */
.modal {
    /* .modal 默认隐藏 */
    display: none;
}

.modal {
    /* 令 .modal 的尺寸 撑满整个浏览器窗口 */
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    background-color: rgba(0, 0, 0, .5);
}

.modal .modal-content {
    /* 令 .modal-content 在 .modal 里居中显示 */
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;

    border-radius: 5%;
    padding: 20px;

    width: 500px;
    height: 400px;

    background-color: #fff;
}

.modal .close {
    position: absolute;
    top: 10px;
    right: 20px;

    font-size: 20px;
    color: #999;
    cursor: pointer;
}

/* 学生表单 (新增学生模块 共用样式) */
.stu-form {
    width: 400px;
    margin: 20px auto 0 auto;
}

.stu-form p {
    margin: 10px 0;
}

.stu-form p label {
    /* label 默认值 display: inline; */
    display: inline-block;
    width: 100px;
    text-align: right;
    margin-right: 10px;
}

.stu-form p label.sex {
    width: auto;
}

.stu-form input[type='submit'],
.stu-form input[type='reset'] {
    outline: none;
    padding: 5px 25px;
    border: 1px solid #ccc;
    cursor: pointer;
}
```

![20210504224921](https://cdn.jsdelivr.net/gh/123taojiale/dahuyou_picture@main/blogs/20210504224921.png)

```
表单字段的命名参考 接口 所提供的字段名称
```

#### 新增学生

`新增学生区域的 HTML`

```html
<!-- 新增学生 -->
<div id="stu-add">
    <form action="#" class="stu-form" id="add-stu-form">
        <p>
            <label for="add-name">姓名</label>
            <input type="text" name="name" id="add-name">
        </p>
        <p>
            <label for="">性别</label>
            <input type="radio" name="sex" id="add-male" value="0">
            <label for="add-male" class="sex">男</label>
            <input type="radio" name="sex" id="add-female" value="1">
            <label for="add-female" class="sex">女</label>
        </p>
        <p>
            <label for="add-email">邮箱</label>
            <input type="email" name="add-email" id="add-email">
        </p>
        <p>
            <label for="add-sNo">学号</label>
            <input type="text" name="sNo" id="add-sNo" readonly>
        </p>
        <p>
            <label for="add-birth">出生年</label>
            <input type="text" name="birth" id="add-birth">
        </p>
        <p>
            <label for="add-phone">手机号</label>
            <input type="text" name="phone" id="add-phone">
        </p>
        <p>
            <label for="add-address">住址</label>
            <input type="text" name="address" id="add-address">
        </p>
        <p>
            <label for=""></label>
            <input type="submit" value="提交">
            <input type="reset" value="重置">
        </p>
    </form>
</div>
```

```
该区域仅个 form 表单, 该表格的样式与 modal 中的 form 表单相同
```

![20210504223151](https://cdn.jsdelivr.net/gh/123taojiale/dahuyou_picture@main/blogs/20210504223151.png)

## JavaScript

### 学生列表和新增学生区域切换

```js
const menu = document.querySelector('#leftMenu');
menu.onclick = handlerMenu; // 左侧菜单切换功能

/**
 * 给左侧菜单 menu 注册事件
 * @param {Object} e 事件对象
 */
function handlerMenu(e) {
    // console.log(e.target.dataset.id);
    const node = e.target; // 获取被点击的元素
    if (node.hasAttributes('data-id')) {
        const siblingsArr = Array.from(node.parentElement.querySelectorAll('[data-id]'));
        // console.log(siblingsArr);

        siblingsArr.forEach(li => {
            li.classList.remove('active');
            document.getElementById(li.dataset.id).style.display = 'none';
        });
        node.classList.add('active');
        document.getElementById(node.dataset.id).style.display = 'block';
    }
}
```

### ajax + 添加学生 + 表单校验

`ajax.js`

```js
/**
 * ajax
 * @param {String} method 请求方式
 * @param {String} url 请求地址
 * @param {String} data 请求数据
 * @param {Function} success 请求成功的回调函数
 * @param {Boolean} isAsync 是否异步
 */
 function ajax(method, url, data, success, isAsync) {
    let xhr = null;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject('Microsoft.XMLHttp');
    }

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const res = JSON.parse(xhr.responseText);
            success && success(res);
        }
    }

    if (method === 'GET' || method === 'get') {
        xhr.open(method, url + '?' + data, isAsync);
        // console.log(url + '?' + data);
        xhr.send();
    } else if (method === 'POST' || method === 'post') {
        xhr.open(method, url, isAsync);
        xhr.send(data);
    }
}

/**
 * 本系统中的数据传输函数
 * @param {String} method 数据传输方式
 * @param {String} path 路径
 * @param {Object}} data 传输的数据
 * @param {Function} success 请求成功的回调函数
 */
function transferData(method, path, data, success) {
    console.log(`本次请求的路径是：https://open.duyiedu.com${path}`);
    // 获取传输的数据 (转化为 String 类型)
    let strData = '';
    if (typeof data === 'object') {
        for (let prop in data) {
            strData += `${prop}=${data[prop]}&`;
        }
        strData = strData.slice(0, strData.length - 1);
        // strData.slice(data.length - 1);
    } else {
        strData = data;
    }
    strData += '&appkey=_abc123_1606358542486';
    // console.log(`传输的数据是: ${strData}`);
    ajax(method, 'http://open.duyiedu.com' + path, strData, function (res) {
        if (res.status === 'success') {
            success && success(res);
        } else if (res.status === 'fail'){
            alert(res.msg);
        }
    }, true);
}
```

`表单校验`

```js
/**
 * 获取表单数据
 * @param {HTMLElement} form
 */
function getFormData(form) {
    // 得到表单数据
    let name = form.name.value,
        sex = form.sex.value,
        email = form.email.value,
        sNo = form.sNo.value,
        birth = form.birth.value,
        phone = form.phone.value,
        address = form.address.value;
    let result = { // 最终要返回的对象
        status: 'success',
        msg: '', // 存放错误提示信息
        data: {} // 存放最终通过校验的表单数据
    }
    // 表单校验
    if (!name || !email || !sNo || !birth || !phone || !address) {
        result.status = 'fail';
        result.msg = '信息填写不全，请校验后再提交';
        return result;
    }
    let emailReg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/g;
    if (!emailReg.test(email)) {
        result.status = 'fail';
        result.msg = "请输入正确的邮箱格式";
        return result;
    }
    let sNoReg = /\d{4,16}/g;
    if (!sNoReg.test(sNo)) {
        result.status = 'fail';
        result.msg = "学号必须为4-16位的数字组成";
        return result;
    }
    if (birth >= 2010 || birth <= 1970) {
        result.status = 'fail';
        result.msg = "只收1970-2010年出生的学生";
        return result;
    }
    let phoneReg = /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/g;
    if (!phoneReg.test(phone)) {
        result.status = "fail";
        result.msg = "请输入正确的手机号";
        return result;
    }
    // 将通过校验的数据存入 result.data
    result.data = {
        name,
        sex,
        email,
        sNo,
        birth,
        phone,
        address
    }
    return result;
}
```

```
在获取表单中的数据时, 对数据进行校验
```

`添加学生`

```js
const addStuForm = document.querySelector('#stu-add #add-stu-form'), // 新增学生表单
    addStuBtn = addStuForm.querySelector('input[type="submit"]'); // 添加学生按钮

addStuBtn.onclick = handlerAddStuBtn; // 添加学生功能

/**
 * 给添加学生按钮添加的事件处理函数
 * @param {Object} e 事件对象
 */
function handlerAddStuBtn(e) {
    e.preventDefault(); // 阻止刷新页面的默认行为
    const result = getFormData(addStuForm); // 获取新增学生表单中的数据
    // console.log(result);
    if (result.status === "success") {
        transferData('GET', '/api/student/addStudent', result.data, function (res) {
            // alert("添加成功");
            alert(res.msg);
            location.reload(); // 刷新页面 (仅当数据添加成功时才会刷新页面)
        })
    } else {
        alert(result.msg); // 弹出数据添加失败的原因 (能走到这一步 说明 表单数据校验已通过 有可能是学号字段重复的问题)
    }
}
```

### 查询所有学生 + 渲染 tbody + 渲染 翻页按钮

```js
const tBody = document.querySelector('tbody'),
    turnPage = document.querySelector('.turn-page');

// 存放与翻页相关的数据
const page = {
    size: 10, // 一页展示的数据量
    all: 0, // 一共有多少页
    now: 1 // 当前的页码
};

let tableData = []; // 包含所有学员信息

/**
 * 从指定接口获取最新的学生信息数据来渲染页面 并 初始化全局变量 page 和 tableData
 */
function getTableData() {
    transferData('GET', '/api/student/findAll', '', function (res) {
        tableData = res.data; // 获取 最新的 所有学生信息
        page.all = Math.ceil(tableData.length / page.size); // 这些学生信息需要多少页来展示

        renderBody(); // 渲染tBody
        renderTurnPage(); // 渲染turnPage
    });
}

/**
 * 利用获取到的最新数据来渲染 tBody
 */
function renderBody() {
    // tBody.innerHTML = '';
    let tBodyStr = '';
    tableData.forEach((stu, index) => {
        if (index >= (page.now - 1) * page.size && index <= page.now * page.size - 1) {
            tBodyStr += `<tr>
            <td>${stu.sNo}</td>
            <td>${stu.name}</td>
            <td>${stu.sex === 0 ? '男' : '女'}</td>
            <td>${stu.email}</td>
            <td>${new Date().getFullYear() - stu.birth}</td>
            <td>${stu.phone}</td>
            <td>${stu.address}</td>
            <td>
                <button class="edit btn">编辑</button>
                <button class="remove btn">删除</button>
            </td>
        </tr>`;
        }
    });
    tBody.innerHTML = tBodyStr;
}

/**
 * 利用获取到的最新数据来渲染 turnPage
 */
function renderTurnPage() {
    // turnPage.innerHTML = '';
    let turnPageStr = '';
    if (page.now !== 1) { // 不是首页 则显示 上一页 按钮
        turnPageStr += `<button class="prev-btn btn">< 上一页</button>`;
    }
    let icurPage = 1;
    while (icurPage <= page.all) {
        if (icurPage !== page.now) {
            turnPageStr += `<span class="page-num">${icurPage}</span>`;
        } else {
            turnPageStr += `<span class="page-num active">${icurPage}</span>`;
        }
        icurPage++;
    }
    if (page.now !== page.all) { // 不是尾页 则显示 下一页 按钮
        turnPageStr += `<button class="next-btn btn">下一页 ></button>`;
    }
    turnPage.innerHTML = turnPageStr;
}
```

### 删除功能 + 编辑功能 + 数据回填

```js
const modal = document.querySelector('.modal'), // 编辑表单蒙版
    editForm = modal.querySelector('form'), // 获取编辑表单
    editSubmitBtn = editForm.querySelector('input[type="submit"]'); // 编辑表单的提交按钮

tBody.onclick = handlerTBody; // 删除 & 编辑

/**
 * 编辑 & 删除
 * @param {Object} e 事件对象
 */
function handlerTBody(e) {
    const node = e.target;
    let tr_index, stuInfo; // 当前点击的行的索引 该行的学生信息
    if (node.tagName === 'BUTTON') {
        tr_index = Array.from(tBody.children).indexOf(node.parentElement.parentElement) + page.size * (page.now - 1);
        // console.log(tr_index); // 获取当前行的索引值
        stuInfo = tableData[tr_index]; // 获取这一行的学生信息 (用于表单信息的回填)
        if (node.classList.contains('edit')) { // 点击的是 编辑 按钮
            // console.log('edit');
            // console.log(stuInfo);
            // 显示编辑表单
            modal.style.display = 'block';
            // 表单信息回填
            for (let prop in stuInfo) {
                if (prop in editForm && prop !== 'id') {
                    editForm[prop].value = stuInfo[prop];
                }
            }
            editSubmitBtn.onclick = function (e) {
                e.preventDefault(); // 防 刷新页面
                updateStuInfo(getFormData(editForm));
            }
        } else if (node.classList.contains('remove')) { // 点击的是 删除 按钮
            // console.log('remove');
            const sNo = stuInfo.sNo;
            removeStuInfo(sNo);
        }
    }
}

/**
 * 编辑表单的关闭功能
 * @param {Object} e 事件对象
 */
function handlerModal(e) {
    const node = e.target;
    if (node.classList.contains('close')) {
        // console.log('close');
        modal.style.display = 'none';
    }
}

/**
 * 修改功能
 * @param {Object} result 获取到的表单数据
 */
function updateStuInfo(result) {
    if (result.status === 'fail') {
        alert(result.msg);
    } else if (result.status === 'success') {
        transferData('GET', '/api/student/updateStudent', result.data, function (res) {
            alert(res.msg);
            modal.style.display = 'none';
            getTableData(); // 重新获取数据 渲染页面
        });
    }
}

/**
 * 删除功能
 * @param {Number} sNo 学号
 */
function removeStuInfo(sNo) {
    transferData("GET", "/api/student/delBySno", {
        sNo,
    }, function (res) {
        alert(res.msg);
        getTableData(); // 重新获取数据 渲染页面
    });
}
```

### 翻页功能

```js
const turnPage = document.querySelector('.turn-page');

turnPage.onclick = handlerTurnPage; // 换页功能

/**
 * 翻页功能
 * 给 上下页 和 数字索引 按钮绑定事件
 * @param {Object} e 事件对象
 */
function handlerTurnPage(e) {
    const node = e.target; // 获取被点击的元素
    if (node.classList.contains('prev-btn')) {
        // console.log('prev-btn');
        page.now--;
        getTableData();
    }
    if (node.classList.contains('next-btn')) {
        // console.log('next-btn');
        page.now++;
        getTableData();
    }
    if (node.classList.contains('page-num')) {
        // console.log('page-num');
        page.now = parseInt(node.innerHTML);
        getTableData();
    }
}
```

## 需要熟练掌握的基本操作

```
记录一些需要熟练掌握的知识点
```

### 使用 XMLHttpRequest 来实现一个简单的 ajax

```js
/**
 * 封装ajax
 * @param {String} method 请求方式
 * @param {String} url 请求地址
 * @param {String} data 请求数据
 * @param {Function} success 请求成功的回调函数
 * @param {Boolean} isAsync 是否异步
 */
function ajax(method, url, data, success, isAsync) {
    let xhr = null;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject('Microsoft.XMLHttp');
    }

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            success && success(data);
        }
    }

    if(method === 'GET' || method === 'get'){
        xhr.open(method, url + '?' + data, isAsync);
        xhr.send();
    }else if(method === 'POST' || method === 'post'){
        xhr.open(method, url, isAsync);
        xhr.send(data);
    }
}
```

**请求参数**

```
格式: key1=value1&key2=value2
发送请求参数时, get 和 post 两种请求方式的区别
    get 请求
        请求参数直接拼接在 xhr.open() 的第二个参数 请求地址 后面
        [注] 第一个参数的前面需要加上一个问号 ?
    post 请求
        请求参数通过 xhr.send() 来发送
```

### 小技巧

`删除字符串的最后一个字符`

```js
str = str.slice(0, str.length - 1);
```

`已知用户出生年份 birth 获取 当前年龄`

```js
new Date().getFullYear() - birth
```

## bug

```
记录完成该项目时 遇到的一些 bug
```

- ajax 第二个参数 忘记写协议

![20210405165301](https://cdn.jsdelivr.net/gh/123taojiale/dahuyou_picture@main/blogs/20210405165301.png)

`报错写法`

```js
// open.duyiedu.com 只写了域名 前面还得加上 http:// 才有效
ajax(method, 'open.duyiedu.com' + path, strData, function (res) {
    if (res.status === 'success') {
        success && success(res);
    } else {
        alert(res.msg);
    }
}, true);
```

`正确写法`

```js
// open.duyiedu.com 只写了域名 前面还得加上 http:// 才有效
ajax(method, 'http://open.duyiedu.com' + path, strData, function (res) {
    if (res.status === 'success') {
        success && success(res);
    } else {
        alert(res.msg);
    }
}, true);
```

- 数据请求不过来

`先确保PC处于联网状态`

- 点击 提交表单 按钮

```
当我们点击 提交表单 type='submit' 按钮后 页面默认会刷新
可以通过给该按钮绑定事件 阻止其默认行为来防止页面刷新
方式1:
    e.preventDefault(); // 推荐
方式2:
    return false;
```

- http 请求错误 400

![20210406095131](https://cdn.jsdelivr.net/gh/123taojiale/dahuyou_picture@main/blogs/20210406095131.png)

![20210406095214](https://cdn.jsdelivr.net/gh/123taojiale/dahuyou_picture@main/blogs/20210406095214.png)

该错误信息是由于性别字段的数据类型错误导致的

`错误`

```html
<!-- 没有给 input type='radio' 给定指定的 value 值 -->
<p>
    <label for="">性别</label>
    <input type="radio" name="sex" id="add-male">
    <label for="add-male" class="sex">男</label>
    <input type="radio" name="sex" id="add-female">
    <label for="add-female" class="sex">女</label>
</p>
```

`修改后`

```html
<!-- 没有给 input type='radio' 给定指定的 value 值 -->
<p>
    <label for="">性别</label>
    <input type="radio" name="sex" id="add-male" vlaue='0'>
    <label for="add-male" class="sex">男</label>
    <input type="radio" name="sex" id="add-female" vlaue='1'>
    <label for="add-female" class="sex">女</label>
</p>
```

在调试这一部分的程序时，先提前把`默认行为`给取消掉。这里说的默认行为，指的是点击提交表单后，刷新页面的默认行为。

- 页码变动后 turnPage 区域的渲染问题

```
比如 当前学生共显示 3 页, 第 3 也仅显示一条学生信息, 在当前情况下, 若删除掉一条学生信息, 那么会出现一个小 bug, 页码依旧显示 3 页, 页面重新加载后, 页码变为 两页, 变为 正常状态
```

## 提高

- 查询功能
- 学生信息按照添加时间降序
