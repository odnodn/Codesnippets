#Telerik

+ [keno ui demos](http://demos.telerik.com/kendo-ui/)
+ [kendo ui bootstrap demo](http://demos.telerik.com/kendo-ui/bootstrap/)
+ [xaml-sdk](https://github.com/telerik/xaml-sdk)
+ [xaml-sdk browser](http://demos.telerik.com/xaml-sdkbrowser/)



#etc
http://stackoverflow.com/questions/25189557/how-to-get-web-api-odata-v4-to-use-datetime
http://www.telerik.com/forums/mapping-sql-datetime-field-to-datetimeoffset-property
http://www.telerik.com/forums/odata-4
http://docs.telerik.com/kendo-ui/aspnet-mvc/helpers/grid/how-to/oData-v4-web-api-controller
http://www.telerik.com/support/code-library/using-utc-time-on-both-client-and-server-sides
http://www.telerik.com/forums/kendo-fails-to-parse-or-format-utc-dates
```javascript
$("#grid").kendoGrid({
    dataSource:{
        data:[
            {
                utcdate: kendo.parseDate("2012-04-18 11:23:45Z", "u"),
                localdate: new Date()
            }
        ],
        schema:{
            model:{
                fields:{
                    utcdate:{
                        type:"date"
                    },
                    localdate:{
                        type:"date"
                    }
                }
            }
        }
    },
    height:360,
    groupable:true,
    scrollable:true,
    sortable:true,
    pageable:true,
    columns:[
        {
            field:"utcdate",
            title:"local from UTC",
            format:"{0:yyyy-MM-dd HH:mm:ss}",
            width: 150
        },
        {
            field:"utcdate",
            title:"UTC from UTC",
            format:"{0:u}",
            width: 150
        },
        {
            field:"utcdate",
            title:"UTC-S from UTC",
            format:"{0:s}",
            width: 150
        },
        {
            field:"localdate",
            title:"local from local",
            format:"{0:yyyy-MM-dd HH:mm:ss}",
            width: 150
        },
        {
            field:"localdate",
            title:"UTC from local",
            format:"{0:u}",
            width: 150
        },
        {
            field:"localdate",
            title:"UTC-S from local",
            format:"{0:s}",
            width: 150
        }
    ]
});
```

new Date("2012-04-18 11:23:45Z")
new Date("2012-04-18T11:23:45+0200")

Use parameterMap and column format
```javascript
parameterMap: function (options, operation) {
                            if (operation != "read") {
                                var d = new Date(options.Date);
                                options.Date = d.toString("yyyy-MM-dd");                            
                                return options;
                            }
                        }

{ field: "Date", title: "Date ", type: "date", format: "{0:dd/MM/yyyy}" }
```
result : 30/08/2012


use date client/server
PROJECT DESCRIPTION 

This project shows how to keep a DateTime property in UTC format on both server and client sides when using a Grid with Ajax Binding and editing.
Every time a date is being retrieved from the database or received from the client, the DateTime Kind property is left unspecified. The .NET framework implicitly converts such dates to local format.
Similar thing happens on the client side. Browsers convert all dates according to local time when the Date.

For example when you create a JavaScript date like this new Date(1353397262112) different browsers which machines use different TimeZones will show different string representations of that Date.
So in order to keep time in UTC, explicit transformation should be applied to the dates on both client and server sides.
Hence there are two steps to be covered:

Use a ViewModel with setter and getter that explicitly set the DateTime Kind to UTC.
```c#
private DateTime birthDate;
public DateTime BirthDate
{
    get { return this.birthDate; }
    set
    {
        this.birthDate = new DateTime(value.Ticks, DateTimeKind.Utc);
    }
}
```
Use the requestEnd event of the DataSource to intercept and replace the incoming Date with the time difference of the current machine.
e.g.
```javascript   
var offsetMiliseconds = new Date().getTimezoneOffset() * 60000;
 
function onRequestEnd(e) {
    if (e.response.Data && e.response.Data.length) {
        var persons = e.response.Data;
        if (this.group().length) {
            for (var i = 0; i < persons.length; i++) {
                var gr = persons[i];
                if (gr.Member == "BirthDate") {
                    gr.Key = gr.Key.replace(/\d+/,
                        function (n) { return parseInt(n) + offsetMiliseconds }
                    );
                }
                addOffset(gr.Items);
            }
        } else {
            addOffset(persons);
        }
 
    }
}
 
function addOffset(persons) {
    for (var i = 0; i < persons.length; i++) {
        persons[i].BirthDate = persons[i].BirthDate.replace(/\d+/,
            function (n) { return parseInt(n) + offsetMiliseconds }
        );
    }
}
```
  
