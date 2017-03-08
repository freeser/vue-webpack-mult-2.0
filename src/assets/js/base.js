export default {
    arrayFindObjIndex: function (val, key, arr) {
        let has = false
        for (var i = 0, l = arr.length; i < l; i++) {
            if (val == arr[i][key]) {
                has = true
                break
            }
        }
        return has ? i : -1
    },
    imgsrc: function (_src, defsrc) {
        let src = defsrc || 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyBAMAAADsEZWCAAAAElBMVEXR0dGqqqrCwsKysrK5ubnKysqGpJ8RAAAAtUlEQVQ4y72TMQ7CMAxFTaAH+CnsKRI7QepOBvZWgvtfBaESSv1jKRKob32K/W238iOP40lKuATAC9NEvLiy6TBxoSdvwa+2WVCrER+USbMJSxNhNcLMeW3D2UwTzEkHWnXG3FsrtdVg760qdW22nXltSRSNyolmVIPyZ+XJNOo6HGEQo9xeLOP/ZDZmH9t0VmqHiZ5WkNThWKBdKBfxxa1wUP3n34GycmD6vH4m5CbEIc/OyBPDUSvwZuB80QAAAABJRU5ErkJggg=='
        if (!_src || _src == 'null') return src
        if (_src.indexOf('http://') != -1) {
            src = location.href.indexOf('https://') != -1 ? _src.replace('http://', 'https://') : _src
        } else if (_src.indexOf('https://') != -1 || _src.indexOf('data:image') != -1) {
            src = _src
        } else {
            src = 'http://wx.15120.cn/SysApi2/Files/' + _src
        }
        return src
    },
    initUpload: function (weui, name, fn) {
        weui.uploader(name, {
            url: '/doctor/uploadFileNew',
            auto: true,
            type: 'file',
            compress: {
                width: 1600,
                height: 1600,
                quality: 0.8
            },
            onBeforeQueued: function (files) {
                if (['image/jpg', 'image/jpeg', 'image/png', 'image/gif'].indexOf(this.type) < 0) {
                    weui.alert('请上传图片')
                    return false
                }
                if (this.size > 10 * 1024 * 1024) {
                    weui.alert('请上传不超过10M的图片')
                    return false
                }
                // if (files.length > 5) { // 防止一下子选择过多文件
                //   weui.alert('最多只能上传5张图片，请重新选择');
                //   return false;
                // }
                // return true; // 阻止默认行为，不插入预览图的框架
            },
            onQueued: function () {
                // console.log(name + '--onQueued--');
                // console.log(this);
                // console.log(this.base64); // 如果是base64上传，file.base64可以获得文件的base64

                // this.upload(); // 如果是手动上传，这里可以通过调用upload来实现

                // return true; // 阻止默认行为，不显示预览图的图像
            },
            onBeforeSend: function (data, headers) {
                // console.log(name + '--onBeforeSend--');
                // console.log(this, data, headers);
                // $.extend(data, { test: 1 }); // 可以扩展此对象来控制上传参数
                // $.extend(headers, { Origin: 'http://127.0.0.1' }); // 可以扩展此对象来控制上传头部

                // return false; // 阻止文件上传
            },
            onProgress: function (procent) {
                // console.log(name + '--onProgress--');
                // console.log(this, procent);
                // return true; // 阻止默认行为，不使用默认的进度显示
            },
            onSuccess: function (ret) {
                // console.log(name + '--onSuccess--');
                // console.log(this, ret);
                fn(ret)
                // return true; // 阻止默认行为，不使用默认的成功态
            },
            onError: function (err) {
                console.log(name + '--onError--')
                console.log(this, err)
                // return true; // 阻止默认行为，不使用默认的失败态
            }
        })
    },
    checkWX: function () {
        let wechatInfo = navigator.userAgent.match(/MicroMessenger\/([\d\.]+)/i)
        if (!wechatInfo) {
            alert('仅支持在微信里面打开')
            return false
        } else if (wechatInfo[1] < '5.0') {
            alert('您的微信版本（V ' + (wechatInfo[1] || '4.0') + '）比较低，不支持微信支付。请升级您的微信。')
            return false
        }
        return true
    },
    jsApiCall: function (config, ok, cancel, fail) {
        if (!this.checkWX()) return false
        if (typeof WeixinJSBridge === 'undefined') {
            if (document.addEventListener) {
                document.addEventListener('WeixinJSBridgeReady', jsApiCall, false)
            } else if (document.attachEvent) {
                document.attachEvent('WeixinJSBridgeReady', jsApiCall)
                document.attachEvent('onWeixinJSBridgeReady', jsApiCall)
            }
        } else {
            jsApiCall()
        }
        function jsApiCall () {
            WeixinJSBridge.invoke('getBrandWCPayRequest', config,
                function (res) {
                    res.err_msg.indexOf(':ok') > -1 && (typeof ok === 'function' ? ok() : alert('支付成功'))
                    res.err_msg.indexOf(':cancel') > -1 && (typeof cancel === 'function' ? cancel() : alert('用户已取消'))
                    // res.err_msg.indexOf(':fail') > -1 && ('function' == typeof fail ? fail() : alert('失败'));
                    res.err_msg.indexOf(':fail') > -1 && alert(JSON.stringify(res))
                }
            )
        }
    },
    valideTel: function (text) {
        let _emp = /^\s*|\s*$/g
        text = text.replace(_emp, '')
        let _d = /^1[3578][01379]\d{8}$/g
        let _l = /^1[34578][01245678]\d{8}$/g
        let _y = /^(134[012345678]\d{7}|1[34578][012356789]\d{8})$/g
        if (_d.test(text)) {
            return true
        } else if (_l.test(text)) {
            return true
        } else if (_y.test(text)) {
            return true
        }
        return false
    },
    valideEmail: function (text) {
        let _emp = /^\s*|\s*$/g
        text = text.replace(_emp, '')
        let _d = /[a-zA-Z0-9]{1,10}@[a-zA-Z0-9]{1,5}\.[a-zA-Z0-9]{1,5}/
        if (_d.test(text)) {
            return true
        }
        return false
    },
    valideCard: function (idCard) {
        let regIdCard = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/
        let HMCard = /^[HhMm]\d{8}((\(\d{2}\))|\d{2})$/
        let TCard = /^\d{8}(\d{1,2}(\([A-Za-z]\))?)?$/
        switch (idCard.length) {
            case 8:
            case 9:
            case 10:
            case 11:
            case 13:
                if (HMCard.test(idCard)) { return true }
                if (TCard.test(idCard)) { return true }
                return false
            case 18:
                if (regIdCard.test(idCard)) {
                    let idCardWi = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2) // 将前17位加权因子保存在数组里
                    let idCardY = new Array(1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2) // 这是除以11后，可能产生的11位余数、验证码，也保存成数组
                    let idCardWiSum = 0 // 用来保存前17位各自乖以加权因子后的总和
                    for (let i = 0; i < 17; i++) {
                        idCardWiSum += idCard.substring(i, i + 1) * idCardWi[i]
                    }
                    let idCardMod = idCardWiSum % 11 // 计算出校验码所在数组的位置
                    let idCardLast = idCard.substring(17) // 得到最后一位身份证号码

                    if (idCardMod == 2) {
                        if (idCardLast == 'X' || idCardLast == 'x') {
                            return true
                        } else {
                            return false
                        }
                    } else {
                        if (idCardLast == idCardY[idCardMod]) {
                            return true
                        } else {
                            return false
                        }
                    }
                }
                break
            default:
                return false
        }
    },
    getCardinfo: function (UUserCard) {
        let sex, age, sexcode, year = UUserCard.substring(6, 10), gmonth = UUserCard.substring(10, 12), gday = UUserCard.substring(12, 14)
        let myDate = new Date(), month = myDate.getMonth() + 1, day = myDate.getDate()
        if (parseInt(UUserCard.substr(16, 1)) % 2 == 1) {
            sex = '男', sexcode = '1'
        } else {
            sex = '女', sexcode = '0'
        }
        age = myDate.getFullYear() - UUserCard.substring(6, 10) - 1
        if (gmonth < month || gmonth == month && gday <= day) { age++ }
        return { birth: year + '-' + gmonth + '-' + gday, sex: sex, age: age, sexcode: sexcode }
    },
    getParam (name) {
	    name = name.replace(/[\[]/, '\\\[').replace(/[\]]/, '\\\]')
	    let regexS = '[\\?&]' + name + '=([^&#]*)'
	    let regex = new RegExp(regexS)
	    let results = regex.exec(window.location.href)
	    if (results == null) { return '' } else { return results[1] }
	}
}
