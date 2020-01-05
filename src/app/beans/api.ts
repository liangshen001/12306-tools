export abstract class Api<P, B, R> {
    abstract url: string;
    abstract method: string; // get post
    abstract type: string; // http script
    abstract convertParams(params: P): any;
    abstract convertBody(body: B): any;
    abstract convertResult(result?: any): R;
}

export abstract class HttpGetApi<P, R> extends Api<P, void, R> {
    method = 'get';
    type = 'http';
    convertBody(body: any) {
        return body;
    }
}

export abstract class HttpPostApi<P, B, R> extends Api<P, B, R> {
    method = 'post';
    type = 'http';
}

export abstract class ScriptApi<P, R> extends Api<P, void, R> {
    method = '';
    type = 'script';
    convertBody(body: any) {
        return body;
    }
    convertParams(params: P): any {
        return params;
    }
}
