## WEBPACK STUDY - FastCampus

> 해당 ReadMe는 FastCampus를 보면서 WEBPACK 공부를하고 기록해놓은 파일입니다

---

### WEBPACK이란 무엇인가
- 웹팩은 **모듈 번들러**이다.
- 웹팩은 **상호 의존성**이 있는 **모듈**들을 사용해 그 모듈들과 같은 역할을 하는 **정적 에셋**들을 생성해낸다.
![웹팩 번들러 이미지](https://user-images.githubusercontent.com/62810965/126642886-89e3ed75-f3f0-41a5-972f-12401e8ff611.png)

### WEBPACK을 사용하는 이유

- 번들러를 사용하면 여러개의 파일들을 한 개 이상의 파일로 합칠 수 있기때문에 동시 연결 제한이 있는 **http 1.1 프로토콜에서는 효율적**이다.
- **전역 스코프** 오염 걱정 없이 **모듈(파일) 단위 스코프**를 사용해서 개발할 수 있게 해준다
- minify, uglify, auto-prefix, 변경된 파일만 filehash 변경 등 다양한 태스크들을 지정한 **순서대로** 빌드타임에 실행시켜준다.
- webpack-dev-server를 이용해 손쉽게 **hmr(hot module replacement)** 환경에서 개발할 수 있게해준다

### WEBPACK의 장점

- 다른 모듈 번들러에 비해 성능이 우수함
- **Chunk단위**로 의존성 트리를 동기적, 비동기적으로 분활할 수 있음
- **Loader**가 존재해서 다른 리소스를 순수 JS로 변환하고 모든 리소스에 대한 모듈을 구성함
- **3rd-party-lib**에 대해 **모듈로 통합하는 기능**을 제공함
- Module bundler의 **대부분의 기능**을 유저가 **커스터마이즈** 할 수 있음
- 다양한 플러그인이 있음

### WEBPACK의 단점

- 러닝커드가 높음
- document문서가 많이 착하진 않음
- **에러 핸들링?** 오류와 조우했을 때 골머리 앓는경우가 많음

### WEBPACK의 동작방식은 어떻게 되는걸까?

1. 각 기능 단위별로 module을 정의함
2. module을 로딩함
3. module로 만들어진 파일들을 웹브라우저에서 사용 가능하도록 컴파일(bundling, 번들링) 함, 
이때, module을 웹브라우저에서 사용할 수 있도록 컴파일을하는 역할을 WEBPACK이 하는것

> WEBPACK에서의 컴파일이란, 엔트리 파일을 시작으로 의존 관계에 있는 모듈을 엮어서 하나의 번들 파일을 만드는 작업을 말한다.

![모듈 엔트리 번들파일](https://user-images.githubusercontent.com/62810965/126643228-55ec092f-767b-4ea1-9b5d-21024ddc213c.png)

---

### ENTRY , OUTPUT

- **ENTRY**
    - 모듈의 의존 관계를 해석하기 위한 시작점을 설정함
    - 복잡한 의존성에 얽혀있는 기존 파일들 중 어떤 파일을 시작점으로 잡고 가야할지 WEBPACK에게 알려주는 역할
    - entry의 기본값은 ./src/index.js이며, webpack.config.js에 entry 프로퍼티를 추가해서 다른 여러 시작점을 지정할 수 있다.
- **OUTPUT**
    - WEBPACK이 생성하는 번들 파일에 대한 정보를 설정
    - 생성한 번들을 내보낼 경로나 내보낼 번들의 파일명을 지정하기 위해 사용
    - 기본적으로 main file의 경우 ./dist/main.js 경로에 생성되며, 다른 파일들은 ./dist 폴더안에 생성됩니다.

---

### Mode , Loader , Plugin

- **Mode**
    - Package.json은 어플리케이션 내부에 직접 포함되는 모듈 및 개발 과정에 필요한 모듈로 구분됨
    - 이런 두가지 모듈종류를 구분하기 위해서 package.json에 dependencies와 devDependencies가 있는거임
    - Mode는 **development, production, none** 으로 지정할 수 있으며, 기본값은 **production** 임
    - Mode 옵션을 사용하기 위해선, webpack.config.js에 mode 프로퍼티를 설정 해주거나, webpack을 실행할 때 cli상에서 --mode argument를 전달해주면 됨
- **Loader**
    - 웹팩의 의존성 그래프를 완성시키는 과정에서 의존관계를 가지는 다양한 모듈을 입력받아 처리하는 역할
    - WEBPACK은 오직 JS와 JSON 파일만 이해할 수 있다. 그래서 다른 타입의 파일들을 처리할려면 Loader를 사용해야함
    - Loaders는 두가지 프로퍼티를 가지고 있다.
        - **test**는 어느 파일이 변환되어야하는지 나타낸다.
        - **use**는 해당 파일을 변환하기 위해서 어떤 loader를 사용해야하는지 나타낸다.

    ```jsx
    // loader의 기본형식
    module.exports = {
    	module: {
    		rules: [loader1, loader2]
    	}
    }

    loader1과 loader2, 즉배열형태로 들어가는 인자들은 대게 객체 형식으로 들어가는것 같다.

    module.exports = {
      entry: "./index.js",
      output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
      },
      mode: "none",
      module: {
        rules: [
          {
            test: /\.css$/i, // .css를 식별하는 정규 표현식
            use: [
              {
                loader: "style-loader",
                options: {
                  injectType: "singletonStyleTag",
                },
              },
              {
                loader: "css-loader",
                options: {
                  modules: true,
                },
              },
            ],
          },
        ],
      },
    };
    ```

- **Plugin**
    - 웹팩이 동작하는 전체적인 과정에 개입할 수 있어 전반적인 역할을 해줌, 다양한 일을 함
    - 번들 최적화, asset 관리, 환경 변수 주입과 같은 번들된 결과물에 대하여 광범위한 작업을 수행하기 위해 사용함
    - **commonJs방식(require())** 으로 플러그인을 가져온 뒤 해당 플러그인을 plugins 배열에 추가
    - 플러그인을 호출 할 때 **new 연산자**와 함께 호출해서 **인스턴스 형태**로 만들어줘야합니다.

    ```jsx
    // plugin 기본 형식
    module.exports = {
    	plugins: [new Plugin({ ...options }), ...]
    }
    ```
    
---

<details>
<summary>강의를 보고 적은 코드</summary>

  ### webpack.common.js

```jsx
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");

const isProduction = process.env.NODE_ENV === "PRODUCTION";

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: `[name].[chunkhash].js`, // hash contenthash chunkhash
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.s?css$/,
        oneOf: [
          {
            test: /\.module\.s?css$/,
            use: [
              {
                loader: MiniCssExtractPlugin.loader,
              },
              {
                loader: "css-loader",
                options: {
                  modules: true,
                },
              },
              "sass-loader",
            ],
          },
          {
            use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
          },
        ],
      },
      {
        test: /\.{png|jpe?g|gif}$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name() {
                if (!isProduction) {
                  return "[path][name].[ext]";
                }
                return "[contenthash].[ext]";
              },
              publicPath: "assets/",
              outputPath: "assets/",
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
            },
          },
        ],
      },
      {
        test: /\.hbs$/i,
        use: ["handlebars-loader"],
      },
      {
        test: /.js/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Webpack",
      template: "./template.hbs",
      meta: {
        viewport: "width=device-width, initial-scale=1.0",
      },
      minify: isProduction
        ? {
            collapseWhitespace: true,
            useShortDoctype: true,
            removeScriptTypeAttributes: true,
          }
        : false,
    }),
    new MiniCssExtractPlugin({ filename: "[contenthash].css" }),
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      IS_PRODUCTION: isProduction,
    }),
  ],
};
```

### package.json

```jsx
{
  "name": "WEBPACK-PRACTICE",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "cross-env NODE_ENV=DEVELOPMENT webpack server --config webpack.dev.js",
    "dev": "cross-env NODE_ENV=DEVELOPMENT webpack --config webpack.dev.js",
    "build": "cross-env NODE_ENV=PRODUCTION webpack --config webpack.production.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@babel/cli": "^7.14.8",
    "@babel/core": "^7.14.8",
    "@babel/polyfill": "^7.12.1",
    "@babel/preset-env": "^7.14.8",
    "babel-loader": "^8.2.2",
    "clean-webpack-plugin": "^4.0.0-alpha.0",
    "cross-env": "^7.0.3",
    "css-loader": "^6.2.0",
    "cssnano": "^5.0.7",
    "file-loader": "^6.2.0",
    "handlebars": "^4.7.7",
    "handlebars-loader": "^1.7.1",
    "html-webpack-plugin": "^5.3.2",
    "mini-css-extract-plugin": "^2.1.0",
    "node-sass": "^6.0.1",
    "optimize-css-assets-webpack-plugin": "^6.0.1",
    "sass-loader": "^12.1.0",
    "style-loader": "^3.2.1",
    "stylelint": "^13.13.1",
    "stylelint-config-standard": "^22.0.0",
    "stylelint-scss": "^3.20.1",
    "stylelint-webpack-plugin": "^3.0.1",
    "terser-webpack-plugin": "^5.1.4",
    "url-loader": "^4.1.1",
    "webpack": "^5.45.1",
    "webpack-cli": "^4.7.2",
    "webpack-dev-server": "^3.11.2",
    "webpack-merge": "^5.8.0"
  },
  "dependencies": {
    "jquery": "^3.6.0",
    "normalize.css": "^8.0.1"
  },
  "browserslist": [
    "last 2 versions",
    "IE 10",
    "Firefox > 20"
  ]
}
```

### webpack.dev.js

```jsx
const merge = require("webpack-merge");
const common = require("./webpack.common");
const StyleLintPlugin = require("stylelint-webpack-plugin")

const config = {
  mode: "development",
  devServer: {
    open: false,
    overlay: true,
    port: 6969,
    historyApiFallback: {
      rewrites: [
        {
          from: /^\/subpage$/,
          to: "subpage.html",
        },
        {
          from: /./,
          to: "404.html",
        },
      ],
    },
  },
  plugins: [new StyleLintPlugin()],
};

module.exports = merge.merge(common, config);
```
</details>

