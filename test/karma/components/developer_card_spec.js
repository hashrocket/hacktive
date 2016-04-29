import { expect } from "chai";
import React from "react";
import ReactDOM from "react-dom";
import ReactTestUtils from "react-addons-test-utils";

import DeveloperCard from "components/developer_card";

describe("Developer List", function(){
  it("displays developer information", function(){
    const developer = chai.create("developer")

    const developerCard = ReactTestUtils.renderIntoDocument(
      <DeveloperCard developer={developer}/>
    );
    const developerCardNode = ReactDOM.findDOMNode(developerCard);

    expect(developerCardNode.innerHTML).to.contain("Dorian Karter")
  });
});
