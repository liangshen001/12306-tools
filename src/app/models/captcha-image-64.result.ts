export interface CaptchaImage64Result {
    image: string;
    // 0成功
    result_code: '0' | '1';
    result_message: string;
}
