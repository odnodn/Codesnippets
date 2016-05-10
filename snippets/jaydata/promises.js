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

// Chaining async operations

// The following code gets the first two categories (based on default ordering) and then gets their respective products.

    $data.service('/Northwind.svc', function (contextFactory, contextType) {
        var context = contextFactory();
        context
            .Categories
            .map("it.Category_ID")
            .take(2)
            .toArray()
            .then(function (categoryIds) {
                console.log("categories received:", categoryIds);
                return context
                        .Products
                        .filter("it.Category_ID in this.ids", { ids: categoryIds })
                        .toArray();
            })
            .then(function (products) {
                console.log("Products received");
                console.log(products);
            });
    });
    
// Waiting for the completion of two or more async operations

// The following code gets the list of all supliers while creating a new product line in the database. We’ll get notified when all of these happened.
    $data.service('/Northwind.svc', function (contextFactory, contextType) {
        var context = contextFactory();
        context.Products.add({ Product_Name: 'My JavaScript Product' });
        Q.all([context.Suppliers.toArray(), context.saveChanges()])
         .then(function () {
             console.log("Multiple operations completed:", arguments);
         });
    });    
