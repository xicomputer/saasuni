//微信支付
function auctionWxpay(data) {
    let promise = new Promise((resolve, reject) => {
        console.log('appID:', data.appId);
        uni.requestPayment({
            appId: data.appId,
            timeStamp: data.timeStamp,
            nonceStr: data.nonceStr,
            package: data.packageValue,
            signType: data.signType,
            paySign: data.paySign,

            success(res) {
                uni.showToast({
                    title: '支付成功',
                    icon: 'none'
                });
                resolve(res);
            },

            fail(err) {
                uni.showToast({
                    title: '支付失败',
                    icon: 'none'
                });
                reject(err);
            }
        });
    });
    return promise;
}

module.exports = {
    auctionWxpay: auctionWxpay
};
