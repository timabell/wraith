# Wraith

 * Website: http://responsivenews.co.uk
 * Source: http://github.com/bbc-news/wraith

Wraith is a screenshot comparison tool, created by developers at BBC News.

This version just includes custom changes done by ecometrica to test OurImpacts.

## What is it?

Wraith uses either [PhantomJS](http://phantomjs.org) or
[SlimerJS](http://slimerjs.org) to create screenshots of different environments
and then creates a diff of the two images, the affected areas are highlighted in
blue

![Photo of BBC News with a
diff](http://bbc-news.github.io/wraith/images/320_diff.png)


## Requirements

On Ubuntu Lucid, you will need to apt-get the following packages:

* libicu-dev
* imagemagick
* rake

And then download the PhantomJS binary package from
[http://phantomjs.org/](http://phantomjs.org/).

On Mac OS X, the install script will install PhantomJS & ImageMagick for you, 
assuming you have [homebrew](http://brew.sh) installed, otherwise it'll tell
you to install them.

## Installation

```sh
curl -fsSL https://raw.github.com/bbc-news/wraith/go | bash
```


## Config

All config will be placed in config.yml. You can specify domains, paths, screen
widths & HTTP headers.

```yaml
# Add only 2 domains, key will act as a label
domains:
  uk: "http://google.com"
  france: "http://google.fr"

#Type screen widths below, here are a couple of examples
screen_widths:
  - 320
  - 600
  - 768
  - 1024
  - 1280

#Type page URL paths below, here are a couple of examples
paths:
  search_page: /imghp
  map_page: /maps
```

## Passwords

oh_snap.js will look for passwords.json containing the following structure:

{
    "ssl_username": Your SSL username,
    "ssl_password": Your SSL password,
    "username": The App Username,
    "password": The App Password
}

## Using Wraith

```sh
rake
```
## Output

After each screenshot is captured, the compare task will run, this will output a diff.png and a data.txt.  The data.txt for each file will show the number of pixels that have changed.  There is a main data.txt which is in Wraiths root that will combine all of these values to easier view all the pixel changes.

## Contributing

If you want to add functionality to this project, pull requests are welcome.

 * Create a branch based off master and do all of your changes with in it.
 * If it you have to pause to add a 'and' anywhere in the title, it should be two pull requests.
 * Make commits of logical units and describe them properly
 * Check for unnecessary whitespace with git diff --check before committing.
 * If possible, submit tests to your patch / new feature so it can be tested easily.
 * Assure nothing is broken by running all the test
 * Please ensure that it complies with coding standards.

**Please raise any issues with this project as a GitHub issue.**


## Licence

Wraith is available to everyone under the terms of the MIT open source
licence. Take a look at the LICENSE file in the code.


## Credits

 * [Dave Blooman](http://twitter.com/dblooman)
 * [John Cleveley](http://twitter.com/jcleveley)
 * [Simon Thulbourn](http://twitter.com/sthulbourn)

