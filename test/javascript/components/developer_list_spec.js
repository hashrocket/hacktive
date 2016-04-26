import { expect } from "chai";
import React from "react";
import TestUtils from "react-addons-test-utils";

import DeveloperList from "components/developer_list";

describe("Developer List", function(){
  it("requests developers on mount", function () {
    const $ = require("jquery");

    sinon.spy($, "ajax")

    const developerList = TestUtils.renderIntoDocument(<DeveloperList/>);
    const ajaxArgs = $.ajax.args[0][0];

    expect($.ajax.calledOnce).to.be.true;
    expect(ajaxArgs.type).to.equal("GET");
    expect(ajaxArgs.url).to.equal("/developers");
  });
});
