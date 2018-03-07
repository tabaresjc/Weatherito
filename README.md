# Weatherito (AngularJS)

Single Page application (SPA) based on Angular JS 1.x for a simple yet fun weather application.

## Getting Started

### Prerequisites

1. Node.js and NPM: Instruction may differ for every OS, so find the solution that fits your OS.
2. Bower & Gulp
```bash
# the following command will install bower and gulp
$ npm install -g bower gulp-cli

# check that bower was properly installed (optional)
$ bower -v

# check that gulp was properly installed (optional)
$ gulp -v
```


3. Git: to be able to clone this project and push changes into this repo.

### Installing
1. Clone this repository `$ git clone <path to repository>` and `$ cd` into it
2. run `$ npm install`
```bash
# this should install every dependency described in package.json
$ npm install

# this will install every dependency described in bower.json
$ bower install
```
### Configuration

To setup the environment in development mode save the file `resources/config-sample.json` as `resources/config.dev.json` and change the relevant values.

When building the project for production mode save the file `resources/config-sample.json` as `resources/config.dist.json` and change the relevant values.

When building the project for testing mode save the file `resources/config-sample.json` as `resources/config-test.json` and change the relevant values.

```json
{
	"app_debug": "APP_DEBUG",
	"app_name": "APP_NAME",
	"api_url": "API_URL",
	"display_name": "DISPLAY_NAME"
}
```

| Fields| Value |
| --------------------------- |-----------------------|
| app_debug| set "1" to debug the application |
| app_name| the name for the Angular module |
| api_url | the url path to the api, it can be relative or include the scheme and port i.e. (http://localhost:8060/api/). This parameter is ignored for test environemnt |
| display_name | Name to be shown as a title of the application |

### Tasks

- `dev`: fetch the dependencies and prepare the enviroment in development mode
```bash
# make sure to create the resources/config.dev.json (See Configuration)
$ npm run dev
```

- `serve`: launch a local webserver on port 9000, and watch for changes in the source code
```bash
$ npm run serve
```

Once the above command is entered, the site will be avalaible at http://localhost:9000/

if for some reason this command failed made sure that
1. You have properly setup the configuration file
2. There is no other process running at the same port in which case change the value of `app.port` at `package.json`

- `build`: Build step, which involves compilation, minification and other optimizations to prepare a package targeted specifically for production environment.
```bash
# make sure to create the resources/config.dist.json (See Configuration)
$ npm run build
```
You should be able to see the result of the compilation in `dist` folder.

- `test`: run the unit tests & generate the relevant test reports

```bash
# make sure to create the resources/config-test.json (See Configuration)
$ npm run test
```

## Project Structure

- `app` : contains the source code that powers the application
- `bower_components` : contains all the dependencies as defined in `bower.json`
- `dist` : contains an optimized version of all the code written in **app** folder along with those projects required with Bower. Its main purpose is toe be deployed on the production environment.
- `node_modules` : contains third party projects required by grunt
- `resources` : contains support files that will be used when running any of the tasks supported by this project.
- `test` : define the unit tests and specification of the project. You can find the coverage result.
- `.bowerrc` : Local rules for bower
- `.editorconfig` : Local rules for the editor
- `.gitattributes` : define attributes per file types that should be followed by **git** during a commit
- `.gitignore` : List of ignored files & folders by **git**
- `.jscsrc` : Local rules for **jscs**
- `.jshintrc` : Local rules for **jshint**
- `bower.json` : Configuration file for **Bower**, with list of dependencies required by the web application
- `gulpfile.js` : Define the **Gulp** tasks
- `package.json` : Contains several entries that will define the list of dependencies, the tasks of the project, define the browsers supported by this application.
