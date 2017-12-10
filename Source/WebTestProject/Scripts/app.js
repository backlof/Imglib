var Api;
(function (Api) {
    var EmploymentType;
    (function (EmploymentType) {
        EmploymentType[EmploymentType["Unemployed"] = 0] = "Unemployed";
        EmploymentType[EmploymentType["Employed"] = 1] = "Employed";
    })(EmploymentType = Api.EmploymentType || (Api.EmploymentType = {}));
})(Api || (Api = {}));
var Api;
(function (Api) {
    var Gender;
    (function (Gender) {
        Gender[Gender["Male"] = 1] = "Male";
        Gender[Gender["Female"] = 2] = "Female";
    })(Gender = Api.Gender || (Api.Gender = {}));
})(Api || (Api = {}));
window.onload = function () {
    var x = Api.EmploymentType.Employed;
};
//# sourceMappingURL=app.js.map