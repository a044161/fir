"use strict";

const path = {
	dist: "dist",
	src: "app"
};

const file_type = {
	app_entry: "./js/app.js",
	js: "/**/*.js",
	css: "/**/*.{css,scss}",
	html: "/**/*.html",
	image: "/**/*.{jpg,jpeg,bmp,png,gif,svg}",
	font: "/**/*.{eot,svg,ttf,woff,woff2}"
};

exports.path = path;

exports.file_type = file_type;
