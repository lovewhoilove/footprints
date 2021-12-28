import axios from "axios";
import { Message, MessageBox } from "element-ui";
import {
    ERR_MESSAGE_SHOW_DURATION,
    REQ_OVERTIME_DURATION,
    RES_PERMISSION_DENIED_CODE,
    RES_SUCCESS_DEFAULT_CODE,
    RES_UNAUTHORIZED_CODE
} from "./constants";

//创建一个axios实例
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,// url = base url + request url
    // withCredentials: true, //跨域请求时发送cookie
    timeout: REQ_OVERTIME_DURATION,
});

//request拦截器
service.interceptors.request.use(
    config => {
        //在发送请求之前执行某些操作
        // config.headers["Content-Type"] = "application/json";
        return config;
    },
    error => {
        //请求发生错误时执行某些操作
        console.log(error);
        return Promise.reject(error);
    }
);

//response拦截器
service.interceptors.response.use(
    /**
     * 统一处理不同转态码的逻辑，有错误也直接统一的 MessageBox 提示，在真正使用接口请求的时候不需要做这种逻辑判断了。
     */
    response => {
        const res = response.data;
        //如果自定义代码不是2000，则判断为错误。
        if (res.code !== RES_SUCCESS_DEFAULT_CODE) {
            //若状态码为4010，token不合法或在其他客户端上登录，又或是token已过期
            if (res.code === RES_UNAUTHORIZED_CODE) {
                //重新登录
                MessageBox.confirm(
                    "您已经登出，您可以取消以停留在此页面，或再次登录",
                    "确认注销",
                    {
                        confirmButtonText: "重新登录",
                        cancelButtonText: "取消",
                        type: "warning"
                    }
                ).then(() => {
                    logout();
                });
            } else if (res.code === RES_PERMISSION_DENIED_CODE) {
                //token不存在，重新登录账户
                Message({
                    message: res.desc || res.message || "Error",
                    type: "error",
                    duration: ERR_MESSAGE_SHOW_DURATION
                });
                setTimeout(() => {
                    logout();
                }, 1000);
            } else {
                Message({
                    message: res.desc || res.message || "Error",
                    type: "error",
                    duration: ERR_MESSAGE_SHOW_DURATION
                });
            }
        } else {
            return res;
        }
    },
    error => {
        console.log("err", error);
        Message({
            message: error.desc || error.message || "服务器出错",
            type: "error",
            duration: 5 * 1000
        });
        return Promise.reject(error);
    }
);

//对外的get方法
export function get(endpoint, params) {
    return service.get(endpoint, {
        params: { ...params }
    });
}

//对外的post方法
export function post(endpoint, params) {
    return service.post(endpoint, params);
}

export default service;