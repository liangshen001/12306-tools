/**
 * 定义调用接口api
 * 当12306接口发生变动时不需要修改 程序中所定义的类型
 * 只修改相应的api中convertParams  convertBody  convertResult  方法（对应到程序中定义的类型 P B R）即可
 * P: 参数类型
 * B：当请求为post时 请求体类型
 * R: 返回类型
 * 注意 P B R 都不是接口所返回的真实类型 需要相应的convertParams convertBody convertResult去转换
 */
export abstract class Api<P, B, R> {
    constructor(public url: string, public type: 'get' | 'post' | 'script' | 'jsonp') {}
    abstract convertParams(params: P): any;
    abstract convertBody(body: B): any;
    abstract convertResult(result?: any): R;
}

/**
 * get 请求所用的api 定义了Api中默认 type值为get 提供空的的body数据转换(实现类也不需要实现 convertBody)
 */
export abstract class HttpGetApi<P, R> extends Api<P, void, R> {
    constructor(url: string) {
        super(url, 'get');
    }
    convertBody() {}
    abstract convertResult(result: any): R;
}
/**
 * post 请求所用的api 定义了Api中默认 type值为post
 */
export abstract class HttpPostApi<P, B, R> extends Api<P, B, R> {
    constructor(url: string) {
        super(url, 'post');
    }
    abstract convertResult(result: any): R;
}
/**
 * 引用js脚本 请求所用的api 定义了Api中默认 type值为script 提供空的的body数据转换(实现类也不需要实现 convertBody)
 */
export abstract class ScriptApi<P, R> extends Api<P, void, R> {
    constructor(url: string) {
        super(url, 'script');
    }
    convertBody() {}
    abstract convertResult(): R;
}

/**
 * jsonp方法请求所用的api 定义了Api中默认 type值为jsonp 提供空的的body数据转换(实现类也不需要实现 convertBody)
 * 提供了新的convertParams声明
 */
export abstract class JSONPApi<P, R> extends Api<P, void, R> {
    constructor(url: string) {
        super(url, 'jsonp');
    }
    convertBody() {
    }
    abstract convertResult(result: any): R;
}
