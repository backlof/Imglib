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
        function MainViewModel() {
            var _this = _super.call(this) || this;
            _this.subpage = ko.observable();
            return _this;
        }
        MainViewModel.prototype.navigateToRatedImages = function (rating) {
            this.subpage(Bundle.getComponent(Bundle.Component.Rating, { rating: rating }));
        };
        MainViewModel.prototype.navigateToTest = function () {
            this.subpage(Bundle.getComponent(Bundle.Component.Test, {}));
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
        Object.defineProperty(ServiceResolver.prototype, "ComponentResolver", {
            get: function () {
                var _this = this;
                return this.Singleton("ComponentResolver", function () { return new Bundle.HtmlScriptInsertKnockoutComponentRegisterer(_this); });
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
        return ServiceResolver;
    }());
    Service.ServiceResolver = ServiceResolver;
})(Service || (Service = {}));
var Bundle;
(function (Bundle) {
    var KnockoutGenericComponentConfiguration = (function () {
        function KnockoutGenericComponentConfiguration(name, init) {
            this.name = name;
            this.init = init;
        }
        return KnockoutGenericComponentConfiguration;
    }());
    Bundle.KnockoutGenericComponentConfiguration = KnockoutGenericComponentConfiguration;
    var KnockoutComponentConfigurations = (function () {
        function KnockoutComponentConfigurations() {
            this.Rating = new KnockoutGenericComponentConfiguration("rating", function (param, resolver) { return new ViewModel.RatingViewModel(param); });
            this.Test = new KnockoutGenericComponentConfiguration("test", function (param, resolver) { return new ViewModel.TestViewModel(param); });
        }
        return KnockoutComponentConfigurations;
    }());
    Bundle.Component = new KnockoutComponentConfigurations();
    Bundle.getAllComponents = function () {
        return Object.keys(Bundle.Component).map(function (key) { return Bundle.Component[key]; });
    };
    Bundle.getComponent = function (configuartion, params) {
        return {
            name: configuartion.name,
            params: params
        };
    };
})(Bundle || (Bundle = {}));
var Application = (function () {
    function Application(_serviceResolver) {
        this._serviceResolver = _serviceResolver;
        _serviceResolver.ComponentResolver.register(Bundle.getAllComponents()).done(function () {
            ko.applyBindings(new ViewModel.MainViewModel());
        }).fail(function () {
            console.error("Couldn't load html templates");
        });
    }
    return Application;
}());
$(document).ready(function () {
    var app = new Application(new Service.ServiceResolver());
});
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
        function RatingViewModel(param) {
            return _super.call(this) || this;
        }
        return RatingViewModel;
    }(ViewModel.ViewModelBase));
    ViewModel.RatingViewModel = RatingViewModel;
})(ViewModel || (ViewModel = {}));
var ViewModel;
(function (ViewModel) {
    var TestViewModel = (function (_super) {
        __extends(TestViewModel, _super);
        function TestViewModel(param) {
            return _super.call(this) || this;
        }
        return TestViewModel;
    }(ViewModel.ViewModelBase));
    ViewModel.TestViewModel = TestViewModel;
})(ViewModel || (ViewModel = {}));
var Bundle;
(function (Bundle) {
    var HtmlScriptInsertKnockoutComponentRegisterer = (function () {
        function HtmlScriptInsertKnockoutComponentRegisterer(_serviceResolver) {
            this._serviceResolver = _serviceResolver;
        }
        HtmlScriptInsertKnockoutComponentRegisterer.prototype.loadHtml = function (scriptId) {
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
            return promise;
        };
        HtmlScriptInsertKnockoutComponentRegisterer.prototype.registerComponent = function (component) {
            var _this = this;
            var promise = $.Deferred();
            this.loadHtml(component.name).done(function () {
                ko.components.register(component.name, {
                    viewModel: function (params) {
                        return component.init(params, _this._serviceResolver);
                    },
                    template: document.getElementById(component.name).innerHTML,
                    synchronous: true
                });
                promise.resolve();
            }).fail(function () {
                promise.reject();
            });
            return promise;
        };
        HtmlScriptInsertKnockoutComponentRegisterer.prototype.register = function (components) {
            var _this = this;
            var promise = $.Deferred();
            $.when.apply($, components.map(function (component) { return _this.registerComponent(component); })).done(function () {
                promise.resolve();
            }).fail(function () {
                promise.reject();
            });
            return promise;
        };
        return HtmlScriptInsertKnockoutComponentRegisterer;
    }());
    Bundle.HtmlScriptInsertKnockoutComponentRegisterer = HtmlScriptInsertKnockoutComponentRegisterer;
})(Bundle || (Bundle = {}));
