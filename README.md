![](https://media.giphy.com/media/xTiTnq4cEnufuQAAlW/giphy.gif)

# uturn - detect scrolling behavior with a requestAnimationFrame debounce

uturn.js is a small library for detecting people who change scroll direction while viewing a webpage. It uses the requestAnimationFrame events to run at 60 frames a second.

## Getting started

Run the function on your site. We run this in the article pages, because those are the pages we want to create scroll events for.

## Events

**Create event listeners on one of the three events:**

- ```scrollChangeToUp``` The desired behavior is to detect a user who scrolls up, after reading. 
- ```scrollChangeToDown``` This is triggered when a user is scrolling down. This is meant to reengage the reading experience.

## Callbacks

**Set up eventlisters based on the above events.**

You need your own functions, but here are examples:

    document.addEventListener('scrollChangeToUp', function(){
      // Put function here that triggers when scrolling up
    });

    document.addEventListener('scrollChangeToDown', function(){
      // Put function here that triggers when scrolling down
    });

## Recommendation

When implementing the events on your own site, I recommend setting up a variable on your site that saves the visible/hidden state.

Example:

	document.addEventListener('scrollChangeToDown', function(){
	  console.log(_visible);
	  if(_visible == true){
	    hideWhileScrolling();
	    _visible = false;
	  }
	});
	
	document.addEventListener('scrollChangeToUp', function(){
	  console.log(_visible);
	  if(_visible == false){
	    displayWhileScrolling();
	    _visible = true;
	  }
	});