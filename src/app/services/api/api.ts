export abstract class Api<P, B, R> {
    constructor(public url: string, public type: 'get' | 'post' | 'script' | 'jsonp') {}
    abstract convertParams(params: P): any;
    abstract convertBody(body: B): any;
    abstract convertResult(result?: any): R;
}

export abstract class HttpGetApi<P, R> extends Api<P, void, R> {
    constructor(url: string) {
        super(url, 'get');
    }
    convertBody(body: any) {
        return body;
    }
}

export abstract class HttpPostApi<P, B, R> extends Api<P, B, R> {
    constructor(url: string) {
        super(url, 'post');
    }
}

export abstract class ScriptApi<P, R> extends Api<P, void, R> {
    constructor(url: string) {
        super(url, 'script');
    }
    convertBody(body: any) {
        return body;
    }
    convertParams(params: P): any {
        return params;
    }
}

export abstract class JSONPApi<P, R> extends Api<P, void, R> {
    constructor(url: string) {
        super(url, 'jsonp');
    }
    convertBody(body: any) {
        return body;
    }
    abstract convertParams(params: P): {
        callback: string;
    };
}
