# ZeroNet-Boiler

This boiler can be used as a base for your site. It uses a variety of tools to help you.

 - [Babel](https://github.com/babel/babel) is used to convert ES6 code to JS
 - [Browserify](https://github.com/substack/node-browserify) is used to package things like jQuery
 - [Gulp](https://github.com/gulpjs/gulp) is used to take [Pug](https://github.com/pugjs/pug)/[Stylus](https://github.com/stylus/stylus) files and convet, minify and output them as .html and .css files

###Creating a new site

First download ZeroNet from [ZeroNet GitHub](https://github.com/HelloZeroNet/ZeroNet)
Afterwards follow these instructions [ZeroNet Site Creation](https://github.com/HelloZeroNet/ZeroNet#how-can-i-create-a-zeronet-site)

Once you've secured your private key, navigate to your data folder and find the folder, it should be the same name as your sites address.

Once in it delete everything except the content.json file
Proceed to extract everything from this repo in

###Compiling the site
If you've never used [Gulp](https://github.com/gulpjs/gulp) before you might enjoy learning about it first.

Run 

> gulp

It will convert and minify a few files
 - index.pug -> index.html
 - stylus/main.styl -> src/main.css
 - js/ -> src/all.js

That is all, you can now access your site 

	http://127.0.0.1:43110/(YOUR ADDRESS)


