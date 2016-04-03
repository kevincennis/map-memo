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
    mocha_istanbul: {
      test: {
        src: 'test/test.js',
        options: {
          reportFormats: [ 'html' ],
          check: {
            lines: 100,
            statements: 100,
            branches: 100,
            functions: 100
          },
          print: 'detail'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jscs');
  grunt.loadNpmTasks('grunt-mocha-istanbul');
  grunt.registerTask( 'default', [ 'jshint', 'jscs', 'mocha_istanbul' ] );
};
