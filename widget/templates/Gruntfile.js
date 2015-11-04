module.exports = function(grunt) {
  grunt.initConfig({
    clean: {
      main: ['.tmp*']
    },
    transport: {
      js: {
        options: {
          paths: ['build'],
          alias: {
            '$': 'jquery/jquery/2.1.0/jquery'
          }
        },
        files: [{
          expand: true,
          cwd: 'src',
          src: '**/*.js',
          dest: '.tmp1'
        }]
      }
    },
    concat: {
      js: {
        options: {
          include: 'relative'
        },
        files: [{
          expand: true,
          cwd: '.tmp1',
          src: '**/*.js',
          filter: function(filepath) {
            return !/-debug\.js$/.test(filepath);
          },
          dest: '.tmp2'
        }]
      }
    },
    uglify: {
      js: {
        files: [{
          expand: true,
          cwd: '.tmp2',
          src: '**/*.js',
          dest: 'build'
        }]
      }
    }
  });

  grunt.loadNpmTasks('grunt-cmd-transport');
  grunt.loadNpmTasks('grunt-cmd-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.registerTask('default', ['clean', 'transport', 'concat', 'uglify', 'clean']);
};