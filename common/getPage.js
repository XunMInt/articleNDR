function Page4array(array, pn, ps, fn) {
    for (let i = 1, len = arguments.length; i < len; i++) {
        let pm = arguments[i];
        if (pm && typeof pm == 'function') {    //切换回调参数位置
            arguments[i] = undefined;
            fn = pm;
            break;
        }
    }
    this.fn = fn;
    this.source = array;
    this.total = 0; //总数
    this.size = 1;  //总页数
    if (array && array.length) {
        this.total = array.length;
        ps = (!ps || ps < 0) ? 10 : Number(ps);
        if (ps > 0)
            this.size = Math.ceil(this.total / ps);
    }
    this.adjust(pn, ps);
    Object.prototype.toString.call(array) == '[object Array]' ? this.run() : (this.result = []);
    return this;
}

/**
 * 静态初始化函数
 * @param array {@link Array}：源数组；
 * @param pn {@link Number}：当前页；
 * @param ps {@link Number}：页显示数；
 * @param fn {@link Function}：执行完成后回调；
 * @return {@link Page4array}
 * @constructor
 * @version V1.0.1
 * @author Haining.Liu
 */
Page4array.Init = function () {
    return new Page4array(...arguments);
};

(function () {
    /**
     * 上一页
     * @param fn {@link Function}：执行完成后回调；
     * @return {@link Page4array}
     */
    Page4array.prototype.prev = function (fn) {
        this.pageNum--;
        return this.run(fn);
    };
    /**
     * 下一页
     * @param fn {@link Function}：执行完成后回调；
     * @return {@link Page4array}
     */
    Page4array.prototype.next = function (fn) {
        this.pageNum++;
        return this.run(fn);
    };
    /**
     * 去指定页
     * @param pn {@link Number}：指定页；
     * @param fn {@link Function}：执行完成后回调；
     * @return {@link Page4array}
     */
    Page4array.prototype.to = function (pn, fn) {
        this.adjust(pn);
        return this.run(fn);
    };
    /**
     * 执行
     * @param fn {@link Function}：执行完成后回调；
     * @return {@link Page4array}
     */
    Page4array.prototype.run = function (fn) {
        this.adjust();
        // this.start = (this.pageNum - 1) * this.pageSize;
        /*		if (this.start > this.total) {
                    this.result = [];
                    return this;
                }*/
        this.result = this.source.slice(this.start, this.end + 1);
        this.fn = fn || this.fn;
        if (!this.fn || typeof this.fn != 'function')
            this.data = undefined;
        else
            try {
                this.data = this.fn(this.result, this);
            } catch (e) {
                console.error(this.data = e);
            }
        return this;
    };
    /**
     * 分页值校准
     * @param pn {@link Number}：当前页；
     * @param ps {@link Number}：页显示数；
     * @return {@link Page4array}
     */
    Page4array.prototype.adjust = function (pn, ps) {
        this.pageNum = pn || this.pageNum;
        this.pageSize = ps || this.pageSize;
        this.pageSize = (!this.pageSize || this.pageSize < 0) ? 10 : Number(this.pageSize);
        this.pageNum = (!this.pageNum || this.pageNum <= 0) ? 1 :
            (this.pageNum > this.size) ? this.size : Number(this.pageNum);

        this.start = (this.pageNum - 1) * this.pageSize;
        this.end = (this.start + this.pageSize >= this.total) || this.pageSize == 0 ?
            this.total : this.start + this.pageSize;
        this.end--;
        return this;
    };
    /**
     * 重写toString
     * @return {@link String}
     */
    Page4array.prototype.toString = function () {
        return JSON.stringify(this);
    };
})();



function fn(data) {
    let rs = new Array(data.length);
    for (let i = 0; i < data.length; i++)
        rs[i] = data[i];
    return rs;
}

list = {
    data: '',//数据
    pageNum: '',//当前页
    pageSize: '',//每页显示数量
    size: '',//总页数
    total: ''//总个数
}

function getPage(ids,size,num) {
    list = {
        list: '',//数据
        pageNum: '',//当前页
        size: '',//总页数
        total: ''//总个数
    }
    let temparr = Page4array.Init(ids, num, size, fn);
    list.list = temparr.data;
    list.pageNum = temparr.pageNum;
    list.size = temparr.size;
    list.total = temparr.total;
    return list;
}

module.exports.getPage = getPage;