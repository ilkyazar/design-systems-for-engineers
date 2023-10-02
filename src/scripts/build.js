const Fs = require('fs')
const Path = require('path')
const Sass = require('node-sass')

const compile = (path, fileName) => {
    const result = Sass.renderSync({
        data: Fs.readFileSync(
            Path.resolve(path) // 'src/global.scss'
        ).toString(),
        outputStyle: 'expanded',
        outFile: 'global.css',
        includePaths: [Path.resolve('src')]
    });

    Fs.writeFileSync(
        Path.resolve(fileName), // 'src/lib/global.css'
        result.css.toString()
    )
}

compile('src/global.scss', 'src/lib/global.css');
