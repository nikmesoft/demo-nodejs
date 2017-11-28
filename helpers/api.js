"use strict";

function APIHelper() {

}

APIHelper.prototype.returnError = function (res, error) {
    var status = typeof error.status !== 'undefined' ? error.status : 500;
    var err = { 'code': error.code, 'message': error.message };
    if (error.description !== undefined && error.description !== null) {
        err.description = error.description;
    } else {
        err.description = null;
    }
    var data = { 'success': false, 'error': err };
    res.type('application/json');
    res.status(status).send(data);
};

APIHelper.prototype.returnData = function (res, data, key, status) {
    status = typeof status !== 'undefined' ? status : 200;
    key = typeof key !== 'undefined' ? key : 'data';
    res.type('application/json');
    var newData = { 'success': true };
    newData[key] = data;
    res.status(status).send(newData);
};

APIHelper.prototype.returnRawData = function (res, data, status) {
    status = typeof status !== 'undefined' ? status : 200;
    res.type('application/json');
    res.status(status).send(data);
};

APIHelper.prototype.returnPagingData = function (res, data, key, offset, limit, total, status) {
    status = typeof status !== 'undefined' ? status : 200;
    key = typeof key !== 'undefined' ? key : 'data';
    res.type('application/json');
    var newData = { 'success': true };
    newData[key] = data;
    newData.offset = offset;
    newData.limit = limit;
    newData.total = total;
    res.status(status).send(newData);
};

APIHelper.prototype.returnSuccess = function (res) {
    var data = { 'success': true };
    res.type('application/json');
    res.status(200).send(data);
};

module.exports = APIHelper;