import React from "react";
import ReactDOM from "react-dom";
import TestUtils from "react-addons-test-utils";

jest.disableAutomock()

import DeveloperList from "components/developer_list";

describe("DeveloperList", function(){
  it("fetches developers from server on mount", function(){
    var developerList = TestUtils.renderIntoDocument(<DeveloperList/>);
    const $ = require.requireMock("jquery");

    console.log("jquery: ", $)
    const fetchArgs = $.ajax.mock.calls[0][0];

    expect($.ajax).toBeCalled()
    expect(fetchArgs.type).toEqual("GET")
    expect(fetchArgs.url).toEqual("/developers")
  })
})
