var expect = require("chai").expect;
var React = require("react");
var TestUtils = require("react-addons-test-utils");

import DeveloperList from "components/developer_list";

describe("Developer List", function(){
  it("renders without problems", function () {
    var developerList = TestUtils.renderIntoDocument(<DeveloperList/>);

    expect(developerList).to.exist;
  });
});
