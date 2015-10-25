module.exports = function( grunt ) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      options: {
        jshintrc: true
      },
      src: [ 'lib/**/*.js' ]
    },
    jscs: {
      src: [ 'lib/**/*.js' ],
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

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jscs');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.registerTask( 'default', [ 'jshint', 'jscs', 'mochaTest' ] );
};
