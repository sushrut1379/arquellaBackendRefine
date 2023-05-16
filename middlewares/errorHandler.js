
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

///error in dab
// // Error handler middleware
// app.use((err, req, res, next) => {
//     // Sequelize UniqueConstraintError (duplicate entry)
//     if (err.name === 'SequelizeUniqueConstraintError') {
//       return res.status(400).json({ error: 'Duplicate entry' });
//     }
  
//     // Sequelize ValidationError (validation error)
//     if (err.name === 'SequelizeValidationError') {
//       const errors = err.errors.map((error) => ({
//         field: error.path,
//         message: error.message,
//       }));
//       return res.status(400).json({ errors });
//     }
  
//     // Sequelize DatabaseError (general database error)
//     if (err.name === 'SequelizeDatabaseError') {
//       return res.status(500).json({ error: 'Database error' });
//     }
  
//     // Sequelize ConnectionError (error connecting to the database)
//     if (err.name === 'SequelizeConnectionError') {
//       return res.status(500).json({ error: 'Database connection error' });
//     }
  
//     // Sequelize TimeoutError (database query timeout)
//     if (err.name === 'SequelizeTimeoutError') {
//       return res.status(500).json({ error: 'Database query timeout' });
//     }
  
//     // Handle other errors
//     return res.status(500).json({ error: 'Internal server error' });
//   });
  