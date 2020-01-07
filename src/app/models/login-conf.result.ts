export interface LoginConfResult {
    isLogin: boolean;
    isLoginPassCode: boolean;
    isSweepLogin: boolean;
    isUamLogin: boolean;
    isstudentDate: boolean;
    psrQrCodeResult: boolean;
    loginUrl: string;
    otherControl: number;
    studentDate: string[];
}
