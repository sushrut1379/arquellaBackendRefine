const errorMiddleware = (err,req,res,next) => {
    err.message = err.message || 'Internal server error'
    err.statusCode = err.statusCode || 500
    err.errorMessageOfDatabase = err.errorMessageOfDatabase || "data base error"
    
    if(err.statusCode)
    res.status(err.statusCode).json({
        success : false,
        message : err.message,
        errorMessageOfDatabase:err.errorMessageOfDatabase
    })
}

module.exports =  errorMiddleware