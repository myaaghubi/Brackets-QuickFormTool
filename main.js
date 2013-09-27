//QuickFormTool ver 0.6 beta
//An extension for https://github.com/adobe/brackets
//Last version of extension https://github.com/pgrammer/Brackets-QuickFormTool
//This extension currently not available for use so is incompletely.
//by Mohammad.Yaghobi, m.yaghobi.abc@gmail.com

define(function (require, exports, module)
{
    "use strict";
    
    var EditorManager         = brackets.getModule("editor/EditorManager"),
        ExtensionUtils        = brackets.getModule("utils/ExtensionUtils"),
        Strings               = brackets.getModule("strings"),
        QuickFormToolTemplate = require("text!ui/QuickFormToolTemplate.html");

	
    function quickFormToolProvider()
    {
        try
        {
            var $element = $(Mustache.render(QuickFormToolTemplate, Strings));
            $element.find(".form").click(function () { quickFormTool("form"); });
			$element.find(".textfield").click(function () { quickFormTool("textfield"); });
			$element.find(".textarea").click(function () { quickFormTool("textarea"); });
			$element.find(".botton").click(function () { quickFormTool("botton"); });
			$element.find(".checkbox").click(function () { quickFormTool("checkbox"); });
			$element.find(".radiobotton").click(function () { quickFormTool("radiobotton"); });
			$element.find(".listmenu").click(function () { quickFormTool("listmenu"); });
			$element.find(".imagefield").click(function () { quickFormTool("imagefield"); });
			$element.find(".filefield").click(function () { quickFormTool("filefield"); });
			$element.find(".hiddenfiled").click(function () { quickFormTool("hiddenfiled"); });

            $($element).insertBefore("#editor-holder");
        }
        catch(e)
        {
            alert("Error: " + e);
        }
    }
    var loadfunction = quickFormToolProvider();
	function quickFormTool(_class)
	{
        try
        {
			EditorManager.focusEditor();
			var hosteditor = EditorManager.getFocusedEditor();
			if (hosteditor) 
			{
				var htmlcode = "";
				switch (_class)
				{
					case "form":
						htmlcode = "<form action='' method='get'></form>";
					break;
					
					case "textfield":
						htmlcode = "<input name='' type='text' />";
					break;
					
					case "textarea":
						htmlcode = "<textarea name='' cols='' rows=''></textarea>";
					break;
					
					case "botton":
						htmlcode = "<input name='' type='button' />";
					break;
					
					case "checkbox":
						htmlcode = "<input name='' type='checkbox' value='' />";
					break;
					
					case "radiobotton":
						htmlcode = "<input name='' type='radio' value='' />";
					break;
					
					case "listmenu":
						htmlcode = "<select name=''></select>";
					break;
					
					case "imagefield":
						htmlcode = "<input name='' type='image' src='asd' align='middle' width='' height='' />";
					break;
					
					case "filefield":
						htmlcode = "<input name='' type='file' />";
					break;
					
					case "hiddenfiled":
						htmlcode = "<input name='' type='hidden' value='' />";
					break;
				}
				hosteditor.document.replaceRange(htmlcode, hosteditor.getCursorPos());
			}
        }
        catch(e)
        {
            alert("Error: " + e);
        }
	};
	
    ExtensionUtils.loadStyleSheet(module, "ui/main.css");
    exports.quickFormToolProvider = quickFormToolProvider;
});
