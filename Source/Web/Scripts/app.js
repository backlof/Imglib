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
    var HtmlScriptInsertKnockoutComponentRegisterer = (function () {
        function HtmlScriptInsertKnockoutComponentRegisterer(_serviceResolver) {
            this._serviceResolver = _serviceResolver;
        }
        HtmlScriptInsertKnockoutComponentRegisterer.prototype.loadHtml = function (scriptId) {
            var promise = $.Deferred();
            $.get("Web/" + scriptId + ".html").done(function (data) {
                promise.resolve(data);
            }).fail(function () {
                promise.reject();
            });
            return promise;
        };
        HtmlScriptInsertKnockoutComponentRegisterer.prototype.registerComponent = function (component) {
            var _this = this;
            return this.loadHtml(component.name).done(function (html) {
                ko.components.register(component.name, {
                    viewModel: function (params) {
                        return component.init(params, _this._serviceResolver);
                    },
                    template: html,
                    synchronous: true
                });
            });
        };
        HtmlScriptInsertKnockoutComponentRegisterer.prototype.register = function (components) {
            var _this = this;
            var promise = $.Deferred();
            $.when.apply($, components.filter(function (x) { return x != null; }).map(function (component) { return _this.registerComponent(component); })).done(function () {
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
        function MainViewModel(_logger, _browserHandler) {
            var _this = _super.call(this) || this;
            _this._logger = _logger;
            _this._browserHandler = _browserHandler;
            _this.subpage = ko.observable();
            _this.openTest();
            _this._logger.log("Testing the logging system");
            setTimeout(function () {
                _this._logger.log("2000 ms have passed");
            }, 2000);
            return _this;
        }
        MainViewModel.prototype.openRating = function () {
            this.subpage(Bundle.getComponent(Bundle.Component.Rating, {}));
        };
        MainViewModel.prototype.openRated = function (rating) {
            this.subpage(Bundle.getComponent(Bundle.Component.Rated, { rating: rating }));
        };
        MainViewModel.prototype.openTest = function () {
            this.subpage(Bundle.getComponent(Bundle.Component.Test, {}));
        };
        MainViewModel.prototype.openTags = function () {
            this.subpage(Bundle.getComponent(Bundle.Component.Tags, {}));
        };
        MainViewModel.prototype.openTag = function (tag) {
            this.subpage(Bundle.getComponent(Bundle.Component.Tag, { tag: tag }));
        };
        MainViewModel.prototype.openAbout = function () {
            this._browserHandler.openAboutPage();
        };
        MainViewModel.prototype.addFiles = function () {
            var _this = this;
            var binding = this._browserHandler.bind(Invoke.Function.AddedFolder, function (jq, param) {
                _this._logger.log("" + param);
                _this._browserHandler.unbind(binding);
            });
            this._browserHandler.addFiles();
        };
        return MainViewModel;
    }(ViewModel.ViewModelBase));
    ViewModel.MainViewModel = MainViewModel;
})(ViewModel || (ViewModel = {}));
Object.defineProperty(Date, "Now", {
    get: function () {
        return new Date();
    }
});
var formatDate = function (value) {
    return value.getFullYear() + "-" + String.padLeft(value.getMonth() + 1, 2) + "-" + String.padLeft(value.getDate(), 2) + " " + String.padLeft(value.getHours(), 2) + ":" + String.padLeft(value.getMinutes(), 2) + ":" + String.padLeft(value.getSeconds(), 2);
};
var Service;
(function (Service) {
    var FooterBarLogger = (function () {
        function FooterBarLogger() {
        }
        Object.defineProperty(FooterBarLogger.prototype, "FooterTimeStamp", {
            get: function () {
                return document.getElementById("footer-timestamp");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FooterBarLogger.prototype, "FooterStatus", {
            get: function () {
                return document.getElementById("footer-status");
            },
            enumerable: true,
            configurable: true
        });
        FooterBarLogger.prototype.log = function (value) {
            this.FooterTimeStamp.innerHTML = formatDate(Date.Now);
            this.FooterStatus.innerHTML = value;
        };
        return FooterBarLogger;
    }());
    Service.FooterBarLogger = FooterBarLogger;
})(Service || (Service = {}));
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
        Object.defineProperty(ServiceResolver.prototype, "WebBrowserHandler", {
            get: function () {
                return this.Singleton("WebBrowserHandler", function () { return new Service.WebBrowserHandler(); });
            },
            enumerable: true,
            configurable: true
        });
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
        Object.defineProperty(ServiceResolver.prototype, "Logger", {
            get: function () {
                return this.Singleton("Logger", function () { return new Service.FooterBarLogger(); });
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ServiceResolver.prototype, "BindingViewModel", {
            get: function () {
                var _this = this;
                return this.Transient(function () { return new ViewModel.MainViewModel(_this.Logger, _this.WebBrowserHandler); });
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
            this.Rated = new KnockoutGenericComponentConfiguration("rated", function (param, resolver) { return new ViewModel.RatedViewModel(param); });
            this.Test = new KnockoutGenericComponentConfiguration("test", function (param, resolver) { return new ViewModel.TestViewModel(param); });
            this.Rating = new KnockoutGenericComponentConfiguration("rating", function (param, resolver) { return new ViewModel.RatingViewModel(param, resolver.ImageService); });
            this.Tags = new KnockoutGenericComponentConfiguration("tags", function (param, resolver) { return new ViewModel.TagsViewModel(param); });
            this.Tag = new KnockoutGenericComponentConfiguration("tag", function (param, resolver) { return new ViewModel.TagViewModel(param); });
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
            ko.applyBindings(_serviceResolver.BindingViewModel);
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
String.padLeft = function (value, length, type) {
    if (type === void 0) { type = "0"; }
    if (!type)
        throw new Error();
    if (type.length !== 1)
        throw new Error();
    if (value == null)
        throw new Error();
    var str = value + "";
    if (length < str.length)
        throw new Error();
    while (str.length < length)
        str = "0" + str;
    return str;
};
var ViewModel;
(function (ViewModel) {
    var RatedViewModel = (function (_super) {
        __extends(RatedViewModel, _super);
        function RatedViewModel(param) {
            var _this = _super.call(this) || this;
            _this.header = ko.observable();
            _this.header(param.rating + " stars");
            return _this;
        }
        return RatedViewModel;
    }(ViewModel.ViewModelBase));
    ViewModel.RatedViewModel = RatedViewModel;
})(ViewModel || (ViewModel = {}));
var ViewModel;
(function (ViewModel) {
    var RatingViewModel = (function (_super) {
        __extends(RatingViewModel, _super);
        function RatingViewModel(params, _imageService) {
            var _this = _super.call(this) || this;
            _this._imageService = _imageService;
            return _this;
        }
        return RatingViewModel;
    }(ViewModel.ViewModelBase));
    ViewModel.RatingViewModel = RatingViewModel;
})(ViewModel || (ViewModel = {}));
var ViewModel;
(function (ViewModel) {
    var TagsViewModel = (function (_super) {
        __extends(TagsViewModel, _super);
        function TagsViewModel(params) {
            return _super.call(this) || this;
        }
        return TagsViewModel;
    }(ViewModel.ViewModelBase));
    ViewModel.TagsViewModel = TagsViewModel;
})(ViewModel || (ViewModel = {}));
var ViewModel;
(function (ViewModel) {
    var TagViewModel = (function (_super) {
        __extends(TagViewModel, _super);
        function TagViewModel(params) {
            var _this = _super.call(this) || this;
            _this.header = params.tag;
            return _this;
        }
        return TagViewModel;
    }(ViewModel.ViewModelBase));
    ViewModel.TagViewModel = TagViewModel;
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
var Service;
(function (Service) {
    var WebBrowserHandler = (function () {
        function WebBrowserHandler() {
        }
        WebBrowserHandler.prototype.unbind = function (boundObj) {
            $(document).off(boundObj.event.name, boundObj.handler);
        };
        WebBrowserHandler.prototype.bind = function (event, handler) {
            $(document).on(event.name, handler);
            return {
                event: event,
                handler: handler
            };
        };
        WebBrowserHandler.prototype.addFiles = function () {
            if (window.external.AddFiles)
                window.external.AddFiles();
            else
                console.error("AddFiles is not registered on window.external", window.external);
        };
        WebBrowserHandler.prototype.openAboutPage = function () {
            if (window.external.OpenAboutPage)
                window.external.OpenAboutPage();
            else
                console.error("OpenAboutPage is not registered on window.external", window.external);
        };
        return WebBrowserHandler;
    }());
    Service.WebBrowserHandler = WebBrowserHandler;
})(Service || (Service = {}));
var Invoke;
(function (Invoke) {
    var ScriptInvokeFunction = (function () {
        function ScriptInvokeFunction(name) {
            this.name = name;
        }
        return ScriptInvokeFunction;
    }());
    Invoke.ScriptInvokeFunction = ScriptInvokeFunction;
    var ScriptInvokeFunctions = (function () {
        function ScriptInvokeFunctions() {
            this.AddedFolder = new ScriptInvokeFunction("AddedFolder");
        }
        return ScriptInvokeFunctions;
    }());
    Invoke.Function = new ScriptInvokeFunctions();
})(Invoke || (Invoke = {}));
var addedFolder = function (param) {
    $(document).trigger("AddedFolder", param);
};
