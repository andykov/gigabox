'use strict';

const path = require('path');
const del = require('del');
const browserSync = require('browser-sync').create();
const gulp = require('gulp');
// const pug = require('gulp-pug');
const postcss = require('gulp-postcss');
const sass = require('gulp-sass');
const autoprefixer = require("gulp-autoprefixer");
const cssnano = require('gulp-cssnano');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const inlineSVG = require('postcss-inline-svg');
const include = require("gulp-include");
const notify = require('gulp-notify');
const debug = require('gulp-debug');


var PATH = {
    SRC: {
        // PUG: [
        //     'src/pug/pages/*.pug'
        // ],
        HTML: [
            'src/html/*.html'
        ],
        SCSS: [
            'src/scss/**/*.scss'
        ],
        JS: [
            'src/scripts/**/*.js',
            // 'src/scripts/pages/*.js'
        ],
        IMG: [
            'src/images/**/*.{jpg,jpeg,gif,png}'
        ],
        SVG: [
            'src/images/svg/**/*.svg'
        ],
        FONTS: 'src/fonts/**'
    },
    BUILD: {
        HTML: 'build/',
        CSS: 'build/css/',
        JS: 'build/js/',
        IMG: 'build/img/',
        SVG: 'build/img/svg',
        FONTS: 'build/fonts/'
    },
    LIBS: {
        CSS: [ // порядок имеет значение!
            // 'node_modules/'
        ],
        JS_LIBS: [ // порядок имеет значение!
            // 'node_modules/
        ]
    },
    WATCH: {
        HTML: ['src/html/**/*.html'],
        SCSS: ['src/scss/**/*.scss'],
        JS: ['src/scripts/**/*.js'],
        IMG: ['src/images/**/*.{jpg,jpeg,gif,png}'],
        SVG: ['src/images/svg/*.svg']
    }
};

/*--------------------------------------------------------------
# CSS
--------------------------------------------------------------*/
gulp.task('scss', function () {
    console.log('---------- Обработка Less');
    return gulp.src('src/scss/**/*.scss')
    // .pipe(sourcemaps.init())
        .pipe(sass().on('error', notify.onError(function (err) {
            return {
                title: 'SCSS',
                message: err.message
            };
        })))
        .pipe(postcss([
            require('postcss-flexbugs-fixes'),
            require('postcss-inline-svg')
        ]))
        .pipe(autoprefixer({browsers: ['last 10 versions']}))
        // .pipe(cssnano())
        .pipe(debug({title: 'обработано SCSS файлов'}))
        // .pipe(sourcemaps.write())
        .pipe(gulp.dest(PATH.BUILD.CSS))
        .pipe(browserSync.stream());
});

/*--------------------------------------------------------------
# HTML
--------------------------------------------------------------*/
// gulp.task('pug', function () {
//     console.log('---------- Обработка PUG');
//     return gulp.src(PATH.SRC.PUG)
//         .pipe(pug({pretty: true}))
//         .on('error', notify.onError(function (err) {
//             return {
//                 title: 'PUG',
//                 message: err.message
//             };
//         }))
//         .pipe(gulp.dest(PATH.BUILD.HTML))
//         .pipe(browserSync.stream());
// });
gulp.task('html', function () {
    console.log('---------- Обработка HTML');
	return gulp.src([
        'src/html/*.html',
        'src/handler.php'
    ]).on('error', console.log)
        .pipe(gulp.dest(PATH.BUILD.HTML))
        .pipe(browserSync.stream({once: true}));
});
gulp.task('mailer', function () {
    console.log('---------- Перенос favicon');
    return gulp.src([
        'src/mailer/**/*.*',
        'src/mailer/*.*',
    ],  {base: 'src/mailer/'}).on('error', console.log)
        .pipe(gulp.dest('build/mailer'))
        .pipe(browserSync.stream({once: true}));
});

/*--------------------------------------------------------------
# Favicon
--------------------------------------------------------------*/
gulp.task('favicon', function () {
    console.log('---------- Перенос PHPmailer');
    return gulp.src([
        'src/favicon/**/*.*',
        'src/favicon/*.*',
    ],  {base: 'src/'}).on('error', console.log)
        .pipe(gulp.dest('build'))
        .pipe(browserSync.stream({once: true}));
});

/*--------------------------------------------------------------
# JS
--------------------------------------------------------------*/

