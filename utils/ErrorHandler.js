const Sequelize = require('sequelize');
const express = require('express');
const { errorMessageFromDataBase } = require('./CustomErrorMessage');
class ErrorHandler extends Error {
    constructor(message, statusCode ,errorMessageOfDatabase) {
        super(message)
        this.statusCode = statusCode
        this.errorMessageOfDatabase= errorMessageOfDatabase
        console.log("error handle*-*-*r", message, statusCode ,errorMessageOfDatabase);
    }

    static handleSequelizeError(err) {

        let columnName;
        let errorMessage;
        //custom error object imported from utils folderr
        errorMessageFromDataBase

        if (err.errors && Object.keys(err.errors).length > 0) {
            const field = Object.values(err.errors)[0];
            columnName = field.path;
            errorMessage = field.message;
        } else {
            columnName = 'Unknown';
            errorMessage = err.message;
        }

        let newError = {
            ...errorMessageFromDataBase,
            errorFromDataBase:`Error occurred in column '${columnName}': ${errorMessage}`
        }

        console.log("erromr massage +-*--+",newError.errorFromDataBase);
 


        if (err instanceof Sequelize.Error) {
            let statusCode = 500;
            let errorMessage = 'Internal server error'+ ":- "+ newError.errorFromDataBase;

            if (err instanceof Sequelize.DatabaseError) {
                statusCode = 400;
                errorMessage = 'Database error'+ ":- "+ newError.errorFromDataBase;
            } else if (err instanceof Sequelize.ValidationError) {
                statusCode = 400;
                errorMessage = 'Validation error'+ ":- "+ newError.errorFromDataBase;
            } else if (err instanceof Sequelize.UniqueConstraintError) {
                statusCode = 409;
                errorMessage = 'Unique constraint violation'+ ":- "+ newError.errorFromDataBase;
            } else if (err instanceof Sequelize.ForeignKeyConstraintError) {
                statusCode = 409;
                errorMessage = 'Foreign key constraint violation'+ ":- "+ newError.errorFromDataBase;
            } else if (err instanceof Sequelize.TimeoutError) {
                statusCode = 503;
                errorMessage = 'Database timeout'+ ":- "+ newError.errorFromDataBase;
            }
            // Add more conditions for handling other Sequelize error types as needed

            return {
                getStatusCode: statusCode,
                getErrorMessage: errorMessage
            }

        } else {
            next(err);
        }

    }


}

module.exports = ErrorHandler

// return {getStatusCode: statusCode ,
//     getErrorMessage: errorMessage  }