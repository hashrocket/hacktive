var searchModulePath = `${js_root}/components/search`;

jest.unmock(searchModulePath)

var React = require("react");
var ReactDOM = require("react-dom");
var TestUtils = require("react-addons-test-utils");

var Search = require(searchModulePath);

describe("DeveloperList", function(){
  it("updates with search", function(){
    var search = TestUtils.renderIntoDocument(<Search/>);
    var searchNode = ReactDOM.findDOMNode(search);

    expect(searchNode.innerHTML).toContain("Search")
  })
})
