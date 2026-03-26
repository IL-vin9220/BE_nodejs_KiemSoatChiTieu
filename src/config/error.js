class AppError extends Error{
    constructor(mess, errorCode){
        super(mess);
        this.errorCode = errorCode;
        this.name = "AppError";
    }
}

export default AppError;