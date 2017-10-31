var cipher = require("../cipher");

var chai = require("chai");
var expect = chai.expect;

describe("cipher", function () {
    it("'SERR PBQR PNZC' should decode to 'FREE CODE CAMP'", function () {
        expect(cipher("SERR PBQR PNZC")).to.equal("FREE CODE CAMP");
    });

    it("'SERR CVMMN!' should decode to 'FREE PIZZA!'", function () {
        expect(cipher("SERR CVMMN!")).to.equal("FREE PIZZA!");
    });

    it("'SERR YBIR?' should decode to 'FREE LOVE?'", function () {
        expect(cipher("SERR YBIR?")).to.equal("FREE LOVE?");
    });

    it("'GUR DHVPX OEBJA QBT WHZCRQ BIRE GUR YNML SBK.' should decode to 'THE QUICK BROWN DOG JUMPED OVER THE LAZY FOX.'", function () {
        expect(cipher("GUR DHVPX OEBJA QBT WHZCRQ BIRE GUR YNML SBK.")).to.equal("THE QUICK BROWN DOG JUMPED OVER THE LAZY FOX.");
    });
});