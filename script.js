////////////////////// Load on start //////////////////////

window.onload = function () {
    const navBarItems = document.querySelectorAll('.nav-bar');
    const currentSectionId = getCurrentSectionId();

    updateURL(navBarItems, currentSectionId);
};

function updateURL(navBarItems, currentSectionId) {
    navBarItems.forEach((item, index) => {
        const href = item.getAttribute('href').substring(1);

        if (href === currentSectionId) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

function getCurrentSectionId() {
    const currentUrl = window.location.href;
    const sectionIdMatch = currentUrl.match(/#([^&]+)/);

    return sectionIdMatch ? sectionIdMatch[1] : null;
}

////////////////////// NavBar  //////////////////////

const navBarItems = document.querySelectorAll('.nav-bar');

let audios = ['jazz-1', 'jazz-2', 'jazz-3', 'jazz-4', 'jazz-5', 'jazz-6', 'jazz-7', 'jazz-8'];

navBarItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        navigateToSection(item);
    });

    item.addEventListener('mouseover', () => {
        const audio = new Audio(`assets/audio/${audios[index]}.wav`);
        audio.volume = 0.8;
        audio.play();
    });
});

document.addEventListener('keydown', (event) => {
    const activeItem = document.querySelector('.nav-bar.active');
    let index = Array.from(navBarItems).indexOf(activeItem);    
    const audio = audios[index];

    switch (event.key) {
        case 'ArrowUp':
            index = (index - 1 + navBarItems.length) % navBarItems.length;
            playHoverSound(audio);
            break;
        case 'ArrowDown':
            index = (index + 1) % navBarItems.length;
            playHoverSound(audio);
            break;
    }

    const targetItem = navBarItems[index];
    navigateToSection(targetItem);
});

function navigateToSection(item) {
    
    transition = true;

    navBarItems.forEach(navBarItem => {
        navBarItem.classList.remove('active');
    });

    item.classList.add('active');

    const targetSectionId = item.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetSectionId);

    setTimeout(function() {
        targetSection.scrollIntoView({ behavior: 'instant' });
    });
}
///////////////////////TYPE EFFECT //////////////////

const typed = document.querySelector('.typed');
if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
        strings: typed_strings,
        loop: true,
        typeSpeed: 100,
        backSpeed: 50,
        backDelay: 2000
    });
}

////////////////////// BUTTONS //////////////////////

function playHoverSound(filename) {
    const audio = new Audio(`assets/audio/${filename}.wav`);
    audio.play();
}

/////////////////// CURSOR EFFECT ///////////////////

document.addEventListener('mousemove', e=> {

    let bubbles = document.createElement('bubbles');
    let x = e.pageX;
    let y = e.pageY;
    bubbles.style.left = x + "px";
    bubbles.style.top = y + "px";
    let size = 25;
    bubbles.style.width = 1 + size + "px";
    bubbles.style.height = 1 + size + "px";
    
    document.body.appendChild(bubbles);
    setTimeout(function() {
      bubbles.remove();
    }, 300);
  });

  /////////////////// FLOATING PROJECTS ///////////////

  // Function to show modal with project information
function showModal(projectName) {
    const modal = document.getElementById('modal');
    const modalContent = document.getElementById('modal-content');
    
    // Set project information dynamically (replace with your actual project information)
    if (projectName === 'project1') {
        modalContent.innerHTML = '<h2>Project 1</h2><p>Description of Project 1.</p>';
    } else if (projectName === 'project2') {
        modalContent.innerHTML = '<h2>Project 2</h2><p>Description of Project 2.</p>';
    }
    // Add more conditions for other projects
    
    modal.style.display = 'block';
}

// Function to close the modal
function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
}

// Function to update the positions of floating buttons
// Function to update the positions of floating buttons
function updateButtonPositions() {
    const buttons = document.querySelectorAll('.floating-button');

    buttons.forEach(button => {
        // Get current position and direction
        let x = parseFloat(button.style.left) || Math.random() * window.innerWidth;
        let y = parseFloat(button.style.top) || Math.random() * window.innerHeight;
        let directionX = parseFloat(button.getAttribute('data-direction-x')) || 1;
        let directionY = parseFloat(button.getAttribute('data-direction-y')) || 1;

        // Calculate new position
        x += directionX * 5; // Adjust the speed as needed
        y += directionY * 5;

        // Check if the button hits the screen edges and update direction accordingly
        if (x <= 0 || x >= window.innerWidth - button.clientWidth) {
            directionX *= -1;
        }

        if (y <= 0 || y >= window.innerHeight - button.clientHeight) {
            directionY *= -1;
        }

        // Update button position and direction
        button.style.left = `${x}px`;
        button.style.top = `${y}px`;
        button.setAttribute('data-direction-x', directionX);
        button.setAttribute('data-direction-y', directionY);
    });
}

