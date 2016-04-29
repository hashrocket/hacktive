import { expect } from "chai";
import $ from "jquery";
import React from "react";
import ReactTestUtils from "react-addons-test-utils";

import DeveloperList from "components/developer_list";

describe("Developer List", function(){
  it("requests developers on mount", sinon.test(function(){
    this.spy($, "ajax")

    const developerList = ReactTestUtils.renderIntoDocument(<DeveloperList/>);
    const ajaxArgs = $.ajax.args[0][0];

    expect($.ajax.calledOnce).to.be.true;
    expect(ajaxArgs.type).to.equal("GET");
    expect(ajaxArgs.url).to.equal("/developers");
  });
});
