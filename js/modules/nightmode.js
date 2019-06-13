class Nightmode {

	constructor(moon, stars, clouds, toggle) {

		this.moon = moon;
		this.stars = stars;
		this.clouds = clouds;
		this.toggle = toggle;
	}

	init() {

		Date.prototype.today = function() { 
			return ((this.getDate() < 10)?"0":"") +
				this.getDate() +"/"+(((this.getMonth()+1) < 10)?"0":"") +
					(this.getMonth()+1) +"/"+ this.getFullYear();
		}
		
		// For the time now
		Date.prototype.timeNow = function() {
			 return ((this.getHours() < 10)?"0":"") +
				 this.getHours() +":"+ ((this.getMinutes() < 10)?"0":"") +
					 this.getMinutes() +":"+ ((this.getSeconds() < 10)?"0":"") +
						 this.getSeconds();
		}
	
		var hour = new Date().timeNow()[0] + new Date().timeNow()[1];
		var hour = parseInt(hour);

		if (hour >= 22)
			this.activate();

		this.toggle.on('click', () => {
			
			if (this.active) {
				this.deactivate();
				this.active = false;
			}

			else {
				this.activate();
				this.active = true;
			}
		});
	}

	activate() {

		this.moon.css({
			'display': 'block'
		});

		this.clouds.css({
			'filter': 'brightness(50%)'
		});

		this.stars.each((index, star) => {
			$(star).css({
				'display': 'block',
				'top': Math.random() * Math.floor($(window).height() / 2) + 'px',
				'left': Math.random() * $(window).width() + 'px',
				'animation-delay': Math.random() * 5000 + 'ms' 
			});
		});

		$('body').css({
			'background-color': 'var(--sky-night)'
		});
	}

	deactivate() {

		this.moon.css({
			'display': 'none'
		});

		this.clouds.css({
			'filter': 'none'
		});

		this.stars.css({
			'display': 'none'
		});

		$('body').css({
			'background-color': 'var(--sky-blue)'
		});
	}
};

export default Nightmode;