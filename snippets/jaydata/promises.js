// http://jaydata.org/blog/how-to-work-with-the-jaydata-promise-interfaces

// Using promise.then and promise.fail instead of result callbacks

    $data.service('/Northwind.svc', function (contextFactory, contextType) {
        contextFactory()
            .Categories
            .toArray()
            .then(function (items) {
                console.log("items received:", items.length);
                console.log(items);
            })
            .fail(function (err) {
                console.log("Errors occured:", err);
            });
    });
    
// Note that in this simple use case this is equivalent with the following code:

    $data.service('/Northwind.svc', function (contextFactory, contextType) {
        contextFactory()
            .Categories
            .toArray({
                success: function (items) {
                    console.log("items received:", items.length);
                    console.log(items);
                },
                error: function (err) {
                    console.log("Errors occured:", err);
                }
            });
    });
