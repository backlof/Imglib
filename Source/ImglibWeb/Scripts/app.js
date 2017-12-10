"use strict";
var Api;
(function (Api) {
    var PictureType;
    (function (PictureType) {
        PictureType[PictureType["First"] = 0] = "First";
        PictureType[PictureType["Second"] = 1] = "Second";
    })(PictureType = Api.PictureType || (Api.PictureType = {}));
})(Api || (Api = {}));
var Service;
(function (Service) {
    var OwenSelfHostingApi = (function () {
        function OwenSelfHostingApi() {
            this.base = "http://localhost:9000";
            this.name = "api";
        }
        return OwenSelfHostingApi;
    }());
    Service.OwenSelfHostingApi = OwenSelfHostingApi;
})(Service || (Service = {}));
var Service;
(function (Service) {
    var LocalRcpClient = (function () {
        function LocalRcpClient(_host) {
            this._host = _host;
        }
        LocalRcpClient.prototype.getActionUrl = function (controller, action) {
            return this._host.base + "/" + this._host.name + "/" + controller + "/" + action;
        };
        LocalRcpClient.prototype.post = function (data, controller, action) {
            var promise = $.Deferred();
            $.ajax({
                url: this.getActionUrl(controller, action),
                method: "POST",
                data: JSON.stringify(data),
                dataType: "application/json"
            }).done(function (data) {
                promise.resolve(data);
            }).fail(function () {
                promise.reject();
            });
            return promise;
        };
        LocalRcpClient.prototype.get = function (data, controller, action) {
            var promise = $.Deferred();
            $.ajax({
                url: this.getActionUrl(controller, action),
                method: "GET",
                data: JSON.stringify(data),
                dataType: "application/json"
            }).done(function () {
                promise.resolve();
            }).fail(function () {
                promise.reject();
            });
            return promise;
        };
        return LocalRcpClient;
    }());
    Service.LocalRcpClient = LocalRcpClient;
})(Service || (Service = {}));
var Api;
(function (Api) {
    var ImageService = (function () {
        function ImageService(_rcpService) {
            this._rcpService = _rcpService;
        }
        ImageService.prototype.givePictureBack = function (picture) {
            return this._rcpService.post(picture, "image", "givepictureback");
        };
        ImageService.prototype.testStuff = function (value) {
            return this._rcpService.post(value, "image", "teststuff");
        };
        return ImageService;
    }());
    Api.ImageService = ImageService;
})(Api || (Api = {}));
var Bundle;
(function (Bundle) {
    var TemplateResolver = (function () {
        function TemplateResolver(_serviceResolver) {
            this._serviceResolver = _serviceResolver;
        }
        TemplateResolver.prototype.getTemplate = function (template, params) {
            return {
                name: template.htmlFileName,
                data: template.init(params, this._serviceResolver)
            };
        };
        return TemplateResolver;
    }());
    Bundle.TemplateResolver = TemplateResolver;
})(Bundle || (Bundle = {}));
var ViewModel;
(function (ViewModel) {
    var ViewModelBase = (function () {
        function ViewModelBase() {
        }
        ViewModelBase.prototype.dispose = function () {
        };
        return ViewModelBase;
    }());
    ViewModel.ViewModelBase = ViewModelBase;
})(ViewModel || (ViewModel = {}));
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var ViewModel;
(function (ViewModel) {
    var MainViewModel = (function (_super) {
        __extends(MainViewModel, _super);
        function MainViewModel(_templateResolver) {
            var _this = _super.call(this) || this;
            _this._templateResolver = _templateResolver;
            _this.helloWorld = ko.observable("Hello world!");
            _this.test = ko.observable("testing");
            _this.subpage = ko.observable();
            return _this;
        }
        MainViewModel.prototype.navigateToRatedImages = function (rating) {
            var subpage = this._templateResolver.getTemplate(Bundle.Template.Rating, { rating: rating });
            this.subpage(subpage);
        };
        return MainViewModel;
    }(ViewModel.ViewModelBase));
    ViewModel.MainViewModel = MainViewModel;
})(ViewModel || (ViewModel = {}));
var Service;
(function (Service) {
    var ServiceResolver = (function () {
        function ServiceResolver() {
            this._singletons = {};
        }
        ServiceResolver.prototype.Singleton = function (name, getter) {
            if (!this._singletons[name]) {
                this._singletons[name] = getter();
            }
            return this._singletons[name];
        };
        ServiceResolver.prototype.Transient = function (getter) {
            return getter();
        };
        Object.defineProperty(ServiceResolver.prototype, "TemplateResolver", {
            get: function () {
                var _this = this;
                return this.Singleton("TemplateResolver", function () { return new Bundle.TemplateResolver(_this); });
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ServiceResolver.prototype, "ApiHost", {
            get: function () {
                return this.Singleton("ApiHost", function () { return new Service.OwenSelfHostingApi(); });
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ServiceResolver.prototype, "RcpService", {
            get: function () {
                var _this = this;
                return this.Singleton("RcpService", function () { return new Service.LocalRcpClient(_this.ApiHost); });
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ServiceResolver.prototype, "ImageService", {
            get: function () {
                var _this = this;
                return this.Singleton("ImageService", function () { return new Api.ImageService(_this.RcpService); });
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ServiceResolver.prototype, "HtmlScriptInserter", {
            get: function () {
                return this.Singleton("HtmlScriptInserter", function () { return new Service.LocalWebDirectoryHtmlInserter(); });
            },
            enumerable: true,
            configurable: true
        });
        return ServiceResolver;
    }());
    Service.ServiceResolver = ServiceResolver;
})(Service || (Service = {}));
var Bundle;
(function (Bundle) {
    var TemplateConfiguration = (function () {
        function TemplateConfiguration(htmlFileName, init) {
            this.htmlFileName = htmlFileName;
            this.init = init;
        }
        return TemplateConfiguration;
    }());
    Bundle.TemplateConfiguration = TemplateConfiguration;
    var TemplateConfigurations = (function () {
        function TemplateConfigurations() {
            this.Rating = new TemplateConfiguration("rating", function (param, resolver) { return new ViewModel.RatingViewModel(param, resolver.TemplateResolver); });
        }
        return TemplateConfigurations;
    }());
    Bundle.Template = new TemplateConfigurations();
    Bundle.getAllHtmlFileNames = function () {
        return Object.keys(Bundle.Template).map(function (key) { return Bundle.Template[key].htmlFileName; });
    };
})(Bundle || (Bundle = {}));
var Application = (function () {
    function Application(_serviceResolver) {
        var _this = this;
        this._serviceResolver = _serviceResolver;
        this.loadScripts().done(function () {
            ko.applyBindings(new ViewModel.MainViewModel(_this._serviceResolver.TemplateResolver));
        }).fail(function () {
            console.error("Couldn't load html templates");
        });
    }
    Application.prototype.loadScripts = function () {
        return this._serviceResolver.HtmlScriptInserter.loadScripts(Bundle.getAllHtmlFileNames());
    };
    return Application;
}());
window.onload = function () {
    var app = new Application(new Service.ServiceResolver());
};
var Service;
(function (Service) {
    var LocalWebDirectoryHtmlInserter = (function () {
        function LocalWebDirectoryHtmlInserter() {
        }
        LocalWebDirectoryHtmlInserter.prototype.loadSingleScript = function (scriptId) {
            var promise = $.Deferred();
            $.get("Web/" + scriptId + ".html").done(function (data) {
                var script = document.createElement("script");
                script.type = "text/html";
                script.innerHTML = data;
                script.id = scriptId;
                $("head").append(script);
                promise.resolve();
            }).fail(function () {
                promise.reject();
            });
            var x = document.createElement("script");
            var y = document.createElement("script");
            $("head").append([x, y]);
            return promise;
        };
        LocalWebDirectoryHtmlInserter.prototype.loadScripts = function (scriptIds) {
            var _this = this;
            var promise = $.Deferred();
            $.when(scriptIds.map(function (x) { return _this.loadSingleScript(x); })).done(function (x) {
                promise.resolve();
            }).fail(function () {
                promise.reject();
            });
            return promise;
        };
        return LocalWebDirectoryHtmlInserter;
    }());
    Service.LocalWebDirectoryHtmlInserter = LocalWebDirectoryHtmlInserter;
})(Service || (Service = {}));
var _this = this;
var StringContainsParameter;
(function (StringContainsParameter) {
    StringContainsParameter[StringContainsParameter["IgnoreCase"] = 0] = "IgnoreCase";
    StringContainsParameter[StringContainsParameter["CaseSensitive"] = 1] = "CaseSensitive";
})(StringContainsParameter || (StringContainsParameter = {}));
String.prototype.contains = function (p, type) {
    var value = _this.valueOf();
    switch (type) {
        case StringContainsParameter.IgnoreCase:
            return value.indexOf(p.toLowerCase()) !== -1;
        default:
            return value.indexOf(p) !== -1;
    }
};
var ViewModel;
(function (ViewModel) {
    var RatingViewModel = (function (_super) {
        __extends(RatingViewModel, _super);
        function RatingViewModel(param, _templateResolver) {
            var _this = _super.call(this) || this;
            _this._templateResolver = _templateResolver;
            return _this;
        }
        return RatingViewModel;
    }(ViewModel.ViewModelBase));
    ViewModel.RatingViewModel = RatingViewModel;
})(ViewModel || (ViewModel = {}));
