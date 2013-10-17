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
			$element.find(".link").click(function () { quickFormTool("link"); });
			
			$element.find(".html5page").click(function () { quickFormTool("html5page"); });

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
					
					case "link":
                        htmlcode = "<a href=\"\"></a>";
                    break;
					
					case "html5page":
					
						handleFileNew();	
						htmlcode = html5page;
					
                    break;
                }
				EditorManager.focusEditor();
            var hosteditor = EditorManager.getFocusedEditor();
                hosteditor.document.replaceRange(htmlcode, hosteditor.getCursorPos());
            }
        }
        catch(e)
        {
            alert("Error: " + e);
        }
    };
	//maker new file. 
    function handleFileNew() 
	{
        var doc = DocumentManager.createUntitledDocument(untitleddocumentindex++, ".html");
        DocumentManager.setCurrentDocument(doc);
        EditorManager.focusEditor();
        return new $.Deferred().resolve(doc).promise();
    }
	var html5page = "<!doctype html>\n<html>\n<head>\n\t<meta charset=\"UTF-8\">\n\t<title>Untitled Document</title>\n\t\n</head>\n<body>\n\t\n\t\n\t\n</body>\n</html>";
	
    ExtensionUtils.loadStyleSheet(module, "ui/style.css");
    exports.quickFormToolProvider = quickFormToolProvider;
});
