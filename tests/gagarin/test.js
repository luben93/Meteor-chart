describe('My first Gagarin test suite', function () {
    var server = meteor();
    var client = browser(server);

    it('should just work', function () {
        return server.execute(function () { console.log('I am alive!'); });
    });

    it('should work for both client and server', function () {
        return client.execute(function () {
            // some code to execute
            console.log("client")

            let n=$('.data').length;

            $('.btn .new-item').submit;
            assert.lengthOf($('.data'),n+1);
        }).then(function () {
            return server.execute(function () {
                console.log("server")
                // some code to execute on server

            });
        });
    });
});
