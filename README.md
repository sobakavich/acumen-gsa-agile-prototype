# Acumen GSA Agile Prototype

TODO: Write a project description

## Prerequisites 

[Node.js](https://nodejs.org/download/)

[Heroku Toolbelt](https://toolbelt.heroku.com)

## Installation
1. Clone the repository `git clone https://github.com/AcumenSolutions/acumen-gsa-agile-prototype.git'
2. Install node dependencies `sudo npm install`
3. Sign-up for an API key from the [Open FDA API](https://open.fda.gov)

### Local configuration
1. Store your API key locally `export OpenFDAAPIKey=<your api key>`
2. Launch the application `npm start`

### Heroku configuration
[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

#### Or deploy manually 

1. Create a new app on Heroku `heroku create <your project name>`
2. Set your API in the Heroku config `heroku config:set OpenFDAAPIKey=<your api key>`
3. Deploy the application to Heroku  `git push heroku master` 

## Usage

TODO: Write usage instructions

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request

## License

TODO: Write license