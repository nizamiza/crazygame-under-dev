import Controller from './modules/controller.js'
import Nightmode from './modules/nightmode.js'

$(document).ready(function() {

	const clouds = $('.cloud');
	const blocks = $('.block');

	const chest = $('#chest');
	const miner = $('#crazyminer');

	const sounds = {
		leaf:			$('#audio-leaf')[0],
		wood:			$('#audio-wood')[0],
		dirt:			$('#audio-dirt')[0],
		chest_open:		$('#audio-chest_open')[0],
		chest_close:	$('#audio-chest_close')[0] 
	};

	for (let track in sounds)
		sounds[track].volume = 0.5;

	const controller = new Controller(blocks, chest, miner, sounds);

	controller.init();

	

	const stars = $('.star');
	const moon = $('#moon');
	const nightmode_toggle = $('#nightmode-toggle');

	const nightmode = new Nightmode(moon, stars, clouds, nightmode_toggle);
	nightmode.init();
});