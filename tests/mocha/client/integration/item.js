MochaWeb.testOnly(function(){
  describe("the home page", function(){
    it("shows the 'submit' button", function(){
      chai.assert.equal($(".new-item .btn").length, 1);
    });
  });

  describe("click the 'submit' button", function(){
    before(function(done){
      $(".submit .new-item").click();
      done();
    });

    it("creates a new item and shows it on the page", function(){
      chai.assert.equal(Item.find().count(), 1);
      chai.assert.equal($(".data").length, 1);
    });
  });
});
