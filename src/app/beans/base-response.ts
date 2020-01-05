export interface BaseResponse<T = any> {
    httpstatus: string;
    messages: string;
    status: boolean;
    data: T;
}
