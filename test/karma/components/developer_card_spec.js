import { expect } from "chai";
import React from "react";
import ReactDOM from "react-dom";
import ReactTestUtils from "react-addons-test-utils";

import DeveloperCard from "components/developer_card";

describe("Developer Card", function(){
  const developer = chai.create("developer")

  it("displays developer information", function(){
    const developerCard = ReactTestUtils.renderIntoDocument(
      <DeveloperCard developer={developer}/>
    );
    const developerCardNode = ReactDOM.findDOMNode(developerCard);
    const avatar = ReactTestUtils.findRenderedDOMComponentWithClass(
      developerCard, "avatar"
    );

    expect(developerCardNode.innerHTML).to.contain("Vidal Ekechukwu")
    expect(developerCardNode.innerHTML).to.contain("VEkh")
    expect(avatar).to.exist
  });

  it("has a non-empty activities list", function(){
    const developerCard = ReactTestUtils.renderIntoDocument(
      <DeveloperCard developer={developer}/>
    );

    const activitiesList = ReactTestUtils.findRenderedDOMComponentWithClass(
      developerCard, "activities"
    );

    expect(activitiesList).to.exist
    expect(activitiesList.children.length).to.equal(1)
  });

  it("has activites with descriptive information", function(){
    const developerCard = ReactTestUtils.renderIntoDocument(
      <DeveloperCard developer={developer}/>
    );

    const activitiesList = ReactTestUtils.findRenderedDOMComponentWithClass(
      developerCard, "activities"
    );

    const activity = activitiesList.children[0];

    expect(activity.innerHTML).to.contain("VEkh/sideprojects")
    expect(activity.innerHTML).to.contain("Demo-ing Hacktive")
    expect(activity.innerHTML).to.contain("Mar 11th, 2016 @ 04:36pm")
    expect(activity.innerHTML).to.contain("Push")
  });
});
