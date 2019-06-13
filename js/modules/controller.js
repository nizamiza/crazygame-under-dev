
class Controller {

	constructor(blocks, chest, miner, sounds) {

		this.blocks = blocks;
		this.chest = chest;
		this.miner = miner;
		this.sounds = sounds;		
	}

	init() {

		var timer,
			start,
			end,
			timeElapsed;

		this.blocks.on('mousedown touchstart', (event) => {

			start = new Date().getTime();
			timer = setInterval(() => {
	
				if (timeElapsed >= 1200) {
	
					this.stopSounds(event)
					this.breakBlock(event.target);
					
					clearInterval(timer);
					timeElapsed = 0;
					return;
				}
	
				end = new Date().getTime();
				timeElapsed = end - start;
	
			}, 500);
	
			this.playSounds(event);
		});
	
		this.blocks.on('mouseup touchend', (event) => {
	
			clearInterval(timer);
			timeElapsed = 0;
	
			this.stopSounds(event);
		});

		var chest_open = false;
		var miner_blinking = false;

		this.chest.on('click', () => {

			if (chest_open) {
				this.chest.css({
					'clip-path': 'inset(40px 0px 0px 0px)',
					'background-position': 'bottom, bottom'
				});

				this.playSound('chest_close');
				chest_open = false;
			}

			else {
				this.chest.css({
					'clip-path': 'inset(0px 0px 0px 0px)',
					'background-position': '0px 112px, bottom'
				});
				
				this.playSound('chest_open');
				chest_open = true;
			}
		});

		this.miner.on('click', () => {

			if (miner_blinking)
				return

			this.miner.css({
				'background-image': 'url(../../assets/svg/crazyminer-2.svg)'
			});
			
			miner_blinking = true;

			setTimeout(() => {

				this.miner.css({
					'background-image': 'url(../../assets/svg/crazyminer-1.svg)'
				});

				miner_blinking = false;

			}, 250);
		});
	}

	playSounds(event) {

		if (this.blockIs('leaf', event.target))
			this.playSound('leaf');

		else if (this.blockIs('wood', event.target))
			this.playSound('wood');

		else if (this.blockIs('dirt', event.target))
			this.playSound('dirt');
	}

	stopSounds(event) {

		if (this.blockIs('leaf', event.target))
			this.stopSound('leaf');

		else if (this.blockIs('wood', event.target))
			this.stopSound('wood');
			
		else if (this.blockIs('dirt', event.target))
			this.stopSound('dirt');
	}

	blockIs(type, target) {

		try {
			return target.className.baseVal.includes(type) ? true : false;
		}
		catch (error) {
			console.log('non-breakable-block');
		}
	}

	playSound(type) {
		this.sounds[type].play();
	}

	stopSound(type) {
		this.sounds[type].pause();
		this.sounds[type].currentTime = 0;
	}

	breakBlock(block) {

		var class_name = block.className.baseVal;

		if (class_name.includes('dirt-8'))
			this.down_block_fell = true;

		if (class_name.includes('dirt-3')) {
			
			if (this.down_block_fell)
				this.fall_deep('chest');
			else
				this.fall_slight('chest');
			
			this.chest_fell_once = true;
		}

		else if (this.chest_fell_once && class_name.includes('dirt-8'))
			this.fall_deep('chest');

		else if (class_name.includes('dirt-1'))
			this.fall_deep('miner');
	
		block.parentElement.parentElement.style.opacity = 0;
	}

	fall_deep(element) {
		this[element].animate({
			'top': '+=720px'
		}, 750);
	}

	fall_slight(element) {
		this[element].animate({
			'top': '+=72px'
		}, 200);
	}
};

export default Controller;