# CatarseIugu v. 0.1

Iugu integration with [Catarse](http://github.com/danielweinmann/catarse) crowdfunding platform. 

## Installation

Add this lines to your Catarse application's Gemfile under the payments section:

    gem 'catarse_iugu'
    gem 'iugu'

And then execute:

    $ bundle
    
## Usage

Configure the routes for your Catarse application. Add the following lines in the routes file (config/routes.rb):

    mount CatarseIugu::Engine => "/", :as => "catarse_iugu"

### Configurations  


### Authorization

## Development environment setup

Clone the repository:

    $ git clone git://github.com/mrodrigues/catarse_iugu.git

And then execute:

    $ bundle

## Troubleshooting in development environment

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request


This project rocks and uses MIT-LICENSE.
