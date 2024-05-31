const BASE_URL = 'https://baidu.com';

const request = (url, method, data, header = {}, showLoading = true) => {
    if (showLoading) {
      uni.showLoading({
        title: '加载中'
      });
    }
  
    return new Promise((resolve, reject) => {
      uni.request({
        url: `${BASE_URL}${url}`,
        method: method,
        data: data,
        header: header,
        success: (res) => {
          if (showLoading) {
            uni.hideLoading();
          }
          if (res.statusCode === 200) {
            resolve(res.data);
          } else {
            uni.showToast({
              title: res.data.message || '请求失败',
              icon: 'none'
            });
            reject(res);
          }
        },
        fail: (err) => {
          if (showLoading) {
            uni.hideLoading();
          }
          uni.showToast({
            title: '网络错误',
            icon: 'none'
          });
          reject(err);
        }
      });
    });
  };
  
  const get = (url, data, header, showLoading = true) => {
    return request(url, 'GET', data, header, showLoading);
  };
  
  const post = (url, data, header, showLoading = true) => {
    return request(url, 'POST', data, header, showLoading);
  };
  
  export default {
    get,
    post
  };