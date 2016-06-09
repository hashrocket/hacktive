import { expect } from "chai";
import { mount } from "enzyme";
import React from "react";
import ReactDOM from "react-dom";

import DeveloperCard from "components/developer_card";

describe("Developer Card", function(){
  const developer = chai.create("developer")

  it("displays developer information", function(){
    const developerCard = mount(
      <DeveloperCard developer={developer}/>
    );

    const avatar = developerCard.find(".avatar");

    expect(developerCard.html()).to.contain("Vidal Ekechukwu")
    expect(developerCard.html()).to.contain("VEkh")
    expect(avatar).to.exist
  });

  it("has a non-empty activities list", function(){
    const developerCard = mount(
      <DeveloperCard developer={developer}/>
    );

    const activitiesList = developerCard.find(".activities");

    expect(activitiesList).to.exist
    expect(activitiesList.children().length).to.equal(1)
  });

  it("has activites with descriptive information", function(){
    const developerCard = mount(
      <DeveloperCard developer={developer}/>
    );

    const activitiesList = developerCard.find(".activities");
    const activity = activitiesList.children().first();

    expect(activity.html()).to.contain("VEkh/sideprojects")
    expect(activity.html()).to.contain("Demo-ing Hacktive")
    expect(activity.html()).to.contain("Mar 11, 2016 04:36 PM")
    expect(activity.html()).to.contain("Pushed to")
  });
});
