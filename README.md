# Flex Plugin - Custom Store Sample

*(Tested on Flex UI v1.11.0)*

**Purpose**: demonstrate how to implement a custom store along side the native Flex store.

**Scenario**: Agents in a multitasking environment that don't want to lose unsaved work when switching to another task. When coming back to the original task, information in the store can be retrieved. 

**How it works:**
- reducers/index.js - reducer
- actions/index.js - actions
- components/*.js - form ui components

- CustomStoreTaskFormPlugin.js
  - `manager.store.addReducer()` adds our custom store and reducer
  - `flex.CRMContainer.Content.replace()` replaces the default CRMContainer with our custom version
  - `flex.Actions.addListener()` removes tasks from custom store when completed

- containers/MyCRMContainer.js
  - Contains a simple form to collect task information (name, email, notes).
  - When a task is selected, the form is displayed to the agent. 
    - If the task selected exists in store, values are loaded into state; Else, use default/empty state.
    - If the agent navigates to another task or view, local form state is persisted to the custom store.
  - After submitting the form, Flex Action 'CompleteTask' is invoked to complete the task

- Custom Store Structure:
  - task/form information is keyed by the Task Sid
    ```{ 
        flex: {...}, 
        custom: { 
           WR12345: { 
                name: "John Smith",
                email: "john@smithco",
                notes: "Customer experiencing issue with recent order #12345" 
            }
       }
    }```



# Your custom Twilio Flex Plugin

Twilio Flex Plugins allow you to customize the apperance and behavior of [Twilio Flex](https://www.twilio.com/flex). If you want to learn more about the capabilities and how to use the API, check out our [Flex documentation](https://www.twilio.com/docs/flex).

## Setup

Make sure you have [Node.js](https://nodejs.org) as well as [`npm`](https://npmjs.com) installed.

Afterwards install the dependencies by running `npm install`:

```bash
cd 

# If you use npm
npm install
```

## Development

In order to develop locally, you can use the Webpack Dev Server by running:

```bash
npm start
```

This will automatically start up the Webpack Dev Server and open the browser for you. Your app will run on `http://localhost:8080`. If you want to change that you can do this by setting the `PORT` environment variable:

```bash
PORT=3000 npm start
```

When you make changes to your code, the browser window will be automatically refreshed.

## Deploy

Once you are happy with your plugin, you have to bundle it, in order to deply it to Twilio Flex.

Run the following command to start the bundling:

```bash
npm run build
```

Afterwards, you'll find in your project a `build/` folder that contains a file with the name of your plugin project. For example `plugin-example.js`. Take this file and upload it into the Assets part of your Twilio Runtime.

Note: Common packages like `React`, `ReactDOM`, `Redux` and `ReactRedux` are not bundled with the build because they are treated as external dependencies so the plugin will depend on Flex which would provide them globally.