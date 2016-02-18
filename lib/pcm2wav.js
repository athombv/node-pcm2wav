"use strict";

var fs 		= require('fs');
var wav 	= require('wav');

module.exports = function( args ) {
	
	var opts = {};
	for( var i = 0; i < args.length; i++ ) {
		if( args[i].substring(0, 2) != '--' ) continue;
		opts[ args[i] ] = args[++i]
	}
	
	if( opts['--h'] || Object.keys(opts).length == 2 ) return console.log("usage: pcm2wav --in input.wav [--out output.wav] [--bitrate 16000] [--channels 1]")
	
	if( !opts['--in'] ) return console.error("missing --in");
	opts['--out'] 		= opts['--out'] 		|| opts['--in'].replace('.pcm', '') + '.wav'
	opts['--bitrate'] 	= opts['--bitrate'] 	|| 16000
	opts['--channels'] 	= opts['--channels'] 	|| 1
		
	var file_in 	= fs.createReadStream( opts['--in'] );
	var file_out = new wav.FileWriter(opts['--out'], {
		channels	: opts['--channels'],
		sampleRate	: opts['--bitrate']
	})
		.on('error', function(err){
			console.log(err);
		})
		.on('finish', function(){
			console.log('written to `' + opts['--out'] + '` with bitrate `' + opts['--bitrate'] + '` and `' + opts['--channels'] + '` channel(s)');	
		});	
	
	file_in
		.pipe(file_out)
	
}