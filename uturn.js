function uturn () {

    var _scrollY,
        _countingUp             = 0,
        _countingDown           = 0,
        _lastScrollY            = 0,
        _container              = document.querySelector('body'), // Change this to the element you want to watch
        _ticking                = false,
        scrollChangeToUp        = new CustomEvent("scrollChangeToUp", {}),
        scrollChangeToDown      = new CustomEvent("scrollChangeToDown", {});

    events();

    /**
     * Callback for our scroll event - just
     * keeps a track on the last scroll value
     */
    function onScroll() {
        _lastScrollY = window.scrollY;
        requestTick();
    }

    /**
     * Calls rAF if it's not already
     * been done already
     */
    function requestTick() {
        if(!_ticking) {
            requestAnimFrame(update);
            _ticking = true;
        }
    }

    /**
     * Our animation callback
     */
    function update() {
        updateLocation();
        // allow further rAFs to be called
        _ticking = false;
    }

    /**
     * Scroll related event setup
     */
    function events(remove){
      var op = remove ? 'remove' : 'add';

      // only listen for scroll events
      window.addEventListener('scroll', onScroll, false);

      // shim layer with setTimeout fallback
      window.requestAnimFrame = (function(){
        return  window.requestAnimationFrame       ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame    ||
                window.oRequestAnimationFrame      ||
                window.msRequestAnimationFrame     ||
                function( callback ){
                  window.setTimeout(callback, 1000 / 60);
                };
      })();
    }

    /**
     * Do a check if scrolling up
     * Expand check by confirmed the scrolling up is actually happening
     */
    function checkIsScrollingUp(y){
      var bounds = _container.getBoundingClientRect(),
          isGoingUp;
      if(bounds.top < 0 && (bounds.top+bounds.height-window.innerHeight) > 0){
        if(_scrollY > y){
            document.dispatchEvent(scrollChangeToUp);
        } else {
            document.dispatchEvent(scrollChangeToDown);
        }
      }
    }

    /**
     * This is the "controller" for this entire process
     */
    var updateLocation = function(){
      // console.log('fn running');
      var y = window.scrollY;
      checkIsScrollingUp(y);
      _scrollY = y;
    };
  }

  TNY.uturn = uturn;

})(TNY, document);
