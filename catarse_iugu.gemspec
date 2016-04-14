$:.push File.expand_path("../lib", __FILE__)

# Maintain your gem's version:
require "catarse_iugu/version"

# Describe your gem and declare its dependencies:
Gem::Specification.new do |s|
  s.name        = "catarse_iugu"
  s.version     = CatarseIugu::VERSION
  s.authors     = ["mrodrigues"]
  s.email       = ["mrodrigues.uff@gmail.com"]
  s.homepage    = "http://github.com/mrodrigues/catarse_iugu"
  s.summary     = "Iugu Payments Integration with Catarse."
  s.description = "Iugu Payments Integration with Catarse crowdfunding platform."

  s.files      = `git ls-files`.split($\)
  s.test_files = s.files.grep(%r{^(test|spec|features)/})

  s.add_dependency "rails", "~> 4.1"
  s.add_dependency "iugu"
  s.add_dependency "slim-rails"

  s.add_development_dependency "pry"
  s.add_development_dependency "rspec-rails"
  s.add_development_dependency "factory_girl_rails"
  s.add_development_dependency "database_cleaner"
end
