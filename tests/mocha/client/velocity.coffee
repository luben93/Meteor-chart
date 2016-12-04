MochaWeb?.testOnly ->
    describe "testing", ->
        describe "helloworld", ->
            it "asserts something simple", ->
                chia.assets.equal 10, 10
