//ProFormTool ver 0.1
//An extension for https://github.com/adobe/brackets
//This extension currently not available for use so is incompletely.

define(function (require, exports, module)
{
    "use strict";
    
    var EditorManager = brackets.getModule("editor/EditorManager"),
        ExtensionUtils = brackets.getModule("utils/ExtensionUtils"),
        InlineWidget = brackets.getModule("editor/InlineWidget").InlineWidget,
        Strings = brackets.getModule("strings"),
        ProFormToolTemplate = require("text!ui/ProFormToolTemplate.html");

    function ProFormTool()
    {
        InlineWidget.call(this);
    }

    ProFormTool.prototype = Object.create(InlineWidget.prototype);
    ProFormTool.prototype.parentClass = InlineWidget.prototype;

    ProFormTool.prototype.load = function ()
    {
        ProFormTool.prototype.parentClass.load.apply(this, arguments);
        this.$element = $(Mustache.render(ProFormToolTemplate, Strings));
        this.$htmlContent.append(this.$element);
    };

    ProFormTool.prototype.onAdded = function ()
    {
        this.hostEditor.setInlineWidgetHeight(this, this.FormContent.getRootElement().outerHeight(), true);
        this.FormContent.focus();
    };

    //----------------------------
	
    function proFormToolProvider(hostEditor, pos)
    {
        var proformtoolline, result, start, end;
        pos.ch = start;
        hostEditor.setSelection(pos, { line: pos.line, ch: end });

        proformtoolline = new ProFormTool();
        proformtoolline.load(hostEditor);
        result = new $.Deferred();
        result.resolve(proformtoolline);
        return result.promise();
    }
    
    ExtensionUtils.loadStyleSheet(module, "ui/main.css");
    EditorManager.registerInlineEditProvider(proFormToolProvider);

    exports.proFormToolProvider = proFormToolProvider;
});
