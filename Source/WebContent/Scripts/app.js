"use strict";
var Api;
(function (Api) {
    var ErrorCode;
    (function (ErrorCode) {
        ErrorCode[ErrorCode["NoSuchId"] = 1] = "NoSuchId";
        ErrorCode[ErrorCode["NoImages"] = 2] = "NoImages";
        ErrorCode[ErrorCode["Continue"] = 100] = "Continue";
        ErrorCode[ErrorCode["SwitchingProtocols"] = 101] = "SwitchingProtocols";
        ErrorCode[ErrorCode["OK"] = 200] = "OK";
        ErrorCode[ErrorCode["Created"] = 201] = "Created";
        ErrorCode[ErrorCode["Accepted"] = 202] = "Accepted";
        ErrorCode[ErrorCode["NonAuthoritativeInformation"] = 203] = "NonAuthoritativeInformation";
        ErrorCode[ErrorCode["NoContent"] = 204] = "NoContent";
        ErrorCode[ErrorCode["ResetContent"] = 205] = "ResetContent";
        ErrorCode[ErrorCode["PartialContent"] = 206] = "PartialContent";
        ErrorCode[ErrorCode["MultipleChoices"] = 300] = "MultipleChoices";
        ErrorCode[ErrorCode["MovedPermanently"] = 301] = "MovedPermanently";
        ErrorCode[ErrorCode["Found"] = 302] = "Found";
        ErrorCode[ErrorCode["SeeOther"] = 303] = "SeeOther";
        ErrorCode[ErrorCode["NotModified"] = 304] = "NotModified";
        ErrorCode[ErrorCode["UseProxy"] = 305] = "UseProxy";
        ErrorCode[ErrorCode["TemporaryRedirect"] = 307] = "TemporaryRedirect";
        ErrorCode[ErrorCode["BadRequest"] = 400] = "BadRequest";
        ErrorCode[ErrorCode["PaymentRequired"] = 402] = "PaymentRequired";
        ErrorCode[ErrorCode["Forbidden"] = 403] = "Forbidden";
        ErrorCode[ErrorCode["NotFound"] = 404] = "NotFound";
        ErrorCode[ErrorCode["MethodNotAllowed"] = 405] = "MethodNotAllowed";
        ErrorCode[ErrorCode["NotAcceptable"] = 406] = "NotAcceptable";
        ErrorCode[ErrorCode["ProxyAuthenticationRequired"] = 407] = "ProxyAuthenticationRequired";
        ErrorCode[ErrorCode["RequestTimeout"] = 408] = "RequestTimeout";
        ErrorCode[ErrorCode["Conflict"] = 409] = "Conflict";
        ErrorCode[ErrorCode["Gone"] = 410] = "Gone";
        ErrorCode[ErrorCode["LengthRequired"] = 411] = "LengthRequired";
        ErrorCode[ErrorCode["PreconditionFailed"] = 412] = "PreconditionFailed";
        ErrorCode[ErrorCode["RequestEntityTooLarge"] = 413] = "RequestEntityTooLarge";
        ErrorCode[ErrorCode["RequestUriTooLarge"] = 414] = "RequestUriTooLarge";
        ErrorCode[ErrorCode["UnsupportedMediaType"] = 415] = "UnsupportedMediaType";
        ErrorCode[ErrorCode["RequestedRangeNotSatisfiable"] = 416] = "RequestedRangeNotSatisfiable";
        ErrorCode[ErrorCode["ExpectationFailed"] = 417] = "ExpectationFailed";
        ErrorCode[ErrorCode["InternalServerError"] = 500] = "InternalServerError";
        ErrorCode[ErrorCode["NotImplemented"] = 501] = "NotImplemented";
        ErrorCode[ErrorCode["BadGateway"] = 502] = "BadGateway";
        ErrorCode[ErrorCode["ServiceUnavailable"] = 503] = "ServiceUnavailable";
        ErrorCode[ErrorCode["GatewayTimeout"] = 504] = "GatewayTimeout";
        ErrorCode[ErrorCode["HttpVersionNotSupported"] = 505] = "HttpVersionNotSupported";
    })(ErrorCode = Api.ErrorCode || (Api.ErrorCode = {}));
})(Api || (Api = {}));
var Api;
(function (Api) {
    var ImageService = (function () {
        function ImageService(_rcpService) {
            this._rcpService = _rcpService;
        }
        ImageService.prototype.deleteImage = function (query) {
            return this._rcpService.put(query, "image", "deleteimage");
        };
        ImageService.prototype.rateImages = function (ratings) {
            return this._rcpService.put(ratings, "image", "rateimages");
        };
        ImageService.prototype.findImagesByRating = function (query) {
            return this._rcpService.post(query, "image", "findimagesbyrating");
        };
        ImageService.prototype.findImageSet = function () {
            return this._rcpService.get("image", "findimageset");
        };
        return ImageService;
    }());
    Api.ImageService = ImageService;
})(Api || (Api = {}));
var Api;
(function (Api) {
    var TestService = (function () {
        function TestService(_rcpService) {
            this._rcpService = _rcpService;
        }
        TestService.prototype.fail = function (input) {
            return this._rcpService.put(input, "test", "fail");
        };
        TestService.prototype.success = function (input) {
            return this._rcpService.put(input, "test", "success");
        };
        TestService.prototype.stuff = function (intp) {
            return this._rcpService.post(intp, "test", "stuff");
        };
        TestService.prototype.getter = function () {
            return this._rcpService.get("test", "getter");
        };
        return TestService;
    }());
    Api.TestService = TestService;
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
var ViewModel;
(function (ViewModel) {
    var ViewModelBase = (function () {
        function ViewModelBase() {
            this.subscriptions = [];
            this.computeds = [];
            this.eventBindings = [];
        }
        ViewModelBase.prototype.dispose = function () {
            for (var _i = 0, _a = this.computeds; _i < _a.length; _i++) {
                var computed = _a[_i];
                computed.dispose();
            }
            for (var _b = 0, _c = this.subscriptions; _b < _c.length; _b++) {
                var subscription = _c[_b];
                subscription.dispose();
            }
            for (var _d = 0, _e = this.eventBindings; _d < _e.length; _d++) {
                var even = _e[_d];
                $(document).off(even.name, even.handler);
            }
            this.onDisposal();
        };
        ViewModelBase.prototype.onBrowserEvent = function (event, handler) {
            this.on(event.name, function (jq, param) { handler(param); });
        };
        ViewModelBase.prototype.on = function (events, handler) {
            $(document).on(events, handler);
            this.eventBindings.push({ name: events, handler: handler });
        };
        ViewModelBase.prototype.subscribe = function (subsribable, callback) {
            var subscription = subsribable.subscribe(callback);
            this.subscriptions.push(subscription);
            return subscription;
        };
        ViewModelBase.prototype.computed = function (option, context) {
            var computed = ko.pureComputed(option, context);
            this.computeds.push(computed);
            return computed;
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
        function MainViewModel(_logger, _browserHandler, _testService) {
            var _this = _super.call(this) || this;
            _this._logger = _logger;
            _this._browserHandler = _browserHandler;
            _this._testService = _testService;
            _this.subpage = ko.observable();
            _this.openTest();
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
            var url = "https://github.com/backlof/Imglib";
            if (this._browserHandler.isSupported) {
                this._browserHandler.openWebPageInBrowser(url);
            }
            else {
                window.open(url, '_blank');
            }
        };
        MainViewModel.prototype.addFiles = function () {
            if (this._browserHandler.isSupported) {
                this._browserHandler.addFiles();
            }
            else {
                console.error("Browser invocation isn't supported");
            }
        };
        MainViewModel.prototype.onDisposal = function () {
        };
        return MainViewModel;
    }(ViewModel.ViewModelBase));
    ViewModel.MainViewModel = MainViewModel;
})(ViewModel || (ViewModel = {}));
var Service;
(function (Service) {
    var LocalRcpClient = (function () {
        function LocalRcpClient(_host) {
            this._host = _host;
        }
        LocalRcpClient.prototype.post = function (arg, controller, action) {
            var promise = $.Deferred();
            this.getPromise(arg, controller, action).done(function (result) {
                if (result.success)
                    promise.resolve(result.value);
                else
                    promise.reject(result.error);
            }).fail(function (xhr) {
                promise.reject(xhr.status);
            });
            return promise;
        };
        LocalRcpClient.prototype.put = function (arg, controller, action) {
            var promise = $.Deferred();
            this.getPromise(arg, controller, action).done(function (result) {
                if (result.success)
                    promise.resolve();
                else
                    promise.reject(result.error);
            }).fail(function (xhr) {
                promise.reject(xhr.status);
            });
            return promise;
        };
        LocalRcpClient.prototype.get = function (controller, action) {
            var promise = $.Deferred();
            this.getPromise({}, controller, action).done(function (result) {
                if (result.success)
                    promise.resolve(result.value);
                else
                    promise.reject(result.error);
            }).fail(function (xhr) {
                promise.reject(xhr.status);
            });
            return promise;
        };
        LocalRcpClient.prototype.getPromise = function (arg, controller, action) {
            return $.ajax({
                url: this._host.base + "/" + this._host.name + "/" + controller + "/" + action,
                method: "POST",
                data: arg,
                dataType: "json"
            });
        };
        return LocalRcpClient;
    }());
    Service.LocalRcpClient = LocalRcpClient;
})(Service || (Service = {}));
var Service;
(function (Service) {
    var OwenSelfHostingApi = (function () {
        function OwenSelfHostingApi() {
            this.base = "http://localhost:8080";
            this.name = "api";
        }
        return OwenSelfHostingApi;
    }());
    Service.OwenSelfHostingApi = OwenSelfHostingApi;
})(Service || (Service = {}));
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
        Object.defineProperty(ServiceResolver.prototype, "BrowserInvoker", {
            get: function () {
                return this.Singleton("BrowserExternal", function () { return new Browser.BrowserInvoker(); });
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
        Object.defineProperty(ServiceResolver.prototype, "TestService", {
            get: function () {
                var _this = this;
                return this.Singleton("TestService", function () { return new Api.TestService(_this.RcpService); });
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
                return this.Transient(function () { return new ViewModel.MainViewModel(_this.Logger, _this.BrowserInvoker, _this.TestService); });
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
            this.Rated = new KnockoutGenericComponentConfiguration("rated", function (param, resolver) { return new ViewModel.RatedViewModel(param, resolver.ImageService); });
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
var Binding;
(function (Binding) {
    var HideBinding = (function () {
        function HideBinding() {
        }
        HideBinding.prototype.update = function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            ko.bindingHandlers.visible.update(element, function () { return !ko.utils.unwrapObservable(valueAccessor()); }, allBindingsAccessor, viewModel, bindingContext);
        };
        return HideBinding;
    }());
    ko.bindingHandlers.hide = new HideBinding();
})(Binding || (Binding = {}));
var Binding;
(function (Binding) {
    var LoadingBinding = (function () {
        function LoadingBinding() {
        }
        LoadingBinding.prototype.init = function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            if (valueAccessor == null) {
                console.error();
            }
            else {
                var innerHtml_1 = element.innerHTML;
                var spinner_1 = document.createElement("div");
                spinner_1.classList.add("loading-spinner");
                var bindingHandler = function (value) {
                    if (value) {
                        while (element.lastChild) {
                            element.removeChild(element.lastChild);
                        }
                        element.appendChild(spinner_1);
                    }
                    else {
                        while (element.lastChild) {
                            element.removeChild(element.lastChild);
                        }
                        element.innerHTML = innerHtml_1;
                        for (var i = 0; i < element.children.length; i++) {
                            ko.applyBindings(viewModel, element.children[i]);
                        }
                    }
                };
                if (valueAccessor()()) {
                    bindingHandler(true);
                }
                var subscription_1 = valueAccessor().subscribe(bindingHandler);
                ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                    subscription_1.dispose();
                });
            }
        };
        return LoadingBinding;
    }());
    ko.bindingHandlers.loading = new LoadingBinding();
})(Binding || (Binding = {}));
var NotificationType;
(function (NotificationType) {
    NotificationType[NotificationType["Warning"] = 0] = "Warning";
    NotificationType[NotificationType["Danger"] = 1] = "Danger";
    NotificationType[NotificationType["Info"] = 2] = "Info";
    NotificationType[NotificationType["Success"] = 3] = "Success";
})(NotificationType || (NotificationType = {}));
var NotificationTrigger = (function () {
    function NotificationTrigger() {
    }
    NotificationTrigger.prototype.show = function (text, type) {
        if (this.onShow)
            this.onShow(text, type);
    };
    NotificationTrigger.prototype.hide = function () {
        if (this.onHide)
            this.onHide();
    };
    return NotificationTrigger;
}());
var Binding;
(function (Binding) {
    var NotificationBinding = (function () {
        function NotificationBinding() {
        }
        NotificationBinding.prototype.init = function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            var value = valueAccessor();
            element.hidden = true;
            if (value != null && value instanceof NotificationTrigger) {
                element.innerHTML = "<span class=\"notification-text\"></span><span class=\"notification-close-button\">&times;</span>";
                var children = element.getElementsByTagName("span");
                var textNode_1 = children[0];
                var buttonNode_1 = children[1];
                value["onHide"] = function () {
                    element.hidden = true;
                };
                value["onShow"] = function (text, alert) {
                    switch (alert) {
                        case NotificationType.Danger:
                            element.className = "notification danger";
                            break;
                        case NotificationType.Info:
                            element.className = "notification info";
                            break;
                        case NotificationType.Success:
                            element.className = "notification success";
                            break;
                        case NotificationType.Warning:
                            element.className = "notification warning";
                            break;
                        default:
                            console.error("Not an accepted notification type");
                            break;
                    }
                    textNode_1.textContent = text;
                    element.hidden = false;
                };
                var callback_1 = function () {
                    element.hidden = true;
                };
                buttonNode_1.addEventListener("click", callback_1);
                ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                    buttonNode_1.removeEventListener("click", callback_1);
                });
            }
            else {
                console.error("Param should be of Alert type");
            }
        };
        return NotificationBinding;
    }());
    ko.bindingHandlers.notification = new NotificationBinding();
})(Binding || (Binding = {}));
var test = function (param) {
    $(document).trigger("Test", param);
};
var testish = function () {
    $(document).trigger("Testish");
};
var Browser;
(function (Browser) {
    var BrowserEventConfiguration = (function () {
        function BrowserEventConfiguration(name) {
            this.name = name;
        }
        return BrowserEventConfiguration;
    }());
    Browser.BrowserEventConfiguration = BrowserEventConfiguration;
    Browser.Event = {
        Test: new BrowserEventConfiguration("Test"),
        Testish: new BrowserEventConfiguration("Testish")
    };
})(Browser || (Browser = {}));
var Browser;
(function (Browser) {
    var BrowserInvoker = (function () {
        function BrowserInvoker() {
        }
        Object.defineProperty(BrowserInvoker.prototype, "isSupported", {
            get: function () {
                return "AddFiles" in window.external && "OpenWebPageInBrowser" in window.external;
            },
            enumerable: true,
            configurable: true
        });
        BrowserInvoker.prototype.addFiles = function () {
            return window.external.AddFiles();
        };
        BrowserInvoker.prototype.openWebPageInBrowser = function (url) {
            window.external.OpenWebPageInBrowser(url);
        };
        return BrowserInvoker;
    }());
    Browser.BrowserInvoker = BrowserInvoker;
})(Browser || (Browser = {}));
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
        function RatedViewModel(param, _imageService) {
            var _this = _super.call(this) || this;
            _this._imageService = _imageService;
            _this.header = ko.observable();
            _this.images = ko.observableArray();
            _this.take = 10;
            _this.isLoadingPage = ko.observable(false);
            _this.isLoadingMore = ko.observable(false);
            _this.notification = new NotificationTrigger();
            _this.hasReachedEnd = ko.observable(false);
            _this.header(param.rating === 0 ? "Unrated" : param.rating + " stars");
            _this.rating = param.rating;
            _this.skip = 0;
            _this.load();
            return _this;
        }
        RatedViewModel.prototype.load = function () {
            var _this = this;
            this.isLoadingPage(true);
            return this._imageService.findImagesByRating({ rating: this.rating, skip: this.skip, take: this.skip + this.take }).done(function (value) {
                _this.images(value.images.map(function (image) { return _this.map(image); }));
                _this.skip = _this.skip + value.images.length;
                _this.hasReachedEnd(value.images.length < _this.take);
            }).fail(function () {
                _this.notification.show("Failed to load images", NotificationType.Danger);
            }).always(function () {
                _this.isLoadingPage(false);
            });
        };
        RatedViewModel.prototype.loadMore = function () {
            var _this = this;
            this.isLoadingMore(true);
            return this._imageService.findImagesByRating({ rating: this.rating, skip: this.skip, take: this.skip + this.take }).done(function (value) {
                var images = value.images.map(function (image) { return _this.map(image); });
                _this.images.valueWillMutate();
                for (var _i = 0, images_1 = images; _i < images_1.length; _i++) {
                    var image = images_1[_i];
                    _this.images.push(image);
                }
                _this.images.valueHasMutated();
                _this.skip = _this.skip + value.images.length;
                _this.hasReachedEnd(value.images.length < _this.take);
            }).fail(function () {
                _this.notification.show("Failed to load images", NotificationType.Danger);
            }).always(function () {
                _this.isLoadingMore(false);
            });
        };
        RatedViewModel.prototype.remove = function (image) {
            var _this = this;
            image.isDeleting(true);
            this._imageService.deleteImage({ id: image.id }).done(function () {
                _this.skip -= 1;
                _this.images.remove(image);
            }).fail(function () {
                _this.notification.show("Failed to delete image", NotificationType.Danger);
            }).always(function () {
                image.isDeleting(false);
            });
        };
        RatedViewModel.prototype.map = function (image) {
            return {
                id: image.id,
                fileName: image.fileName,
                isDeleting: ko.observable(false),
                url: image.url
            };
        };
        RatedViewModel.prototype.onDisposal = function () {
        };
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
            _this.isLoading = ko.observable(false);
            _this.isSaving = ko.observable(false);
            _this.showSpinner = _this.computed(function () { return _this.isLoading() || _this.isSaving(); });
            _this.notification = new NotificationTrigger();
            _this.first = ko.observable();
            _this.second = ko.observable();
            _this.showRating = ko.observable(true);
            _this.loadImageSet();
            return _this;
        }
        RatingViewModel.prototype.loadImageSet = function () {
            var _this = this;
            return this._imageService.findImageSet().done(function (result) {
                _this.first(_this.map(result.first));
                _this.second(_this.map(result.second));
            }).fail(function (error) {
                _this.showRating(false);
                if (error == Api.ErrorCode.NoImages) {
                    _this.notification.show("There are no images yet.", NotificationType.Warning);
                }
                else {
                    _this.notification.show("Failed to load images.", NotificationType.Danger);
                }
            }).always(function () {
                _this.isLoading(false);
            });
        };
        RatingViewModel.prototype.map = function (image) {
            return {
                url: image.path,
            };
        };
        RatingViewModel.prototype.rateFirstAsWinner = function () {
        };
        RatingViewModel.prototype.rateSecondAsWinner = function () {
        };
        RatingViewModel.prototype.onDisposal = function () {
        };
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
        TagsViewModel.prototype.onDisposal = function () {
        };
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
        TagViewModel.prototype.onDisposal = function () {
        };
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
        TestViewModel.prototype.onDisposal = function () {
        };
        return TestViewModel;
    }(ViewModel.ViewModelBase));
    ViewModel.TestViewModel = TestViewModel;
})(ViewModel || (ViewModel = {}));
