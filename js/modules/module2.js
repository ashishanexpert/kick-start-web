define(function (require) {
    "use strict";

    var sharedScope = require("sharedScope"),
        http = require("http"),
        serviceConfig = require("serviceConfig"),
        template = require("templateManager"),
        utils = require("utils");

    // Using Shared Scope
    sharedScope.checkFunction = function () {
        console.log(">> Module2: I am from Shared Scope");
    };
    
    //
    template.api.registerHelper("currencyFormat", utils.currencyFormat);

    function loadProducts() {
        var params = {
            url: serviceConfig.global.getProducts,
            successCallback: function (data) {
                $("#container").append(template.repository.externalTemplateExample(data));
            }
        };
        
        // Loading external template
        if (!template.repository.externalTemplateExample) {
            template.load("partial.html", "externalTemplateExample");
        }

        // making rest calls
        http.get(params);

    }

    loadProducts();

    return {};
});