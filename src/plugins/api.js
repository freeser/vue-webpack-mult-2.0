import $ from 'jquery'
import wx from '@assets/js/jweixin'

function routerAfterEach (route) {
    const hrf = location.href
    hrf.indexOf('?from=singlemessage&isappinstalled=0') !== -1
        ? (location.href = hrf.replace('?from=singlemessage&isappinstalled=0', ''))
            : (!route.meta.noteach && $.get('/rcapp/gainshareparams', { shareurl: hrf })
            .done((res) => {
                const cfg = Object.assign(res, {
                    jsApiList: [
                        'hideAllNonBaseMenuItem',
                        'showMenuItems',
                        'onMenuShareAppMessage',
                        'onMenuShareTimeline',
                        'showAllNonBaseMenuItem',
                        'hideMenuItems',
                        'getLocation'
                    ]
                })
                wx.config(cfg)
            }))
}

export {
    routerAfterEach
}
