module.exports = function(grunt) {
//load up all of the necessary grunt plugins

grunt.loadNpmTasks('grunt-contrib-clean');
grunt.loadNpmTasks('grunt-contrib-copy');
grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-jshint');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-express-server');
grunt.loadNpmTasks('grunt-karma');
// grunt.loadNpmTasks('grunt-casperjs');
grunt.loadNpmTasks('grunt-mocha');
// grunt.loadNpmTasks("grunt-mocha-chai-sinon");

  var clientIncludeOrder = require('./include.conf.js');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean: {
      dist: 'dist/*',
    },

    jshint: {
      gruntfile: 'Gruntfile.js',
      client: clientIncludeOrder,
      server: 'server/**/*.js',
      options: {
        globals: {
          eqeqeq: true
        }
      }
    },

    uglify: {
      client: {
        files:{
          'dist/client/scripts/uglify.min.js': clientIncludeOrder
        }  
      }
    },

    copy: {
      // create a task for client files
      client: {
        // Copy everything but the to-be-concatenated client JS files
        src: [ 'client/**', '!client/app/**' ],
        dest: 'dist/'
      },
      // create a task for server files
      server: {
        src: [ 'server/**', './index.js' ],
        dest: 'dist/'
      }
    },

    // concat all the js files
    concat: {
      client: {
        files: {
          // concat all the client js files into one file
          'dist/client/scripts/concat.js': clientIncludeOrder
        }
      }
    },

    // configure the server
    express: {
      dev: {
        options: {
          script: 'dist/index.js'
        }
      }
    },

    // configure karma
    karma: {
      options: {
        configFile: 'karma.conf.js',
        reporters: ['progress', 'coverage']
      },
      // Watch configuration
      watch: {
        background: true,
        reporters: ['progress']
      },
      // Single-run configuration for development
      single: {
        singleRun: true,
      },
      // Single-run configuration for CI
      ci: {
        singleRun: true,
        coverageReporter: {
          type: 'lcov',
          dir: 'results/coverage/'
        }
      }
    },

    watch: {
      gruntfile: {
        files: 'Gruntfile.js',
        tasks: 'jshint:gruntfile'
      },
      client: {
        files: [ 'client/**' ],
        tasks: [ 'build']
      },
      server: {
        files: [ 'server/**' ],
        tasks: [ 'build'],
        options: {
          spawn: false // Restart server
        }
      },
      unitTests: {
        files: [ 'specs/**/*.js' ],
        tasks: [ 'karma:watch:run' ]
      },
    }  

  });

  // Perform a build
  grunt.registerTask('build', [ 'jshint', 'clean', 'copy', 'uglify', 'concat']);

  grunt.registerTask('default', [ 'build', 'express:dev', 'karma:watch:start', 'watch']);

  grunt.registerTask('testClient', [ 'karma:single' ]);
};
