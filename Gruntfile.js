module.exports = function( grunt ) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jscs: {
      src: 'index.js',
      options: {
        config: '.jscsrc'
      }
    },
    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: [ 'test/test.js' ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-jscs');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.registerTask( 'default', [ 'jscs', 'mochaTest' ] );
};
