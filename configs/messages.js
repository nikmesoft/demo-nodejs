"use strict";

var errors = {};
errors.badRequest = { 'status': 200, 'code': 'INVALID_REQUEST', 'message': 'The request is invalid.' };
errors.invalidValue = { 'status': 200, 'code': 'INVALID_VALUE', 'message': 'Invalid value.' };
errors.invalidFile = { 'status': 200, 'code': 'INVALID_FILE', 'message': 'Invalid file.' };
errors.forbidden = { 'status': 403, 'code': 'FORBIDDEN', 'message': "Forbidden: You don't have permission to access." };
errors.methodNotFound = { 'status': 404, 'code': 'METHOD_NOT_FOUND', 'message': 'Method is not found.' };

module.exports = {
    errors: errors
};