// gulp.task('js:libs', function () {
//     console.log('---------- Обработка внешних JS файлов');
//     return gulp.src(PATH.LIBS.JS)
//       // .pipe(plumber({
//       //   errorHandler: function(err) {
//       //     notify.onError({
//       //       title: 'Javascript concat/uglify error',
//       //       message: err.message
//       //     })(err);
//       //     this.emit('end');
//       //   }
//       // }))
//       .pipe(concat('libs.js'))
//       .pipe(uglify())
//       .pipe(gulp.dest(PATH.BUILD.JS))
//       .pipe(browserSync.stream());
// });
// gulp.task('js:libs_allpage', function () {
//     console.log('---------- Обработка внешних JS файлов');
//     return gulp.src(PATH.LIBS.JS)
//     // .pipe(plumber({
//     //   errorHandler: function(err) {
//     //     notify.onError({
//     //       title: 'Javascript concat/uglify error',
//     //       message: err.message
//     //     })(err);
//     //     this.emit('end');
//     //   }
//     // }))
//         .pipe(concat('libs.js'))
//         .pipe(uglify())
//         .pipe(gulp.dest(PATH.BUILD.JS))
//         .pipe(browserSync.stream());
// });
gulp.task('js', function () {
    console.log('---------- Обработка JS проекта');
    return gulp.src(PATH.SRC.JS)
    // .pipe(plumber({
    //   errorHandler: function(err) {
    //     notify.onError({
    //       title: 'Javascript concat/uglify error',
    //       message: err.message
    //     })(err);
    //     this.emit('end');
    //   }
    // }))
    // .pipe(concat('main.js'))
        .pipe(include())
        .on('error', notify.onError(function (err) {
            return {
                title: 'PUG',
                message: err.message
            };
        }))
        .pipe(uglify())
        .pipe(gulp.dest(PATH.BUILD.JS))
        .pipe(browserSync.stream({once: true}));
});


/*--------------------------------------------------------------
# FONTS
--------------------------------------------------------------*/
gulp.task('fonts', function () {
    console.log('---------- Копирование шрифтов');
    return gulp.src(PATH.SRC.FONTS)
        .pipe(gulp.dest(PATH.BUILD.FONTS));
});


/*--------------------------------------------------------------
# Оптимизация и копирование изображений
--------------------------------------------------------------*/
// gulp.task('img', function () {
//     console.log('---------- Оптимизация картинок');
//     return gulp.src(PATH.SRC.IMG)
//       .pipe(imagemin({
//         progressive: true,
//         svgoPlugins: [{removeViewBox: false}],
//         use: [pngquant()]
//       })).on('error', notify.onError(function(err){
//             return {
//                 title: 'IMG',
//                 message: err.message
//             };
//       }))
//       .pipe(gulp.dest(PATH.BUILD.IMG));
// });

// gulp.task('sprite:svg', function () {

//       console.log('---------- Сборка SVG спрайта');
//       return gulp.src(PATH.SRC.SVG)
//         // .pipe(svgmin(function (file) {
//         //   return {
//         //     plugins: [{
//         //       cleanupIDs: {
//         //         minify: true
//         //       }
//         //     }]
//         //   }
//         // }))
//         .pipe(svgstore())
//         // .pipe(svgstore({ inlineSvg: true }))
//         .pipe(rename('sprite-svg.svg'))
//         // .pipe(size({
//         //   title: 'Размер',
//         //   showFiles: true,
//         //   showTotal: false,
//         // }))
//         .pipe(gulp.dest(PATH.BUILD.SVG));
// });
gulp.task('img', function () {
    console.log('---------- Копирование IMG');
    return gulp.src(PATH.SRC.IMG)
        .pipe(gulp.dest(PATH.BUILD.IMG));
});

gulp.task('svg', function () {
    console.log('---------- Копирование SVG');
    return gulp.src(PATH.SRC.SVG)
        .pipe(gulp.dest(PATH.BUILD.SVG));
});

/*--------------------------------------------------------------
# Remove folder build before starting build
--------------------------------------------------------------*/
gulp.task('clean', function () {
    console.log('---------- Очистка папки build');
    return del('build/');
});


/*--------------------------------------------------------------
# All task
--------------------------------------------------------------*/
gulp.task('build', gulp.series('clean',
    gulp.parallel('scss', 'html', 'mailer', 'js', 'img', 'svg', 'fonts', 'favicon'))
);


/*--------------------------------------------------------------
# Tracking changes files
--------------------------------------------------------------*/
gulp.task('serve', function () {
    browserSync.init({
        server: "build/"
    });

    // browserSync.init({
    //     proxy: "http://koshmarov.dev.rentride.ru/",
    //     port:      8080,
    //     open: 'external'
    // });
    gulp.watch(PATH.WATCH.HTML, gulp.series('html'));
    gulp.watch('src/**/*.php', gulp.series('mailer'));
    gulp.watch(PATH.WATCH.SCSS, gulp.series('scss'));
    gulp.watch(PATH.WATCH.JS, gulp.series('js'));
    gulp.watch(PATH.WATCH.IMG, gulp.series('img'));
    gulp.watch(PATH.WATCH.SVG, gulp.series('svg'));
    // gulp.watch('src/img/svg/icons/**/*', ['svgstore']);
    // gulp.watch(['src/img/**/*', '!src/img/svg/icons/**/*'], ['webp']);
    // gulp.watch('src/js/**/*', ['browserify']);
});

// gulp.task('default', gulp.parallel('serve'));

/*--------------------------------------------------------------
# Start building and watching files
--------------------------------------------------------------*/
gulp.task('default',
    gulp.series('build', gulp.parallel('serve'))
);