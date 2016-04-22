import React from "react";
import ReactDOM from "react-dom";
import TestUtils from "react-addons-test-utils";

import Search from "components/search";

describe("DeveloperList", function(){
  it("updates with search", function(){
    var search = TestUtils.renderIntoDocument(<Search/>);
    var searchNode = ReactDOM.findDOMNode(search);

    expect(searchNode.innerHTML).toContain("Search")
  })
})
