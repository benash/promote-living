## Major tech pieces

* [Rails](rubyonrails.org)
* [React](facebook.github.io/react)
* [Gulp](gulpjs.com)
* [Semantic UI](semantic-ui.com)
* [Heroku](heroku.com)

## Dev setup

First, install [homebrew](brew.sh) and a Ruby version manager like [rbenv](github.com/rbenv/rbenv). Then:

```sh
brew install node postgres heroku-toolbelt
git clone promote-living
cd promote-living
bundle
bundle exec rake db:create
npm install
gulp
```
