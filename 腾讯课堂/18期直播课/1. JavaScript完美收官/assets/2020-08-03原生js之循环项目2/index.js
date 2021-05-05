
/**
 * 
 * @param {String} method 请求方式
 * @param {String} url    请求地址
 * @param {String} data   请求数据  key=value&key1=value1
 * @param {Function} cb     成功的回调函数
 * @param {Boolean} isAsync 是否异步 true
 */
function ajax(method, url, data, cb, isAsync) {
    // get   url + '?' + data
    // post 
    var xhr = null;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }

    // xhr.readyState    1 - 4  监听是否有响应
    xhr.onreadystatechange = function () {
        if(xhr.readyState == 4) {
            if (xhr.status == 200) {
                cb(JSON.parse(xhr.responseText))
            }
        }
    }

    if (method == 'GET') {
        xhr.open(method, url + '?' + data, isAsync);
        xhr.send();
    } else if (method == 'POST') {
        xhr.open(method, url, isAsync);
        // key=value&key1=valu1
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(data);
    }


}
var tableData = [];
// 用于书写当前系统中所有的事件绑定
function bindEvent () {
    var menu = document.querySelector('.menu');
    menu.onclick = function (e) {
        console.log(e.target)
        if (e.target.tagName === 'DD' ) {
            // var id = e.target.getAttribute('data-id')
            var id = e.target.dataset.id;
            var content = document.getElementById(id);
            e.target.classList.add('active');
            var targetSiblings = getSiblings(e.target);
            for (var i = 0; i < targetSiblings.length; i++) {
                targetSiblings[i].classList.remove('active');
            }
            content.style.display = 'block';
            var contentSiblings = getSiblings(content);
            for(var i = 0; i < contentSiblings.length; i++) {
                contentSiblings[i].style.display = 'none';
            }
        }
    }
    var addStudentgBtn = document.getElementById('add-student-btn');
    addStudentgBtn.onclick = function (e) {
        // console.log('====')
        e.preventDefault();
        var studentAddForm = document.getElementById('add-student-form');
        var result  = getFormData(studentAddForm);
        console.log(result);
        if (result.status === 'success') {
            // var data = "";
            // for (var prop in result.data) {
            //     data += prop + '=' + result.data[prop] + '&';
            // }
            // data += "appkey=DuYimeiqi_1564986205860";
            // 将数据存储到后台
            // ajax('GET', 'http://open.duyiedu.com/api/student/addStudent', data, function (response) {
            //     console.log(response);
            //     if (response.status === 'success') {
            //         alert('添加成功');
            //         location.reload();
            //     } else {
            //         alert(response.msg);
            //     }
            // }, true);
            transferData('GET', '/api/student/addStudent', result.data, function () {
                alert('添加成功');
                location.reload();
            })
        } else {
            alert(result.msg);
        }
        
    }
    // 删除和编辑的功能
    var tBody = document.getElementById('tBody');
    tBody.onclick = function (e) {
        if (e.target.classList.contains('edit')) {
            e.target.parentNode.parentNode
            console.log('编辑按钮')
        } else if (e.target.classList.contains('remove')) {
            
            var index = getStudentIndex(e.target);
            var isDel = confirm('确认删除学号为' + tableData[index].sNo + '的学生信息？');
            if (isDel) {
                transferData('GET', '/api/student/delBySno', {
                    sNo: tableData[index].sNo
                }, function (res) {
                    alert('删除成功');
                    getTableData();
                })
            }
        }
    }
}

// 获取node节点的所有兄弟节点 nextSibling
function getSiblings(node) {
    var parentNode = node.parentNode;
    var children = parentNode.children;
    var siblings = [];
    for (var i = 0; i < children.length; i++) {
        if (children[i] != node) {
            siblings.push(children[i]);
        }
    }
    return siblings;
}

bindEvent();


/**
 * 获取表单数据
 * @param {*} form
 * return  {data: {}, msg: "", status: 'success'} 
 */
