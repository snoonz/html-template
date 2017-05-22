# Syummyコーポレートサイト

## 概要
syummy.comにホストされているコーポレートサイトのソースです。
gulpでhtmlが生成されます。

## 使用方法
変換を行うにはnode.jsのインストールが必要です。
ターミナルでpackge.jsonがあるディレクトリに移動し、
````
npm run gulp
````

コマンドを実行します。
実行後publicディレクトリが生成されます。
また、コマンドの実行によりWebブラウザが起動します。
http://localhost:3000/ja/
にアクセスすれば、ブラウザでプレビューできます。

## 構造
* gulpfile.babel.js gulpの設定ファイルです。自動生成の手順が記述されています。
* node_modules npmのモジュールディレクトリです。リポジトリには含まれません。
* package.json  npmの設定ファイルです。
* public WebサーバにアップするHTMLファイル等のディレクトリです。リポジトリには含まれません。
* src 生成元のソースディレクトリです。
* .babelrc(不可視ファイル) babelの設定ファイルです。

## ソースについて
localディレクトリにはHTMLに流し込むテキストデータが保管されています。
pugディレクトリには変換元のpugファイルがあります。

## 言語の追加方法
* localディレクトリに”{言語コード}.json"ファイルを追加する(en.jsonをベースにすると良いです)
* common.jsonのlanguagesに言語名、language_pathsに言語コードを追加する
* gulpfile.babel.jsに言語タスクを追加する
* npm run gulpを実行する