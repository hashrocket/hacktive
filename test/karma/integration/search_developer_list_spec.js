import { expect } from "chai";
import React from "react";
import ReactDOM from "react-dom";
import ReactTestUtils from "react-addons-test-utils";

import DeveloperCard from "components/developer_card";
import DeveloperList from "components/developer_list";
import DeveloperStore from "flux/stores/developer_store";
import Search from "components/search";
import SearchStore from "flux/stores/search_store";

describe("Developer list search", function(){
  afterEach(function(){
    SearchStore.setQuery("")
  })

  it("filters developers by username", function(){
    const search = ReactTestUtils.renderIntoDocument(<Search/>);
    const developers = [
      chai.create("developer"),
      chai.create("developer", {
        "id": 2782858,
        "login": "jwworth",
        "name": "Jake Worth",
        "activities": [
          {
            "id": 692,
            "payload": {
              "commits": [
                {
                  "sha": "29108275e5a5fde619d2638d0fe177b1ef631915",
                  "message": "Initial commit"
                }
              ]
            },
            "developer_id": 2782858,
            "event_occurred_at": "2016-05-02T17:47:03+00:00",
            "event_id": 3962697008,
            "event_type": "PushEvent",
            "repo_name": "jwworth/project_euler",
            "created_at": "2016-05-02T17:47:50.038763+00:00",
            "activity_url": "https://github.com/jwworth/project_euler/commit/29108275e5a5fde619d2638d0fe177b1ef631915"
          }
        ]
      })
    ];

    DeveloperStore.setDevelopers(developers)

    let developerList = ReactTestUtils.renderIntoDocument(<DeveloperList/>);
    let developerCards = ReactTestUtils.scryRenderedComponentsWithType(
      developerList, DeveloperCard
    );

    expect(developerCards.length).to.equal(2)

    const searchInput = ReactTestUtils.findRenderedDOMComponentWithTag(
      search, "input"
    );

    searchInput.value = "vekh"
    ReactTestUtils.Simulate.change(searchInput)

    developerList = ReactTestUtils.renderIntoDocument(<DeveloperList/>);

    developerCards = ReactTestUtils.scryRenderedComponentsWithType(
      developerList, DeveloperCard
    );

    expect(developerCards.length).to.equal(1)
  });

  it("filters developers by full name", function(){
    const search = ReactTestUtils.renderIntoDocument(<Search/>);
    const developers = [
      chai.create("developer"),
      chai.create("developer", {
        "id": 2782858,
        "login": "jwworth",
        "name": "Jake Worth",
        "activities": [
          {
            "id": 692,
            "payload": {
              "commits": [
                {
                  "sha": "29108275e5a5fde619d2638d0fe177b1ef631915",
                  "message": "Initial commit"
                }
              ]
            },
            "developer_id": 2782858,
            "event_occurred_at": "2016-05-02T17:47:03+00:00",
            "event_id": 3962697008,
            "event_type": "PushEvent",
            "repo_name": "jwworth/project_euler",
            "created_at": "2016-05-02T17:47:50.038763+00:00",
            "activity_url": "https://github.com/jwworth/project_euler/commit/29108275e5a5fde619d2638d0fe177b1ef631915"
          }
        ]
      })
    ];

    DeveloperStore.setDevelopers(developers)

    let developerList = ReactTestUtils.renderIntoDocument(<DeveloperList/>);
    let developerCards = ReactTestUtils.scryRenderedComponentsWithType(
      developerList, DeveloperCard
    );

    expect(developerCards.length).to.equal(2)

    const searchInput = ReactTestUtils.findRenderedDOMComponentWithTag(
      search, "input"
    );

    searchInput.value = "vidal ekechukwu"
    ReactTestUtils.Simulate.change(searchInput)

    developerList = ReactTestUtils.renderIntoDocument(<DeveloperList/>);
    developerCards = ReactTestUtils.scryRenderedComponentsWithType(
      developerList, DeveloperCard
    );

    expect(developerCards.length).to.equal(1)
  });
});
