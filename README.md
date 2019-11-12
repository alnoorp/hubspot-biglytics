Vast 2.0 - aka Sass
========================

A website theme built off of the [CMS theme boilerplate](https://github.com/HubSpot/cms-theme-boilerplate)

## Getting Started

It is recommended that you create a new portal for testing the cms-website-theme. If you would like to use an existing portal to test the cms-website-theme, please ensure that you ungate your portal for the gates listed in step three under "Creating and Setting Up Your Portal". When uploading the Theme Project to your portal, you'll be using the CLI. To learn more about the CLI/local development tools, please reference our documentation [here](https://designers.hubspot.com/docs/tools/local-development). 

### Creating and Setting Up Your Portal

1.) Go to Atlas:
QA: https://private.hubteamqa.com/atlas/hubs/my
PROD: https://private.hubteam.com/atlas/hubs/my

2.) Create a new CMS portal by clicking on "Create Internal Test Hub"

3.) Use the gating manager ([link for QA](https://tools.hubteamqa.com/gates/gates)/[link for PROD](https://tools.hubteam.com/gates/gates)) to ungate your portal for the following gates:
* CMS:Themes
* CMS:Themes:GlobalSettings
* CMS:Themes:Settings
* ContentEditorUI:GlobalPartialAccess
* CMS:GlobalContentEditor
* cos_renderer_global_content_rendering
* DesignManager:RawAssets
* ContentEditorUI:BaymaxEditor
* ContentRendering:WidgetTagFullInterpret

### Downloading the Theme Project Folder

1.) Download this repository to your computer by either clicking on "Clone or download" in the top right hand corner of the repository and clicking on "Download ZIP" in the dropdown or by cloning the repository via the CLI using `git clone git@git.hubteam.com:HubSpot/cms-website-theme.git`. 

### Uploading the Theme Project Folder to Your Portal

1.) Before using the CLI to upload the theme to your portal, you'll need to download a couple of [required dependencies](https://designers.hubspot.com/docs/tools/local-development#install-dependencies). The first depdency would be [Node.js](https://nodejs.org/en/). Versions 8.9.1 or higher of Node are supported, but the long-term support (LTS) version is recommended. The second dependency would be the HubSpot CLI tools. This can be downloaded globally by running `npm install -g @hubspot/cms-cli` or in your current directory by running `npm install @hubspot/cms-cli`. 

2.) Create a `hubspot.config.yml` file in the folder that you downloaded and [configure](https://designers.hubspot.com/docs/tools/local-development#2-set-up-your-configuration-file) the file so that you can upload files to the HubSpot portals that you want to use.

3.) In the CLI, navigate to the directory where the repository was downloaded. 

4.) Run `npx hs watch --portal=<portal> src <directory>` to upload all the files in the cms-theme-project and [watch for changes](https://designers.hubspot.com/docs/tools/local-development-reference#watch) to files in the `src` directory.
