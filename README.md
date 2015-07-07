## Acumen GSA Agile Prototype

### Background

OpenFDA launched in Beta mode on June 2, 2014, at https://open.fda.gov. It features an open user community for sharing open source code, examples, and ideas. By September 2014, medical device reports, enforcement reports, and drug adverse event reports were available, and every mention of a drug in those reports was automatically augmented with full data from various drug datasets, including codes and label information. In addition, there were over 4.5 million data calls, over 40,000 visitors to openFDA from all over the world, dozens of press articles, and several websites that use openFDA in their own public offerings.

The FDA is launching its very first openFDA challenge to the developer community to take advantage of certain datasets and explore the range and extent of its impact for 1) research and 2) consumers.

-Adverse events data. FDA’s publicly available drug adverse event and medication error reports, and medical device adverse event reports.

-Recalls data. Enforcement report data, containing information gathered from public notices about certain recalls of FDA-regulated products.

-Labeling data. Structured Product Labeling (SPL) data for FDA-regulated human prescription drug, OTC drug and biological product labeling.

### Acumen Solutions's Search Recall Web App

Acumen Solutions Web App, Called FDA Food Recalls leverages the openFDA API for the Food data sets. Acumen's team decided to use the Food data sets of the API, instead of the Drug data sets, in order to present a robust solution while demonstrating it's agile capacity in the short period available for prototyping.

#### Approach

Since Mobile devices continue to grow in popularity year after year, and current analysis predicts that global mobile data traffic will increase nearly 11-fold between 2013 and 2018 (http://goo.gl/xlVQfz). The need to have a responsive web app is becoming increasingly important. The Acumen team looked at foundations and frameworks that support modern Web 3.0 websites that are flexible enough for customization and growth, especially in an Agile environment. Among all the available CSS frameworks out there, Bootstrap has been chosen because of the following reasons:

Reason #1. Platform agnostic: Easy to get started, faster coding

CSS Pre-processing is great and every front end developer should learn it. However not everyone is using it. There are still many designers creating and managing CSS files the same old way. Bootstrap offers LESS files for those who know how to use it, but also provides the plain old CSS file for those who don’t want to use CSS pre-processing.

To take advantage of what Bootstrap has to offer, a developer just has to download the files from Bootstrap on Github and after unzipping, include the files in the head of any HTML document.

Reason #2. Cross broswer Compatibility: Great grid system for any device size

Bootstrap is built on responsive 12-column grids, layouts and components. Whether the design calls for a fixed grid or a responsive one, its only matter of a few changes. Offsetting & Nesting of columns is also possible in both fixed and fluid width layouts.

Another useful set of features are the responsive utility classes using which a developer can make a certain block of content appear or hide only on devices based on the size of their screen. This customization possibility is very handy when a developer wants to hide some content based on screen size. Adding a class such as .visible-desktop to an element, will make it visible only for desktop users. There are similar classes for tablets and phones.

Reason #3. Base styling for most HTML elements

A website has many different elements such as headings, lists, tables, buttons, forms, etc. All these fundamental HTML elements have been styled and enhanced with extensible classes. The HTML elements for which styles are provided are:

Typography
Code
Tables
Forms
Buttons
Images
Icons

Reason #4. Extensive list of components

Styling of every single element follows a consistent theme and takes just few minutes. Some of the components pre-styled are:

Dropdowns
Button Groups
Navigation Bar
Breadcrumbs
Labels & Badges
Alerts
Progress Bar
And many others.

Reason #5. Bundled Javascript plugins

The components such as drop down menu are made interactive with the numerous JavaScript plugins bundled in the bootstrap package. If a project requires sliders, tabs, accordions, then a developer no longer has to try and test numerous different plugins across the web. Adding these functionalities is just a matter of adding few lines of code. 

Reason #6. Good documentation and Support Community

Not only does Bootstrap offer styling for almost every element a typical website or web application requires, it also provides a great documentation with examples and demo that only make it more easier for even someone new.

Using Angularjs:
<Approach and justication here>

Other framweworks:

### Prerequisites

[Node.js](https://nodejs.org/download/)

[Heroku Toolbelt](https://toolbelt.heroku.com)

[Bower](http://bower.io/)

[Gulp](http://gulpjs.com/)

#### Installation
1. Sign-up for an API key from the [Open FDA API](https://open.fda.gov)
2. Clone the repository `git clone https://github.com/AcumenSolutions/acumen-gsa-agile-prototype.git'
3. Install node dependencies `sudo npm install`
4. Install bower dependencies `bower install`
5. Build all dependencies and static files `gulp build`

#### Local configuration
1. Store your API key locally `export OpenFDAAPIKey=<your api key>`
2. Launch the application `npm start`

#### Heroku configuration
[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

#### Or deploy manually

1. Create a new app on Heroku `heroku create <project name>`
2. Set your API in the Heroku config `heroku config:set OpenFDAAPIKey=<your api key>`
3. Deploy the application to Heroku  `git push heroku master`

### Usage

1. In a web browser navigate to the application url ([http://localhost:3000](http://localhost:3000) or [http://`<project name>`.herokuapp.com](http://`<project name>`.herokuapp.com))
2. Select a recall category
3. Choose a state for which you'd like to view recalls
4. (Optional) Enter product keywords to find a particular recall.
5. Click Search
6. Select a result to view detailed information about the recall

### Runing Unit Tests

Run the command `gulp test` to run both client and server side tests.
If you want to run just the client tests, run `gulp test:client`, and for just server tests run `gulp test:server`.

### Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request

### License

TODO: Write license