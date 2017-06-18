## JavaScrip 函式庫

### 使用 jquery 的 ajax 撈取資料的改良版

js 使用方式 :
```js
var ajax = new AjaxRequest('https://domain-name/v0.0/xx');
ajax.setMethodData('POST', {data: ''}).run(function(){}, 'testFunc');
```

js 函式庫程式碼 :
```js
/**
 * 使用 jquery 的 ajax 撈取資料的改良版，可連續使用，預設為 GET
 *
 * @param {string | null} url 後端 api 網址
 * @param {string | null} failText debug 專用，當 Ajax 失敗時預設 alert 出來的資訊
 */
function AjaxRequest(url, failText) {
    this.url = url !== undefined ? url : '';
    this.failText = failText !== undefined ? failText : '資料庫連結失敗！';
    this.method = 'GET';
    this.paramGET = '';
    this.data = {};
}

AjaxRequest.prototype = {
    /**
     * 執行 ajax 後代入要執行的 callbackFunction
     * 此部分參考:
     * http://marklin-blog.logdown.com/posts/301915-jquery-technology-when-and-then-asynchronously-pipe
     * http://eddychang.me/blog/javascript/56-jquery-promise.html
     *
     * @param {function} callbackFunction 後續要執行的函式
     * @param {string} intro 標記此次執行的名稱
     */
    run: function(callbackFunction, intro) {
        var me = this;
        var getData;
        var promise = $.ajax({
            url: this.url + this.paramGET,
            type: this.method,
            dataType: 'json',
            data: this.data,
        });

        intro = intro === undefined ? '' : '['+intro+']\n';

        getData = promise.then(function(response) {
            if (!response.result) {
                return $.Deferred().reject(response);
            } else {
                return response;
            }
        }, function(response){
            return $.Deferred().reject(response);
        });

        getData.done(callbackFunction)
        .fail(function(response) {
            if (response.success !== undefined) {
                console.error('回傳錯誤方式: json格式');
                alert(intro + response.msg);
            } else {
                console.error('回傳錯誤方式: http狀態碼' + response.status);
                alert(intro + me.failText);
            }
        });
    },

    /**
     * 設定 ajax 方法與資料
     * @param {string} method 'GET' 或 'POST'
     * @param {object} data {名稱: 內容}
     */
    setMethodData: function(method, data) {
        this.method = method;

        if (this.method === 'GET') {
            this.paramGET = '';
            for (var key in data) {
                if (!setting.hasOwnProperty(key)) {
                    continue;
                }
                this.paramGET += (key + '=' + data[key] + '&');
            }

            this.paramGET = this.paramGET.length === 0 ? this.paramGET : '?' + this.paramGET.slice(0, -1);
        } else
        if (this.method === 'POST') {
            this.data = data || {};
        } else {
            throw new Error('Method error.');
        }

        return this;
    },

    /**
     * 設定後端 api 網址
     * @param {string} url 後端 api 網址
     */
    setURL: function(url) {
        this.url = url;
        return this;
    }
};
```

### 取得 url GET 參數

模仿 PHP 取得 GET 參數的使用方式 :
```js
var jq_GET = (function(qur) {
    if (qur == "") return {};
    var parameters = {};

    for (var i = 0; i < qur.length; ++i) {
        var p = qur[i].split('=');
        if (p.length != 2) continue;
        parameters[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
    }
    return parameters;
})(window.location.search.substr(1).split('&'));
```

### 把格式化的字串時間傳換成 JavaScript 的專屬時間
```js
/**
 * 範例: getDateTime('2015-12-15 00:50:12');
 * 結果: 1450111812000
 */
function getDateTime(time) {
    var dpa=time.split(" ");
    var dpd=dpa[0].split("-");
    var dpt=dpa[1].split(":");
    return new Date(dpd[0],(dpd[1]-1),dpd[2],dpt[0],dpt[1],dpt[2]).getTime();
}
```

### 可用來比較時間大小
```js
/**
 * 範例: trimTimeString('2015-12-15 00:50:12');
 * 結果: "20151215005012"
 *
 * 範例: trimTimeString('2015-12-15 00:50:12') > trimTimeString('2015-12-28 00:50:42')
 * 結果: false
 */
function trimTimeString(time){
    if(time){
        return time.substr(0,4)+time.substr(5,2)+time.substr(8,2)+time.substr(11,2)+time.substr(14,2)+time.substr(17,2);
    }
}
```

### 取得現在的時間 (格式化後之字串)
```js
/**
 * 範例: getNowTimeString('ADD', 8);
 * 結果: "2017-12-15 22:05:00"
 *
 * 範例: getNowTimeString('MINUS', 2)
 * 結果: "2017-12-15 12:05:00"
 */
function getNowTimeString(action, hours) {
    var date = new Date();

    if(action === 'ADD' && hours){
        date.setHours(date.getHours() + hours );
    } else if (action === 'MINUS' && hours){
        date.setHours(date.getHours() - hours );
    }

    date = date.toISOString();
    return date.substr(0,10)+' '+date.substr(11,8);
}
```
