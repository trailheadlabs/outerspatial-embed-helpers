module.exports = function (grunt) {
  var pkg = require('./package.json');
  var s3;

  try {
    s3 = grunt.file.readJSON('./s3.json');
  } catch (e) {
    s3 = grunt.file.readJSON('./s3.sample.json');
  }

  grunt.util.linefeed = '\n';
  grunt.initConfig({
    clean: {
      dist: {
        src: [
          'dist/**/*'
        ]
      }
    },
    copy: {
      'iframe-parent-utilities': {
        dest: 'dist/iframe-parent-utilities.js',
        src: 'src/iframe-parent-utilities.js'
      },
      'load-builder-map': {
        dest: 'dist/load-builder-map.js',
        src: 'src/load-builder-map.js'
      }
    },
    pkg: pkg,
    s3: s3,
    semistandard: {
      src: [
        'src/**/*.js'
      ]
    },
    uglify: {
      all: {
        cwd: 'dist/',
        expand: true,
        dest: 'dist/',
        ext: '.min.js',
        src: [
          '**/*.js',
          '!*.min.js'
        ]
      }
    },
    usebanner: {
      dist: {
        options: {
          banner: '/**\n * OuterSpatial Embed Helpers <%= pkg.version %>\n * Built on <%= grunt.template.today("mm/dd/yyyy") %> at <%= grunt.template.today("hh:MMTT Z") %>\n * Copyright <%= grunt.template.today("yyyy") %> Trailhead Labs\n * Licensed under ' + pkg.licenses[0].type + ' (' + pkg.licenses[0].url + ')\n */',
          position: 'top'
        },
        files: {
          src: [
            'dist/*.js'
          ]
        }
      }
    }
  });
  Object.keys(pkg.devDependencies).filter(function (moduleName) {
    return /(^grunt-)/.test(moduleName);
  }).forEach(function (task) {
    grunt.loadNpmTasks(task);
  });
  grunt.registerTask('build', [
    'clean:dist',
    'copy:iframe-parent-utilities',
    'copy:load-builder-map',
    'uglify',
    'usebanner'
  ]);
  grunt.registerTask('deploy', [
    's3:dist'
  ]);
  grunt.registerTask('lint', [
    'semistandard'
  ]);
};
