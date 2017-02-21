// generated on 2017-02-02 using generator-webapp 2.2.0
const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const browserSync = require('browser-sync');
const del = require('del');
const wiredep = require('wiredep').stream;
const runSequence = require('run-sequence');

const $ = gulpLoadPlugins();
const reload = browserSync.reload;

gulp.task('styles', () => {
  return gulp.src('app/styles/*.scss')
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.sass.sync({
      outputStyle: 'expanded',
      precision: 10,
      includePaths: ['.']
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer({browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']}))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('.tmp/styles'))
    .pipe(reload({stream: true}));
});

gulp.task('templates', () => {
   return gulp.src('app/**/*.html')
    .pipe($.plumber())
    .pipe($.nunjucksRender({
      path: 'app/partials',
      envOptions: {
        tags: {
          variableStart: '<$',
          variableEnd: '$>'
        }
      }
    }))
    .pipe(gulp.dest('.tmp'))
    .pipe(reload({stream: true}));
});

gulp.task('scripts', () => {
  return gulp.src('app/scripts/**/*.js')
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.babel())
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('.tmp/scripts'))
    .pipe(reload({stream: true}));
});


gulp.task('html', ['templates','styles', 'scripts'], () => {
  return gulp.src('app/*.html')
    .pipe($.useref({searchPath: ['.tmp', 'app', '.']}))
    // .pipe($.if('*.js', $.uglify()))
    .pipe($.if('*.css', $.cssnano({safe: true, autoprefixer: false})))
    // .pipe($.if('*.html', $.htmlmin({collapseWhitespace: true})))
    .pipe(gulp.dest('dist'));
});

gulp.task('eol', () => {
  return gulp.src('app/**/*.{html,css,scss,js}')
    .pipe($.lineEndingCorrector({verbose:true, eolc: 'LF', encoding:'utf8'}))
    .pipe(gulp.dest('app'));
});

gulp.task('sprite', function () {
  const spriteData = gulp.src('app/images/sprites/icons/*.png')
    .pipe($.spritesmith({
      imgName: 'sprite.png',
      cssName: '_sprite.scss',
      imgPath: '../images/sprites/sprite.png',
      padding: 30
    }));
  spriteData.img.pipe(gulp.dest('.tmp/images/sprites'));
  spriteData.css.pipe(gulp.dest('app/styles/base'));
});

// gulp.task('sprite', function () {
//   const spriteData = gulp.src('app/images/sprites/*.png')
//     .pipe($.spritesmith({
//       imgName: 'sprite.png',
//       cssName: '_sprite.scss',
//       imgPath: '../images/sprites/sprite.png',
//       padding: 30,
//       cssTemplate: 'handlebarsInheritance.scss.handlebars'
//     }));
//   spriteData.img.pipe(gulp.dest('.tmp/images/sprites'));
//   spriteData.css.pipe(gulp.dest('app/styles/base'));
// });

gulp.task('images', () => {
  return gulp.src('app/images/**/*')
    .pipe($.cache($.imagemin()))
    .pipe(gulp.dest('dist/images'));
});

gulp.task('fonts', () => {
  return gulp.src(require('main-bower-files')('**/*.{eot,svg,ttf,woff,woff2}', function (err) {})
    .concat('app/fonts/**/*'))
    .pipe(gulp.dest('.tmp/fonts'))
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('extras', () => {
  return gulp.src([
    'app/*',
    '!app/*.html'
  ], {
    dot: true
  }).pipe(gulp.dest('dist'));
});

gulp.task('clean', del.bind(null, ['.tmp', 'dist']));

gulp.task('serve', () => {
  runSequence(['clean', 'wiredep'], ['templates', 'sprite', 'styles', 'scripts', 'fonts'], () => {
    browserSync({
      notify: false,
      port: 9000,
      server: {
        baseDir: ['.tmp', 'app'],
        routes: {
          '/bower_components': 'bower_components'
        }
      }
    });

    gulp.watch([
      // 'app/*.html',
      '.tmp/fonts/**/*'
    ]).on('change', reload);

    gulp.watch('app/**/*.html', ['templates']);
    gulp.watch('app/images/**/*', ['sprite']);
    gulp.watch('app/styles/**/*.scss', ['styles']);
      gulp.watch('app/scripts/**/*.js', ['scripts']);
      gulp.watch('app/fonts/**/*', ['fonts']);
    gulp.watch('bower.json', ['wiredep', 'fonts']);
  });
});

gulp.task('serve:dist', () => {
  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['dist']
    }
  });
});

gulp.task('serve:test', ['scripts'], () => {
  browserSync({
    notify: false,
    port: 9000,
    ui: false,
    server: {
      baseDir: 'test',
      routes: {
        '/scripts': '.tmp/scripts',
        '/bower_components': 'bower_components'
      }
    }
  });

  gulp.watch('app/scripts/**/*.js', ['scripts']);
  gulp.watch(['test/spec/**/*.js', 'test/index.html']).on('change', reload);
  gulp.watch('test/spec/**/*.js', ['lint:test']);
});

// inject bower components
gulp.task('wiredep', () => {
  gulp.src('app/styles/*.scss')
    .pipe(wiredep({
      ignorePath: /^(\.\.\/)+/
    }))
    .pipe(gulp.dest('app/styles'));

  gulp.src('app/*.html')
    .pipe(wiredep({
      ignorePath: /^(\.\.\/)*\.\./
    }))
    .pipe(gulp.dest('app'));
});

gulp.task('build', ['html', 'images', 'fonts', 'extras'], () => {
  return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
});

gulp.task('default', () => {
  runSequence(['clean', 'wiredep'], 'build');
});
