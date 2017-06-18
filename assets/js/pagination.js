/**
 * 分頁按鈕
 * @author Shane Yi <scps950613@gmail.com>
 * @date 2017-03-30
 *
 * @param {object} config 預設值
 */
function Pagination(config) {
    this.config = {
        selector: $('ul.pagination'),   // 預設選擇器
        items: 16,                      // 全部 items 的數量
        itemsOnPage: 3,                 // 一頁有多少 items
        currentPage: 1,                 // 目前在第幾頁
        maxSize: 3,                     // 此 UI 元件中間顯示的按鈕之最大數量
        hrefTextPrefix: '#page-',       // 在 url 網址上添加參數
        prevText: '&lsaquo;',           // 上一個 文字名稱
        nextText: '&rsaquo;',           // 下一個 文字名稱
        firstText: '&laquo;',           // 第一個 文字名稱
        lastText: '&raquo;',            // 最後一個 文字名稱
        totalPage: 0                    // 全部的頁數
    };

    if (config === undefined) {
        return;
    }

    if (typeof config === 'object') {
        for (var key in config) {
            if (!config.hasOwnProperty(key)) {
                continue;
            }
            this.config[key] = config[key];
        }
        this.config.hrefTextPrefix = (this.config.hrefTextPrefix.length === 0) ? '#': this.config.hrefTextPrefix;
    } else {
        throw new Error('Please input the object.');
    }
}

/**
 * 初始化整個分頁按鈕
 */
Pagination.prototype.init = function() {
    var totalPage;
    var conf = this.config;
    var $pag = conf.selector;

    totalPage = (conf.items / conf.itemsOnPage).toString().split('.')[0];
    totalPage = (conf.items % conf.itemsOnPage) !== 0 ? parseInt(totalPage) + 1 : parseInt(totalPage);
    this.totalPage = totalPage;

    $pag.html('');
    $pag.append('<li class="first"><a>' + conf.firstText + '</a></li>');
    $pag.append('<li class="previous"><a>' + conf.prevText + '</a></li>');

    var i = 1;
    var maxPage = conf.maxSize;
    /**
     * 顯示出page數字按鈕
     *
     * 1. 都沒有第1頁與最後1頁
     * 2. (左)只有第1頁
     * 3. (右)只有最後1頁
     * 4. 全部都有
     */
    if (totalPage > maxPage) {
        var half = parseInt((maxPage / 2).toString().split('.')[0]);

        i = conf.currentPage - half;
        i = i < 1 ? 1 : i;
        i = i > (totalPage-maxPage+1) ? (totalPage-maxPage+1) : i;
        maxPage += (i-1);
    }

    while (i <= totalPage && i <= maxPage) {
        if (conf.currentPage === i) {
            $pag.append('<li class="active"><a>' + i + '</a></li>');
        } else {
            $pag.append('<li><a href="' + conf.hrefTextPrefix + i + '">' + i + '</a></li>');
        }
        i++;
    }

    $pag.append('<li class="next"><a>' + conf.nextText + '</a></li>');
    $pag.append('<li class="last"><a>' + conf.lastText + '</a></li>');

    // 加上連結與disabled
    $pag.children('li.first').children('a').attr('href', conf.hrefTextPrefix + '1');
    $pag.children('li.last').children('a').attr('href', conf.hrefTextPrefix + totalPage);

    if (conf.currentPage === 1) {
        $pag.children('li.first').addClass('disabled');
        $pag.children('li.previous').addClass('disabled');
        $pag.children('li.first').children('a').removeAttr('href');
    } else {
        $pag.children('li.previous').children('a').attr('href', conf.hrefTextPrefix + (conf.currentPage-1));
    }

    if (conf.currentPage === totalPage) {
        $pag.children('li.last').addClass('disabled');
        $pag.children('li.next').addClass('disabled');
        $pag.children('li.last').children('a').removeAttr('href');
    } else {
        $pag.children('li.next').children('a').attr('href', conf.hrefTextPrefix + (conf.currentPage+1));
    }

    return this;
};

/**
 * 啟動分頁按鈕的按鍵功能，請先初始劃分頁按鈕再使用此函式
 *
 * @param {function | null} func 按下分頁按鈕時會觸發的內容
 */
Pagination.prototype.clickRun = function(func) {
    var me = this;
    var paginClick = function() {
        var href = $(this).children('a').attr('href');

        if (href !== undefined) {
            me.selectPage(parseInt(href.replace(me.config.hrefTextPrefix,'')));
            if (typeof func === 'function') {
                func();
            }
        }
    };

    if (me.config.selector.children('li').length === 0) {
        throw new Error('Please execute init() method first.');
    }
    me.config.selector.on('click', 'li', paginClick);
};

/**
 * 當頁面刷新時會抓取 url 網址的 hash 頁數值
 */
Pagination.prototype.loadURLHash = function() {
    var hashPage = parseInt(window.location.hash.replace(this.config.hrefTextPrefix,''));
    this.config.currentPage = isNaN(hashPage)? 1 : hashPage;
    return this;
};

/**
 * 選擇目前位於的頁數
 *
 * @param {int} pageNumber 目前位於的頁數
 */
Pagination.prototype.selectPage = function(pageNumber) {
    this.config.currentPage = pageNumber;
    this.init();
    return this;
};

/**
 * 設置全部 items 的數量
 *
 * @param {int} items 全部 items 的數量
 */
Pagination.prototype.setItems = function(items) {
    this.config.items = items;
    return this;
};

/**
* 設置每頁 items 的數量
*
* @param {int} items 每頁 items 的數量
*/
Pagination.prototype.setItemsOnPage = function(itemsOnPage) {
    this.config.itemsOnPage = itemsOnPage;
    return this;
};

/**
 * 取得目前位於的頁數
 */
Pagination.prototype.getCurrentPage = function() {
    return this.config.currentPage;
};

/**
* 取得全部 items 的數量
*/
Pagination.prototype.getItems = function() {
    return this.config.items;
};

/**
* 取得每頁 items 的數量
*/
Pagination.prototype.getItemsOnPage = function() {
    return this.config.itemsOnPage;
};

/**
* 取得全部的頁數
*/
Pagination.prototype.getTotalPage = function() {
    return this.config.totalPage;
};
