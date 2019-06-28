import { FlexPlugin } from "flex-plugin";
import React from "react";
import MyCRMContainer from "./containers/MyCRMContainer";
import customReducer from "./reducers";
import { customDeleteTask } from "./actions";

const PLUGIN_NAME = "CustomStoreTaskFormPlugin";

export default class CustomStoreTaskFormPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   * @param manager { import('@twilio/flex-ui').Manager }
   */
  init(flex, manager) {
    // add custom store
    manager.store.addReducer("custom", customReducer);

    // replace CRMContainer
    flex.CRMContainer.Content.replace(
      <MyCRMContainer key="my-crm-container" />
    );

    // delete task in store after completing task
    flex.Actions.addListener("afterCompleteTask", payload => {
      manager.store.dispatch(customDeleteTask(payload.sid));
    });
  }
}
