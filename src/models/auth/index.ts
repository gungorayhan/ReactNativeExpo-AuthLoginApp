export interface IAuthToken {
    _id:null |string,
    firstname:null |string,
    lastname:null |string,
    email:null |string,
    mobile:null |string,
    accessToken:null |string,
    refreshToken:null |string
}

export interface ILogin{
    //username:string,
    email:string,
    password:string,
}