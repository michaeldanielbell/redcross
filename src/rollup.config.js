import resolve from "rollup-plugin-node-resolve";
import babel from "rollup-plugin-babel";
import sass from "rollup-plugin-sass";
import uglify from "rollup-plugin-uglify";
import { minify } from "uglify-es";
import commonjs from "rollup-plugin-commonjs";
import livereload from "rollup-plugin-livereload";

const dev = !!process.env.ROLLUP_WATCH;

export default [
    {
        input: "src/main.js",
        output: {
            file: "public/main.min.js",
            format: "iife",
            sourcemap: false
        },
        name: "main",
        plugins: [
            uglify({}, minify),
            resolve(),
            sass({
                output: "public/main.css",
                options: {
                    outputStyle: "compressed",
                    includePaths: ["node_modules"]
                }
            }),
            babel({
                exclude: "node_modules/**" // only transpile our source code
            }),
            commonjs({
                include: "node_modules/**"
            }),
            livereload({
                watch: "public"
            })
        ]
    }
];
