export class ParseJSON {
    static parse(str) {
        return this.parseStart(str);
    }
    static findIndex(str, i, fstr, len) {
        var fi = str.indexOf(fstr, i + 1);
        if (0 > fi) {
            fi = len;
        }
        return { str: str.substring(i + 1, fi), i: fi };
    }
    static finCurrObj() {
        this.type = 1;
        if (null == this.cobj) {
            return null;
        }
        if (0 == this.currArr.length) {
            if (this.cobj.k) {
                this.ret[this.cobj.k] = this.cobj.val;
            }
            return null;
        }
        else {
            var pobj = this.currArr.pop();
            if (this.cobj.k) {
                if (Array.isArray(pobj.val)) {
                    if (null != this.cobj.k) {
                        var obj = {};
                        obj[this.cobj.k] = this.cobj.val;
                        pobj.val.push(obj);
                    }
                    else {
                    }
                }
                else {
                    pobj.val[this.cobj.k] = this.cobj.val;
                }
            }
            else if (Array.isArray(this.cobj.val)) {
                if (Array.isArray(pobj.val)) {
                    pobj.val.push(this.cobj.val);
                }
                else {
                    pobj.val = this.cobj.val;
                }
            }
            else {
            }
            return pobj;
        }
    }
    static formatVal(str) {
        if (null == str) {
            return null;
        }
        var numVal = Number(str);
        if (!isNaN(numVal)) {
            return numVal;
        }
        if ("false" == str.toLowerCase()) {
            return false;
        }
        else if ("true" == str.toLowerCase()) {
            return true;
        }
        else if ("null" == str) {
            return null;
        }
        return str;
    }
    static finCurrStr() {
        if (null != this.currStr) {
            this.currStr = this.currStr.trim();
            if ("" != this.currStr) {
                if (null != this.cobj) {
                    if (Array.isArray(this.cobj.val)) {
                        this.cobj.val.push(this.formatVal(this.currStr));
                    }
                    else {
                        this.cobj.val = this.formatVal(this.currStr);
                        this.cobj = this.finCurrObj();
                    }
                }
                this.currStr = "";
            }
        }
    }
    static parseStart(str) {
        this.len = str.length;
        var i = 0;
        this.ret = {};
        this.currStr = null;
        this.currArr = [];
        this.cobj = null;
        this.type = 0;
        while (i < this.len) {
            var c = str.charAt(i);
            if ("/" == c) {
                if (i + 1 < this.len) {
                    i += 1;
                    var cNext = str.charAt(i);
                    var cstr = null;
                    if ("/" == cNext) {
                        cstr = "\n";
                    }
                    else if ("*" == cNext) {
                        cstr = "*/";
                    }
                    if (null != cstr) {
                        this.finCurrStr();
                        var fi = str.indexOf(cstr, i);
                        if (0 > fi) {
                            console.log("没有找到注释结尾，应该是一直注释到最后了");
                            i = this.len;
                        }
                        else {
                            i = fi + cstr.length - 1;
                        }
                    }
                }
            }
            else if ("}" == c) {
                if (null != this.cobj) {
                    this.finCurrStr();
                    if (null != this.cobj) {
                        this.cobj = this.finCurrObj();
                    }
                }
                this.currStr = "";
                this.type = 1;
            }
            else if ("{" == c) {
                this.currStr = "";
                this.type = 1;
            }
            else if ("'" == c || "\"" == c || "‘" == c || "“" == c) {
                if ("‘" == c) {
                    c = "’";
                }
                else if ("“" == c) {
                    c = "”";
                }
                var obj = this.findIndex(str, i, c, this.len);
                if (2 == this.type && null != this.cobj && Array.isArray(this.cobj.val)) {
                    if (null != this.currStr) {
                        this.currStr = this.currStr.trim();
                        if ("" != this.currStr) {
                            this.cobj.val.push(this.formatVal(this.currStr));
                        }
                    }
                    this.cobj.val.push(obj.str);
                    this.currStr = "";
                }
                else if (null != this.currStr) {
                    this.currStr += obj.str;
                }
                i = obj.i;
            }
            else if (";" == c || "," == c || "\n" == c) {
                this.finCurrStr();
            }
            else if ("]" == c) {
                if (null != this.currStr && null != this.cobj && Array.isArray(this.cobj.val)) {
                    this.currStr = this.currStr.trim();
                    if ("" != this.currStr) {
                        this.cobj.val.push(this.formatVal(this.currStr));
                    }
                }
                if (null != this.cobj) {
                    this.cobj = this.finCurrObj();
                    this.cobj = this.finCurrObj();
                }
                this.currStr = "";
            }
            else if ("[" == c) {
                if (2 != this.type) {
                    console.warn("没有key值，忽略掉一个数组");
                }
                else {
                    if (null != this.cobj) {
                        this.currArr.push(this.cobj);
                    }
                    this.cobj = { val: [] };
                }
            }
            else if (":" == c) {
                if (null != this.currStr && 1 == this.type) {
                    this.type = 2;
                    if (null != this.cobj) {
                        this.currArr.push(this.cobj);
                    }
                    if (null != this.cobj && Array.isArray(this.cobj.val)) {
                        var pcobj = this.cobj;
                        this.cobj = { val: {} };
                        pcobj.val.push(this.cobj.val);
                        this.currArr.push(this.cobj);
                    }
                    this.cobj = { k: this.currStr.trim(), val: {} };
                    this.currStr = "";
                }
            }
            else if (null != this.currStr) {
                this.currStr += c;
            }
            i++;
        }
        return this.ret;
    }
}

//# sourceMappingURL=ParseJSON.js.map
