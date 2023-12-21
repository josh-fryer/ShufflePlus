const getAvgColourToBackground = (imageURL) => {
	//console.log("called avg colour func");
	var imgEl = new Image(300,300); 
	imgEl.src = imageURL;
	imgEl.crossOrigin = "Anonymous";

	var blockSize = 5, // only visit every 5 pixels
		defaultRGB = {r:46,g:46,b:46}, // for non-supporting envs
		canvas = document.createElement("canvas"),
		imgContext = canvas.getContext && canvas.getContext("2d"),
		data, width, height,
		i = -4,
		length,
		rgb = {r:0,g:0,b:0},
		count = 0;

	height = canvas.height = imgEl.height;
	width = canvas.width = imgEl.width;

	// onLoad is an async function that must await or call func from 
	imgEl.onload = function()
	{
		imgContext.drawImage(imgEl, 0, 0);
		try {
			data = imgContext.getImageData(0, 0, width, height);
		} catch(e) {
			/* security error, img on diff domain */
			console.log(e);
			return defaultRGB;
		}
		setAvgColourToBg();
	};

	function setAvgColourToBg() {
		length = data.data.length;
		//console.log("img data: ", data);
		while ((i += blockSize * 4) < length) {
			++count;
			rgb.r += data.data[i];
			rgb.g += data.data[i + 1];
			rgb.b += data.data[i + 2];
		}
		//console.log("rgb after while loop: ", rgb);
		// ~~ is short for Math.floor of values
		rgb.r = ~~(rgb.r / count);
		rgb.g = ~~(rgb.g / count);
		rgb.b = ~~(rgb.b / count);
		//console.log("rgb after floor: ", rgb);

		if (rgb.r == 0 && rgb.g == 0 && rgb.b == 0) {
			console.log("setting rgb to DEFAULT. rgb input was: ", rgb);
			return defaultRGB;
		}
		else {
			rgb = isItTooDark(rgb);
			console.log("exported rgb is ",rgb);
			return rgb;
		}
	}
};

const isItTooDark = (rgb) =>
{
	var percent = 0.20;
	// HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
	var hsp = Math.sqrt(
		0.299 * (rgb.r * rgb.r) +
            0.587 * (rgb.g * rgb.g) +
            0.114 * (rgb.b * rgb.b)
	);
        
	// Using the HSP value, determine whether the color is light or dark
	if (hsp>127.5) {
		// is light. make it darker
		rgb.r = ~~(rgb.r - (rgb.r * percent));
		rgb.g = ~~(rgb.g - (rgb.g * percent));
		rgb.b = ~~(rgb.b - (rgb.b * percent));
		//console.log("rgb is made darker shade", rgb);
		return rgb;
	} 
	else {
		// is dark. make it lighter
		percent = 0.8;
		rgb.r = ~~(rgb.r + (rgb.r * percent));
		rgb.g = ~~(rgb.g + (rgb.g * percent));
		rgb.b = ~~(rgb.b + (rgb.b * percent));
		//console.log("rgb is made lighter shade", rgb);
		return rgb;
	}
};

export default getAvgColourToBackground;