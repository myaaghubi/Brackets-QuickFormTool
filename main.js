/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, brackets, window */

define(function (require, exports, module)
{
    "use strict";
    //load modules and template
    var EditorManager        = brackets.getModule("editor/EditorManager"),
    ExtensionUtils           = brackets.getModule("utils/ExtensionUtils"),
    Strings                  = brackets.getModule("strings"),
    QuickFormToolTemplate    = require("text!ui/QuickFormToolTemplate.html");

    //set function to buttons
    function quickFormToolProvider()
    {
        //if main.js load before template then $element.find() not work
        try
        {
            var $element = $(Mustache.render(QuickFormToolTemplate, Strings));
            $element.find(".form").click(function () { quickFormTool("form"); });
            $element.find(".textfield").click(function () { quickFormTool("textfield"); });
            $element.find(".textarea").click(function () { quickFormTool("textarea"); });
            $element.find(".button").click(function () { quickFormTool("button"); });
            $element.find(".checkbox").click(function () { quickFormTool("checkbox"); });
            $element.find(".radiobutton").click(function () { quickFormTool("radiobutton"); });
            $element.find(".listmenu").click(function () { quickFormTool("listmenu"); });
            $element.find(".imagefield").click(function () { quickFormTool("imagefield"); });
            $element.find(".filefield").click(function () { quickFormTool("filefield"); });
            $element.find(".hiddenfield").click(function () { quickFormTool("hiddenfield"); });

            $($element).insertBefore("#editor-holder");
        }
        catch(e)
        {
            alert("Error: " + e);
        }
    }
	
    //call quickFormToolProvider() when extension load
    var loadfunction = quickFormToolProvider();
    
    //do actions
    function quickFormTool(_class)
    {
        try
        {
            EditorManager.focusEditor();
            var hosteditor = EditorManager.getFocusedEditor();
			
            //detect button
            if (hosteditor) 
            {
                var htmlcode = "";
                switch (_class)
                {
                    case "form":
                        htmlcode = "<form action=\"\" method=\"get\"></form>";
                    break;
                    
                    case "textfield":
                        htmlcode = "<input name=\"\" type=\"text\" />";
                    break;
                    
                    case "textarea":
                        htmlcode = "<textarea name=\"\" cols=\"\" rows=\"\"></textarea>";
                    break;
                    
                    case "button":
                        htmlcode = "<input name=\"\" type=\"button\" />";
                    break;
                    
                    case "checkbox":
                        htmlcode = "<input name=\"\" type=\"checkbox\" value=\"\" />";
                    break;
                    
                    case "radiobutton":
                        htmlcode = "<input name=\"\" type=\"radio\" value=\"\" />";
                    break;
                    
                    case "listmenu":
                        htmlcode = "<select name=\"\"></select>";
                    break;
                    
                    case "imagefield":
                        htmlcode = "<input name=\"\" type=\"image\" src=\"asd\" align=\"middle\" width=\"\" height=\"\" />";
                    break;
                    
                    case "filefield":
                        htmlcode = "<input name=\"\" type=\"file\" />";
                    break;
                    
                    case "hiddenfield":
                        htmlcode = "<input name=\"\" type=\"hidden\" value=\"\" />";
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
	
    //load style for template
    ExtensionUtils.loadStyleSheet(module, "ui/style.css");
    exports.quickFormToolProvider = quickFormToolProvider;
});
