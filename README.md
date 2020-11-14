# myzuka-dl [![Build Status](https://travis-ci.org/cokoghenun/myzuka-dl.svg?branch=master)](https://travis-ci.org/cokoghenun/myzuka-dl)

A **_music album_** downloading tool

`myzuka-dl` lets you download entire music albums with urls from sites not supported by `youtube-dl`

## Platforms

`myzuka-dl` is available on Linux, Windows, Mac Os and Android

For use with Android, make sure you have [termux](https://termux.com/) installed, after which you need to install the `nodejs` package in termux. Also, don't forget to give termux storage access with this command: `termux-setup-storage`

## Install

```
$ npm install -g myzuka-dl
```

or with `yarn`

```
$ yarn global add myzuka-dl
```

## Usage

![cli usage example](src/img/sample.jpg)

Use like so

```
$ myzuka-dl
```

Then follow the prompt to enter an album url

> Note: Downloaded albums are saved in your `downloads` folder

## Supported sites

- [myzuka.club](https://myzuka.club) (Russian site, use Google Translate)

More coming soon

## Suggestions and Request

Feel free to reach me vai [mail](mailto:confidenceboi@gmail.com) or [tweeter](https://twitter.com/cokoghenun). I'll reply as soon as I can, promise :stuck_out_tongue_winking_eye:
