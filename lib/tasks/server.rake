desc 'Start the Rails test server'
task :test_server do
  ENV['RAILS_ENV'] = 'test'
  exec('bundle exec rails server --pid=tmp/pids/test-server.pid --port=3333')
end