function getFormData(form) {
    var name = form.name.value;
    var sex = form.sex.value;
    var email = form.email.value;
    var sNo = form.sNo.value;
    var birth = form.birth.value;
    var phone = form.phone.value;
    var address = form.address.value;
    var result = {
        data: {},
        msg: '',
        status: 'success'
    }
    if (!name || !email || !sNo || !birth || !phone || !address) {
        result.status = 'fail';
        result.msg = '信息填写不全，请校验后再提交';
        return result;
    }
    var emailReg = /^[\w.]+@[\w.]+\.(com|cn|net)$/
    if (!email.match(emailReg)) {
        result.status = 'fail';
        result.msg = '邮箱格式不正确';
        return result;
    }
    var sNoReg = /^\d{4,16}$/;
    if (!sNoReg.test(sNo)) {
        result.status = 'fail';
        result.msg = '学号必须为4-16位数字';
        return result;
    }
    // 1970 - 2020
    // var 
    if (birth <= 1970 || birth >= 2020) {
        result.status = 'fail';
        result.msg = '我们只招收1970年以后出生的人， 未满一岁不收';
        return result;
    }
    var phoneReg = /^1[3456789]\d{9}$/;
    if (!phoneReg.test(phone)) {
        result.status = 'fail';
        result.msg = '手机号有误';
        return result;
    }

    result.data = {
        name,
        sex,
        sNo,
        phone,
        email,
        birth,
        address
    }
    return result;

}

/**
 * 获取表格数据
 */
function getTableData() {
    // ajax('GET', 'http://open.duyiedu.com/api/student/findAll', "appkey=DuYimeiqi_1564986205860", function (response) {
    //     console.log(response);
    //     renderTable(response.data);
    // }, true);
    transferData('GET', '/api/student/findAll', "", function (response) {
        tableData = response.data;
        renderTable(response.data);
    })
}

getTableData();
/**
 * 
 * @param {*} data
 * 渲染表格数据 
 */
function renderTable(data) {
    var tBody = document.getElementById('tBody');
    var str = "";
    data.forEach(function (item) {
        str += `<tr>
        <td>${item.sNo}</td>
        <td>${item.name}</td>
        <td>${item.sex == 0 ? '男': '女'}</td>
        <td>${item.email}</td>
        <td>${new Date().getFullYear() - item.birth}</td>
        <td>${item.phone}</td>
        <td>${item.address}</td>
        <td>
            <button class="edit btn">编辑</button>
            <button class="remove btn">删除</button>
        </td>
    </tr>`
    });
    tBody.innerHTML = str;
}
/**
 * 封装本系统的所有调用ajax函数的部分
 * @param {*} method 
 * @param {*} path 
 * @param {*} data 
 * @param {*} cb 
 */
function transferData(method, path, data, cb) {
    var strData = "";
    // 如果传递过来的数据是对象类型的 需要将对象转换成key=value格式的字符串
    if (typeof data === 'object') {
        for (var prop in data) {
            strData += prop + '=' + data[prop] + '&';
        }
        strData = strData.slice(data.length - 1);
    } else {
        strData = data;
    }
    console.log(strData);
    strData += '&appkey=DuYimeiqi_1564986205860'
    ajax(method, 'http://open.duyiedu.com' + path, strData, function (response) {
        // 如果后台返回的是所有行为都成功存储或者处理 那么继续执行回调函数 否则提示错误信息
        if (response.status === 'success') {
            cb(response)
        } else {
            alert(response.msg);
        }
    }, true);
}


function getStudentIndex(node) {
    var trNode = node.parentNode;
    // 查找node标签的tr父节点
    while(trNode && trNode.tagName !== 'TR') {
        trNode = trNode.parentNode;
    }
    if (!trNode) {
        alert('没有找到当前按钮对应的tr父节点')
        return false;
    }
    var trNodeSiblings = trNode.parentNode.children;
    for (var i = 0; i < trNodeSiblings.length; i++) {
        if (trNodeSiblings[i] === trNode) {
            return i;
        }
    }
}