//QuickFormTool ver 0.5
//An extension for https://github.com/adobe/brackets
//This extension currently not available for use so is incompletely.
//by M.Yaghobi, m.yaghobi.abc@gmail.com

define(function (require, exports, module)
{
    "use strict";
    
    var EditorManager = brackets.getModule("editor/EditorManager"),
        ExtensionUtils = brackets.getModule("utils/ExtensionUtils"),
        InlineWidget = brackets.getModule("editor/InlineWidget").InlineWidget,
        Strings = brackets.getModule("strings"),
        QuickFormToolTemplate = require("text!ui/QuickFormToolTemplate.html");

    function QuickFormTool()
    {
        InlineWidget.call(this);
    }

    QuickFormTool.prototype = Object.create(InlineWidget.prototype);
    QuickFormTool.prototype.parentClass = InlineWidget.prototype;

    QuickFormTool.prototype.load = function ()
    {
        QuickFormTool.prototype.parentClass.load.apply(this, arguments);
        this.$element = $(Mustache.render(QuickFormToolTemplate, Strings));
        this.$htmlContent.append(this.$element);
    };

    QuickFormTool.prototype.onAdded = function ()
    {
        this.hostEditor.setinlineWidgetHeight(this, this.FormContent.getRootElement().outerHeight(), true);
        this.FormContent.focus();
    };

    //----------------------------
	
    function quickFormToolProvider(hostEditor, pos)
    {
        var quickformtoolline, result, start, end;
        pos.ch = start;
        hostEditor.setSelection(pos, { line: pos.line, ch: end });

        quickformtoolline = new QuickFormTool();
        quickformtoolline.load(hostEditor);
        result = new $.Deferred();
        result.resolve(quickformtoolline);
        return result.promise();
    }
    
    ExtensionUtils.loadStyleSheet(module, "ui/main.css");
    EditorManager.registerInlineEditProvider(quickFormToolProvider);
    exports.quickFormToolProvider = quickFormToolProvider;
});
