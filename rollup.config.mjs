import ts from "rollup-plugin-ts";


export default {
    input: 'src/index.ts',
    output: [
        {
            file: "dist/bundle.mjs",
            format: "es"
        }
    ],
    plugins: [ts()]
}