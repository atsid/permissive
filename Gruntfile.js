"use strict";

module.exports = function (grunt) {

    grunt.initConfig({
        jshint: {
            src: ['**/*.js', '!node_modules/**/*.*'],
            options: {
                jshintrc: '.jshintrc'
            }
        },
        watch: {
            js: {
                files: ['**/*.js', '!**/node_modules/**'],
                tasks: ['lint', 'test', 'karam:unit:run']
            }
        },
        mochaTest: {
            test: {
                src: ['app/server/test/**/Test*.js'],
                options: {
                    reporter: 'spec'
                }
            }
        },
        karma: {
            unit: {
                background: true,
                singelRun: false,
                files: [{
                    src: 'app/client/test/**/Test*.js'
                }]
            }
        }
    });

    require('load-grunt-tasks')(grunt);
    
    grunt.registerTask('default', ['mochaTest']);
    grunt.registerTask('lint', ['jshint']);
    grunt.registerTask('start', ['watch']);

};
