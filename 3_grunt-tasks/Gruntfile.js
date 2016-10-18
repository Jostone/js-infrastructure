'use strict';

module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);
  //grunt.loadNpmTasks('grunt-contrib-copy');
  //grunt.loadNpmTasks('grunt-contrib-connect');

  var gruntConfig = {
    copy: {
      jquery: {
        expand: true,
        cwd: 'bower_components/jquery/dist/',
        src: 'jquery.js',
        dest: 'app/scripts/'
      },

      all: {
        files: [
          {
            expand: true,
            cwd: 'bower_components/jquery/dist/',
            src: 'jquery.js',
            dest: 'app/scripts/'
          },
          {
            expand: true,
            cwd: 'bower_components/bootstrap/dist/js/',
            src: 'bootstrap.js',
            dest: 'app/scripts/'
          },
          {
            expand: true,
            cwd: 'bower_components/bootstrap/dist/css',
            src: 'bootstrap.css',
            dest: 'app/styles/'
          }
        ]
      }
    },

    connect: {
      options: {
        port: 9600,
        hostname: 'localhost',
        base: 'app',
        keepalive: true,
        open: true
      },

      serve: {
        options: {
          port: 9601
        }
      }
    },

    sass: {
      options: {
           sourceMap: true
       },
       dist: {
           files: {
               'app/styles/style.css': 'app/styles/style.scss'
           }
       }
    },

    concat: {
      options: {
        separator: ';',
      },
      js: {
        src: ['app/scripts/jquery.js', 'app/scripts/bootstrap.js', 'app/scripts/main.js'],
        dest: 'app/dist/awesomeapp.js',
      }
    },

    uglify: {
      awsommejs: {
        files: {
        'app/dist/awesomeapp.min.js': ['app/dist/awesomeapp.js']
        }
      }
    },

    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1
      },
      target: {
        files: {
          'app/styles/awsomecss.css': ['app/styles/bootstrap.css','app/styles/style.css']
        }
      }
    }
  };

  grunt.initConfig(gruntConfig);

  grunt.registerTask('dependencies', [
    'copy:all'
  ]);

  grunt.registerTask('run',[
    'copy:all',
    'sass',
    'concat',
    'uglify',
    'cssmin',
    'connect:serve'
  ]);
};
