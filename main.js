/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, brackets, window */

define(function (require, exports, module)
{
    "use strict";
    
    var EditorManager        = brackets.getModule("editor/EditorManager"),
    ExtensionUtils           = brackets.getModule("utils/ExtensionUtils"),
    Strings                  = brackets.getModule("strings"),
	DocumentManager          = brackets.getModule("document/DocumentManager"),
    QuickFormToolTemplate    = require("text!ui/QuickFormToolTemplate.html");
    
	var untitleddocumentindex = 1;
	
    function quickFormToolProvider()
    {
        try
        {
            var $element = $(Mustache.render(QuickFormToolTemplate, Strings));
            
            $element.find(".qft-form").click(function () { quickFormTool("form"); });
            $element.find(".qft-textfield").click(function () { quickFormTool("textfield"); });
            $element.find(".qft-textarea").click(function () { quickFormTool("textarea"); });
            $element.find(".qft-button").click(function () { quickFormTool("button"); });
            $element.find(".qft-checkbox").click(function () { quickFormTool("checkbox"); });
            $element.find(".qft-radiobutton").click(function () { quickFormTool("radiobutton"); });
            $element.find(".qft-listmenu").click(function () { quickFormTool("listmenu"); });
            $element.find(".qft-imagefield").click(function () { quickFormTool("imagefield"); });
            $element.find(".qft-filefield").click(function () { quickFormTool("filefield"); });
            $element.find(".qft-hiddenfield").click(function () { quickFormTool("hiddenfield"); });
			$element.find(".qft-link").click(function () { quickFormTool("link"); });
			
			$element.find(".qft-html5page").click(function () { quickFormTool("html5page"); });
			$element.find(".qft-makecsslink").click(function () { quickFormTool("makecsslink"); });
			$element.find(".qft-makejavascripttag").click(function () { setPinUnpin(this.Text("tag")); });
			
			$element.find(".qft-pin").click(function () {$element.find(".qftblock").toggleClass("qftblock-exp");
                                                         $element.find(".qft-pin").toggleClass("qft-unpin"); });

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
            
            if (true) 
            {
                var htmlcode = "";
                switch (_class)
                {
                    case "form":
                        handleCommand("<form action=\"\" method=\"get\"></form>");
                    break;
                    
                    case "textfield":
                        handleCommand("<input name=\"\" type=\"text\" />");
                    break;
                    
                    case "textarea":
                        handleCommand("<textarea name=\"\" cols=\"\" rows=\"\"></textarea>");
                    break;
                    
                    case "button":
                        handleCommand("<input name=\"\" type=\"button\" />");
                    break;
                    
                    case "checkbox":
                        handleCommand("<input name=\"\" type=\"checkbox\" value=\"\" />");
                    break;
                    
                    case "radiobutton":
                        handleCommand("<input name=\"\" type=\"radio\" value=\"\" />");
                    break;
                    
                    case "listmenu":
                        handleCommand("<select name=\"\"></select>");
                    break;
                    
                    case "imagefield":
                        handleCommand("<input name=\"\" type=\"image\" src=\"\" align=\"middle\" width=\"\" height=\"\" />");
                    break;
                    
                    case "filefield":
                        handleCommand("<input name=\"\" type=\"file\" />");
                    break;
                    
                    case "hiddenfield":
                        handleCommand("<input name=\"\" type=\"hidden\" value=\"\" />");
                    break;
					
					case "link":
                        handleCommand("<a href=\"\"></a>");
                    break;
                }
            }
        }
        catch(e)
        {
            alert("Error: " + e);
        }
    };
	//make new file. 
    function handleFileNew() 
	{
        var doc = DocumentManager.createUntitledDocument(untitleddocumentindex++, ".html");
        DocumentManager.setCurrentDocument(doc);
        EditorManager.focusEditor();
        return new $.Deferred().resolve(doc).promise();
    }
    function handleCommand(commandString)
    {
        EditorManager.focusEditor();
        var hosteditor = EditorManager.getFocusedEditor();
        hosteditor.document.replaceRange(commandString, hosteditor.getCursorPos());
    }
	var html5page = "<!doctype html>\n<html>\n<head>\n\t<meta charset=\"UTF-8\">\n\t<title>Untitled Document</title>\n\t\n</head>\n<body>\n\t\n\t\n\t\n</body>\n</html>";
	
    ExtensionUtils.loadStyleSheet(module, "ui/style.css");
    exports.quickFormToolProvider = quickFormToolProvider;
});
