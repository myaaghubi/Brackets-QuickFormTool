define(function (require, exports, module)
{
    "use strict";
    
    var EditorManager        = brackets.getModule("editor/EditorManager"),
    ExtensionUtils           = brackets.getModule("utils/ExtensionUtils"),
    Strings                  = brackets.getModule("strings"),
	DocumentManager          = brackets.getModule("document/DocumentManager"),
    QuickFormToolTemplate    = require("text!ui/QuickFormToolTemplate.html");
    
	var untitledhtml5index = 1;
    var untitledcssindex = 1;
    var untitledjsindex = 1;
	
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
            $element.find(".qft-imagebutton").click(function () { quickFormTool("imagebutton"); });
            $element.find(".qft-imagefield").click(function () { quickFormTool("imagefield"); });
            $element.find(".qft-filefield").click(function () { quickFormTool("filefield"); });
            $element.find(".qft-hiddenfield").click(function () { quickFormTool("hiddenfield"); });
			$element.find(".qft-link").click(function () { quickFormTool("link"); });
			
            $element.find(".qft-html5video").click(function () { quickFormTool("html5video"); });
            $element.find(".qft-embedflash").click(function () { quickFormTool("embedflash"); });
            
			$element.find(".qft-html5file").click(function () { quickFormTool("html5file"); });
			$element.find(".qft-cssfile").click(function () { quickFormTool("cssfile"); });
			$element.find(".qft-jsfile").click(function () { quickFormTool("jsfile"); });
			$element.find(".qftnotify").click(function () { $element.find(".qftblock").toggleClass("qftblock-exp");
                                                            $element.find(".qftnotify").toggleClass("qftnotify-exp"); });
			$element.find(".qft-unpin").click(function () {$element.find(".qftblock").toggleClass("qftblock-exp");
                                                           
                                                         $element.find(".qft-unpin").toggleClass("qft-pin"); });

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
                switch (_class)
                {
                    case "form":
                        handleCommand("<form action=\"\" method=\"get\"></form>");
                    break;
                    
                    case "textfield":
                        handleCommand("<input type=\"text\" name=\"textfield\" size=\"25\" value=\"TextField\">");
                    break;
                    
                    case "textarea":
                        handleCommand("<textarea name=\"\" cols=\"25\" rows=\"5\">TextArea</textarea>");
                    break;
                    
                    case "button":
                        handleCommand("<input type=\"button\" name=\"button\" value=\"Button\">");
                    break;
                    
                    case "checkbox":
                        handleCommand("<input type=\"checkbox\" name=\"checkbox\" value=\"CheckBox\">");
                    break;
                    
                    case "radiobutton":
                        handleCommand("<input type=\"radio\" name=\"radiogroup\" value=\"RadioButton\">");
                    break;
                    
                    case "listmenu":
                        handleCommand("<select name=\"selectoptions\">\n\t<option value=\"option1\">Option 1</option>\n\t<option value=\"option2\">Option 2</option>\n</select>");
                    break;
                    
                    case "imagebutton":
                        handleCommand("<input type=\"image\" name=\"\" src=\"\" width=\"\" height=\"\">");
                    break;
                        
                    case "imagefield":
                        handleCommand("<img src=\"\" alt=\"\" width=\"\" height=\"\">");
                    break;
                    
                    case "filefield":
                        handleCommand("<input type=\"file\" name=\"filefield\">");
                    break;
                    
                    case "hiddenfield":
                        handleCommand("<input type=\"hidden\" name=\"hiddenfield\" value=\"hiddenfieldvalue\">");
                    break;
					
					case "link":
                        handleCommand("<a href=\"\"></a>");
                    break;
                        
                    case "html5video":
                        handleCommand("<video width=\"320\" height=\"240\" controls>\n<source src=\"movie.mp4\" type=\"video/mp4\">\n<source src=\"movie.ogg\" type=\"video/ogg\">\nYour browser does not support the video tag.</video>");
                    break;
                        
                    case "embedflash":
                        handleCommand("<object data=\"flashfile.swf\" width=\"\" height=\"\"></object>");
                    break;
					
					case "html5file":
                        var doc = DocumentManager.createUntitledDocument(untitledhtml5index++, ".html");
						handleFileNew(doc);	
						handleCommand(html5page);
					break;
					
					case "cssfile":
                        makeCSSFile();
					break;
					
					case "jsfile":
                        makeJSFile();
                    break;
                }
            }
        }
        catch(e)
        {
            alert("Error: " + e);
        }
    };
    
    function makeCSSFile()
    {
        var doc = DocumentManager.createUntitledDocument(untitledcssindex++, ".css");
        handleCommand("<link rel=\"stylesheet\" href=\"Untitled-" + untitledcssindex + ".css\">");
        handleFileNew(doc);
        handleCommand("html\n{\n\t\n\}\n");	
    }
    function makeJSFile()
    {
        var doc = DocumentManager.createUntitledDocument(untitledjsindex++, ".js");
        handleCommand("<script type=\"javascript\" src=\"Untitled-" + untitledjsindex + ".js\" />");
        handleFileNew(doc);
        handleCommand("");	
    }
    function handleCommand(commandString)
    {
        EditorManager.focusEditor();
        var hosteditor = EditorManager.getFocusedEditor();
        hosteditor.document.replaceRange(commandString, hosteditor.getCursorPos());
    }
	//make new file. 
    function handleFileNew(docName)
	{
        var doc_ = docName;
        DocumentManager.setCurrentDocument(doc_);
        EditorManager.focusEditor();
        return new $.Deferred().resolve(doc_).promise();
    }
	var html5page = "<!doctype html>\n<html>\n<head>\n\t<meta charset=\"UTF-8\">\n\t<title>Untitled Document</title>\n\t\n</head>\n<body>\n\t\n\t\n\t\n</body>\n</html>";
	
    ExtensionUtils.loadStyleSheet(module, "ui/style.css");
    exports.quickFormToolProvider = quickFormToolProvider;
});
