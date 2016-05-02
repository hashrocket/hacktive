import { expect } from "chai";
import $ from "jquery";
import React from "react";
import ReactDOM from "react-dom";
import ReactTestUtils from "react-addons-test-utils";

import DeveloperCard from "components/developer_card";
import DeveloperList from "components/developer_list";
import DeveloperStore from "flux/stores/developer_store";

describe("Developer List", function(){
  it("requests developers on mount", sinon.test(function(){
    this.spy($, "ajax")

    const developerList = ReactTestUtils.renderIntoDocument(<DeveloperList/>);
    const ajaxArgs = $.ajax.args[0][0];

    expect($.ajax.calledOnce).to.be.true;
    expect(ajaxArgs.type).to.equal("GET");
    expect(ajaxArgs.url).to.equal("/developers");
  }));

  it("shows fetched developers", function(){
    const developers = [chai.create("developer")];

    DeveloperStore.setDevelopers(developers)

    const developerList = ReactTestUtils.renderIntoDocument(<DeveloperList/>);
    const developerCards = ReactTestUtils.scryRenderedComponentsWithType(
      developerList,
      DeveloperCard
    );

    expect(developerCards.length).to.equal(1)
  });
});
