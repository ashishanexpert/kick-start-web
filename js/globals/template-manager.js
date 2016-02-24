define(function (require) {
    "use strict";

    var $ = require("jquery"),
        handlebar = require("handlebar"),
        repository = {};

    // Registering Templates
    $("script[type='text/x-handlebars-template']").each(function (i, temp) {
        var $this = $(temp),
            templateName = $this.attr("name");

        // put all compiled templates to repositorysitory
        repository[templateName] = handlebar.compile($this.html());

        // Remove Template HTML raw content from DOM
        $this.remove();
    });

    // Registering Partials
    $("script[type='text/x-handlebars-partial']").each(function (i, partial) {
        var $this = $(partial),
            partialName = $this.attr("name");

        // Registering partials
        handlebar.registerPartial(partialName, $this.html());

        // Remove Partial HTML raw content from DOM
        $this.remove();
    });

    //
    function loadTemplateByUrl(url, name) {
        var template;

        if (!url || !name) {
            return "URL or name not found";
        }

        $.get({
            url: url,
            async: false,
            success: function (resp) {
                template = handlebar.compile(resp);
                repository[name] = template;
            }
        });
    }

    // Exposing stuffs
    return {
        api: handlebar,
        repository: repository,
        load: loadTemplateByUrl
    };
});