// Update button positions initially and then every 50 milliseconds (adjust as needed)
updateButtonPositions();
setInterval(updateButtonPositions, 50);


/////////// STATIC EFFECT //////////////

(function() {
	"use strict";

	var canvases = document.querySelectorAll(".tv"),
		scaleFactor = 2.5, // Noise size
		samples = [],
		sampleIndex = 0,
		scanOffsetY = 0,
		scanSize = 0,
		FPS = 50,
		scanSpeed = FPS * 60, // 15 seconds from top to bottom
		SAMPLE_COUNT = 10;

	window.onresize = function() {
		canvases.forEach(function(canvas) {
			var context = canvas.getContext("gl") || canvas.getContext("2d");
			canvas.width = canvas.offsetWidth / scaleFactor;
			canvas.height = canvas.width / (canvas.offsetWidth / canvas.offsetHeight);
			scanSize = (canvas.offsetHeight / scaleFactor) / 3;

			samples = []
			for(var i = 0; i < SAMPLE_COUNT; i++)
				samples.push(generateRandomSample(context, canvas.width, canvas.height));
		});
	};

	function interpolate(x, x0, y0, x1, y1) {
		return y0 + (y1 - y0)*((x - x0)/(x1 - x0));
	}


	function generateRandomSample(context, w, h) {	
		var intensity = [];
		var random = 0;
		var factor = h / 50;
		var trans = 1 - Math.random() * 0.05;

		var intensityCurve = [];
		for(var i = 0; i < Math.floor(h / factor) + factor; i++)
			intensityCurve.push(Math.floor(Math.random() * 15));

		for(var i = 0; i < h; i++) {
			var value = interpolate((i/factor), Math.floor(i / factor), intensityCurve[Math.floor(i / factor)], Math.floor(i / factor) + 1, intensityCurve[Math.floor(i / factor) + 1]);
			intensity.push(value);
		}

		var imageData = context.createImageData(w, h);
		for(var i = 0; i < (w * h); i++) {
			var k = i * 4;
			var color = Math.floor(36 * Math.random());
			// Optional: add an intensity curve to try to simulate scan lines
			color += intensity[Math.floor(i / w)];
			imageData.data[k] = imageData.data[k + 1] = imageData.data[k + 2] = color;
			imageData.data[k + 3] = Math.round(255 * trans);
		}
		return imageData;
	} 

	function render() {
		canvases.forEach(function(canvas) {
			var context = canvas.getContext("gl") || canvas.getContext("2d");
			context.putImageData(samples[Math.floor(sampleIndex)], 0, 0);

			sampleIndex += 20 / FPS; // 1/FPS == 1 second
			if(sampleIndex >= samples.length) sampleIndex = 0;

			var grd = context.createLinearGradient(0, scanOffsetY, 0, scanSize + scanOffsetY);

			grd.addColorStop(0, 'rgba(255,255,255,0)');
			grd.addColorStop(0.1, 'rgba(255,255,255,0)');
			grd.addColorStop(0.2, 'rgba(255,255,255,0.2)');
			grd.addColorStop(0.3, 'rgba(255,255,255,0.0)');
			grd.addColorStop(0.45, 'rgba(255,255,255,0.1)');
			grd.addColorStop(0.5, 'rgba(255,255,255,1.0)');
			grd.addColorStop(0.55, 'rgba(255,255,255,0.55)');
			grd.addColorStop(0.6, 'rgba(255,255,255,0.25)');
			//grd.addColorStop(0.8, 'rgba(255,255,255,0.15)');
			grd.addColorStop(1, 'rgba(255,255,255,0)');

			context.fillStyle = grd;
			context.fillRect(0, scanOffsetY, canvas.width, scanSize + scanOffsetY);
			context.globalCompositeOperation = "lighter";

			scanOffsetY += (canvas.height / scanSpeed);
			if(scanOffsetY > canvas.height) scanOffsetY = -(scanSize / 2);
		});

		window.requestAnimationFrame(render);
	}
	window.onresize();
	window.requestAnimationFrame(render);
})();


// Get all segments
var segments = document.querySelectorAll('.segment');

// Function to check which segment is in view
function getVisibleSegment() {
    var scrollY = window.pageYOffset;
    var visibleSegment = null;

    segments.forEach(function(segment) {
        var rect = segment.getBoundingClientRect();
        var top = rect.top + scrollY;
        var bottom = top + rect.height;

        if (scrollY >= top && scrollY <= bottom) {
            visibleSegment = segment;
        }
    });

    return visibleSegment;
}