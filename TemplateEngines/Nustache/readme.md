#Nustache - Logic-less templates for .NET

## Usage:

### For non-MVC projects:

- Add a reference to Nustache.Core.dll (done for you if you used NuGet).
- Import the Nustache.Core namespace.
- Use one of the static, helper methods on the Render class.

```C#
var html = Render.FileToString("foo.template", myData);
```

- Data can be object, IDictionary, or DataTable.
- If you need more control, use Render.Template.
- See the source and tests for more information.
- For compiled templates:

```C#
var template = new Template();
template.Load(new StringReader(templateText));
var compiled = template.Compile<Foo>(null);

var html = compiled(fooInstance);
```

## Syntax:

- The same as Mustache with some extensions.
- Support for defining internal templates:

```
{{<foo}}This is the foo template.{{/foo}}
The above doesn't get rendered until it's included
like this:
{{>foo}}
```

You can define templates inside sections. They override
templates defined in outer sections which override
external templates.
