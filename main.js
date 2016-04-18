define(function (require, exports, module)
{
    "use strict";
    
    var EditorManager        = brackets.getModule("editor/EditorManager"),
    ExtensionUtils           = brackets.getModule("utils/ExtensionUtils"),
    Strings                  = brackets.getModule("strings"),
	DocumentManager          = brackets.getModule("document/DocumentManager"),
    MainViewManager          = brackets.getModule("view/MainViewManager"),
    FileSystem               = brackets.getModule("filesystem/FileSystem"),
    DocumentModule           = brackets.getModule("document/Document"),
    InMemoryFile             = brackets.getModule("document/InMemoryFile"),
    Editor                   = brackets.getModule("editor/Editor"),
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
            $element.find(".qft-button").click(function () { quickFormTool("button"); });
            $element.find(".qft-textfield").click(function () { quickFormTool("textfield"); });
            $element.find(".qft-filefield").click(function () { quickFormTool("filefield"); });
            $element.find(".qft-checkbox").click(function () { quickFormTool("checkbox"); });
            $element.find(".qft-radiobutton").click(function () { quickFormTool("radiobutton"); });
            $element.find(".qft-hiddenfield").click(function () { quickFormTool("hiddenfield"); });
            $element.find(".qft-textarea").click(function () { quickFormTool("textarea"); });
            $element.find(".qft-imagefield").click(function () { quickFormTool("imagefield"); });
            $element.find(".qft-imagebutton").click(function () { quickFormTool("imagebutton"); });
            $element.find(".qft-listmenu").click(function () { quickFormTool("listmenu"); });
			$element.find(".qft-link").click(function () { quickFormTool("link"); });
			
            $element.find(".qft-html5audio").click(function () { quickFormTool("html5audio"); });
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
                        handleText("<form action=\"\" method=\"post\"></form>");
                    break;
                    
                    case "textfield":
                        handleText("<input type=\"text\" name=\"textfield\" placeholder=\"TextField\">");
                    break;
                    
                    case "textarea":
                        handleText("<textarea name=\"textarea\" placeholder=\"TextArea\"></textarea>");
                    break;
                    
                    case "button":
                        handleText("<input type=\"button\" name=\"button\">");
                    break;
                    
                    case "checkbox":
                        handleText("<input type=\"checkbox\" name=\"checkbox\">");
                    break;
                    
                    case "radiobutton":
                        handleText("<input type=\"radio\" name=\"radio1\">");
                    break;
                    
                    case "listmenu":
                        handleText("<select name=\"selectoptions\">\n\t<option value=\"option1\">Option 1</option>\n\t<option value=\"option2\">Option 2</option>\n</select>");
                    break;
                    
                    case "imagebutton":
                        handleText("<input type=\"image\" name=\"imageinput\" src=\"\" width=\"\" height=\"\">");
                    break;
                        
                    case "imagefield":
                        handleText("<img src=\"\" alt=\"\" width=\"\" height=\"\">");
                    break;
                    
                    case "filefield":
                        handleText("<input type=\"file\" name=\"fileinput\">");
                    break;
                    
                    case "hiddenfield":
                        handleText("<input type=\"hidden\" name=\"hiddeninput\" value=\"hiddeninputvalue\">");
                    break;
					
					case "link":
                        handleText("<a href=\"\" target=\"_self\"></a>");
                    break;
                        
                    case "html5audio":
                        handleText("<audio controls>\n\t<source src=\"audio.ogg\" type=\"audio/ogg\">\n\t<source src=\"audio.mp3\" type=\"audio/mpeg\">\n\tYour browser does not support the audio element.\n</audio> ");
                    break;
                        
                    case "html5video":
                        handleText("<video width=\"320\" height=\"240\" controls>\n\t<source src=\"movie.mp4\" type=\"video/mp4\">\n\t<source src=\"movie.ogg\" type=\"video/ogg\">\n\tYour browser does not support the video tag.\n</video>");
                    break;
                        
                    case "embedflash":
                        handleText("<object data=\"flashfile.swf\" width=\"\" height=\"\"></object>");
                    break;
					
					case "html5file":
                        makeHTML5File();
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
    
    function makeHTML5File()
    {
        var doc = createUntitledDocument("Untitled-", untitledhtml5index++, ".html");
        handleFileNew(doc);	
        handleText("<!DOCTYPE html>\n<html>\n<head>\n\t<meta charset=\"UTF-8\">\n\t<title>Untitled Document</title>\n\t\n</head>\n<body>\n\t\n</body>\n</html>");
        EditorManager.getActiveEditor().setCursorPos({ line: 8, pos: 0 });
    }
    
    function makeCSSFile()
    {
        var doc = createUntitledDocument("css", untitledcssindex, ".css");
        handleTextToTag("<link rel=\"stylesheet\" href=\"css" + untitledcssindex++ + ".css\">", "head");
        handleFileNew(doc);
        handleText("html\n{\n\t\n\}\n");	
    }
    
    function makeJSFile()
    {
        var doc = createUntitledDocument("javascript", untitledjsindex, ".js");
        handleText("<script type=\"javascript\" src=\"javascript" + untitledjsindex++ + ".js\" />");
        handleFileNew(doc);
        handleText("");	
    }
    
    function handleText(commandString)
    {
        try
        {
            var activeEditor = EditorManager.getActiveEditor(),
            activeDoc = activeEditor && activeEditor.document,
            fileFullPath = activeDoc.file.fullPath,
            fileFullName = fileFullPath.substring(fileFullPath.lastIndexOf("/") + 1), 
            fileFormat = fileFullName.substring(fileFullName.lastIndexOf(".") + 1);

            if (fileFormat == "html" || fileFormat == "htm")
            {
                var line = activeEditor.document.getLine(activeEditor.getCursorPos().line);
                if (line.replace(/^\s+|\s+$/g, '').length>0)
                {
                    var csIndent = line.match(/^\s{0,32}/)[0].length;
                    if (line.substr(activeEditor.getCursorPos().ch).length==0)
                        commandString = "\n" + new Array(csIndent+1).join(' ') +commandString;
                }

                activeEditor.document.replaceRange(commandString, activeEditor.getCursorPos());
            }
        }
        catch(err){}
    }
    
    function handleTextToTag(text, tag)
    {
        try
        {
            var activeEditor = EditorManager.getActiveEditor(),
            activeDoc = activeEditor && activeEditor.document,
            fileFullPath = activeDoc.file.fullPath,
            fileFullName = fileFullPath.substring(fileFullPath.lastIndexOf("/") + 1), 
            fileFormat = fileFullName.substring(fileFullName.lastIndexOf(".") + 1);
            
            if (fileFormat == "html" || fileFormat == "htm")
            {
                EditorManager.getFocusedEditor();
                var getDocumentText_ = activeEditor.document.getText().replace("</" + tag + ">", "\t" + text + "\n</" + tag + ">");
                activeEditor.document.setText(getDocumentText_);    
                //activeEditor.document.replaceRange(text, activeEditor.getCursorPos());
            }
        }
        catch(err){alert("Error: "+err);}
    }
    
    //make new document. used of document/DocumentManager -> createUntitledDocument()
    function createUntitledDocument(filename, counter, fileExt) {
        var fullfilename = filename + counter + fileExt,
            fullPath = DocumentManager._untitledDocumentPath + "/" + fullfilename,
            now = new Date(),
            file = new InMemoryFile(fullPath, FileSystem);

        FileSystem.addEntryForPathIfRequired(file, fullPath);

        return new DocumentManager.Document(file, now, "");
    }
    
	//make new file. 
    function handleFileNew(docname)
	{
        try
        {
            var doc_ = docname;

            MainViewManager._edit(MainViewManager.ACTIVE_PANE, doc_);
            return new $.Deferred().resolve(doc_).promise();
            
        }
        catch(err){alert("Error: "+err);}
    }
	
    ExtensionUtils.loadStyleSheet(module, "ui/style.css");
    exports.quickFormToolProvider = quickFormToolProvider;
});