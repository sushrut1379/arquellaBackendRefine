
const DEBUG_MODE=""
const CustomErrorHandler =require('../service/customErrorHandler')
const ValidationError =require('joi')
var statusCode=500;
const errorHandler={
    
    errorHandler(err , req , res , next){

        let data = {
            message: 'Internal server error',
            ...(DEBUG_MODE === 'true' && { originalError: err.message })
        }
    
        // if (err instanceof ValidationError) {
        //     statusCode = 422;
        //     data = {
        //         message: err.message
        //     }
        // }
    
        if (err instanceof CustomErrorHandler) {
            statusCode = err.status;
            data = {
                message: err.message
            }
        }
    
        return res.status(statusCode).json(data);
    }
}

module.exports = errorHandler;