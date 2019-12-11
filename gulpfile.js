var gulp = require('gulp');                 // Подключен gulp
var rename = require('gulp-rename');        // Подключен rename
var sass = require('gulp-sass');            // Подключен SASS
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var sourcemaps = require('gulp-sourcemaps');

function runTask(done) {
    gulp.src('./src/scss/**/*.scss')        // ** - все папки, * - все файлы
        .pipe(sourcemaps.init())        // запускаем sourcemaps
        .pipe(sass({                    // SASS выдает ошибки в консоль + компрессия стилей
            errorLogToConsole: true,
            outputStyle: 'compressed'
        }))
        .on('error', console.error.bind(console))
        .pipe(autoprefixer())
        //.pipe(rename({suffix: '.min'}))     // Добавляем суффикс минимизированного файла
        .pipe(sourcemaps.write('./'))       // записываем sourcemaps
        .pipe(gulp.dest('./public/css/'))
        .pipe(browserSync.stream());         // берем файл .SCSS и копируем в папку CSS
    done();
}

function browserReload(done) {
    browserSync.reload();
    done()
}

function runBrowserSync(done) {
    browserSync.init({
        server: {
            baseDir: './'
        },
        port: 3000
    });
    done()
}

function watchTasks() {
    gulp.watch('./src/scss/**/*', runTask);       // Следим за изменениями в файлах в первом аргументе, во втором
    // выполняем ф-ию
    gulp.watch('./**/*.html', browserReload);
    gulp.watch('./**/*.js', browserReload);
}

gulp.task('default', gulp.parallel(runBrowserSync, watchTasks));

//  свойство pipe() - аналог then, т.е. выполнится тогда,когда выполнится предидущая ф-ия.

//gulp.task(printTask);                         Выполняем задачу (способ 1)
// Или exports.printTask = printTask;           Выполняем задачу (способ 2 Gulp 4)

//gulp.task('default', defaultTask);            Выполняем задачу №2 по дефолту (способ 1)
// или exports.default = defaultTask;           Выполняем задачу №2 по дефолту (способ 2 Gulp 4)
