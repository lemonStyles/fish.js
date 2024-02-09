import resolve from "rollup-plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import fs from "fs/promises";
import cheerio from "cheerio";

export default {
  input: "app/app.js",
  output: {
    file: "build/index.js",
    format: "iife",
    name: "MyApp",
    sourcemap: false,
  },
  plugins: [
    resolve(),
    terser({
      format: {
        comments: false,
      },
      mangle: {
        toplevel: true,
        properties: {
          regex: /^_/,
        },
      },
      compress: {
        drop_console: true,
        passes: 2,
        reduce_funcs: true,
        reduce_vars: true,
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        unsafe_Function: true,
        unsafe_math: true,
        unsafe_proto: true,
        unsafe_regexp: true,
        dead_code: true,
        keep_fargs: false,
        keep_fnames: false,
        keep_infinity: true,
        negate_iife: true,
        passes: 3,
        properties: false,
        pure_getters: "strict",
        unsafe_arrows: true,
      },
    }),
    {
      name: "replace-script",
      async writeBundle() {
        try {
          // Baca isi dari file app/index.html
          const indexPath = "app/index.html";
          let originalHtml = await fs.readFile(indexPath, "utf-8");

          // Gunakan cheerio untuk memanipulasi struktur HTML
          const $ = cheerio.load(originalHtml);
          $('script[type="module"][src="./app.js"]').replaceWith(
            '<script src="index.js"></script>'
          );

          // Ambil HTML hasil manipulasi
          const modifiedHtml = $.html();

          // Tulis hasilnya ke build/index.html
          const buildIndexPath = "build/index.html";
          await fs.writeFile(buildIndexPath, modifiedHtml, "utf-8");

          console.log("build complete");
        } catch (error) {
          console.error("err -> ", error);
        }
      },
    },
  ],
};
