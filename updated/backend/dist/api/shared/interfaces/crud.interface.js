"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrudOperations = void 0;
/**
 * CRUD operation definition
 *
 * @export
 * @enum {string}
 */
var CrudOperations;
(function (CrudOperations) {
    CrudOperations["GetAll"] = "GET_ALL";
    CrudOperations["Create"] = "CREATE";
    CrudOperations["GetOne"] = "GET_ONE";
    CrudOperations["Update"] = "UPDATE";
    CrudOperations["Delete"] = "DELETE";
})(CrudOperations = exports.CrudOperations || (exports.CrudOperations = {}));
