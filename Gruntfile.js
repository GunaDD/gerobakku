module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        meta: {
            banner:
            '/* \n'+
            ' * Leaflet Control GPS v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> \n'+
            ' * \n'+
            ' * Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author.name %> \n'+
            ' * <%= pkg.author.email %> \n'+
            ' * <%= pkg.author.url %> \n'+
            ' * \n'+
            ' * Licensed under the <%= pkg.license %> license. \n'+
            ' * \n'+
            ' * Demos: \n'+
            ' * <%= pkg.homepage %> \n'+
            ' * \n'+
            ' * Source: \n'+
            ' * <%= pkg.repository.url %> \n'+
            ' * \n'+
            ' */\n'
        },
        clean: {
            dist: {
                src: ['dist/*']
            }
        },
        jshint: {
            options: {
                globals: {
                    console: true,
                    module: true
                },
                "-W099": true, 
                "-W033": true,
                "-W044": true   
            },
            files: ['src/*.js']
        },
        concat: {
            options: {
                banner: '<%= meta.banner %>'
            },
            dist: {
                files: {
                    'dist/leaflet-gps.src.js': ['src/leaflet-gps.js'],            
                    'dist/leaflet-gps.src.css': ['src/leaflet-gps.css']
                }
            }
        },
        copy: {
            images: {
                src: 'images/gps-icon.png',
                dest: 'dist/gps-icon.png'
            }
        },
        uglify: {
            options: {
                banner: '<%= meta.banner %>'
            },
            dist: {
                files: {
                    'dist/leaflet-gps.min.js': ['dist/leaflet-gps.src.js']
                }
            }
        },
        cssmin: {
            combine: {
                files: {
                    'dist/leaflet-gps.min.css': ['src/leaflet-gps.css']
                }
            },
            options: {
                banner: '<%= meta.banner %>'
            },
            minify: {
                expand: true,
                cwd: 'dist/',
                files: {
                    'dist/leaflet-gps.min.css': ['src/leaflet-gps.css']
                }
            }
        },
        watch: {
            dist: {
                options: { livereload: true },
                files: ['src/*'],
                tasks: ['clean','concat','cssmin','jshint', 'copy']
            }       
        }
    });

    grunt.registerTask('default', [
        'clean',
        'copy',
        'concat',    
        'cssmin',
        'jshint',
        'uglify'
    ]);

};
