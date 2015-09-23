function uturn () {

    var _scrollY,
        _countingUp             = 0,
        _countingDown           = 0,
        _verifySpeed            = 0,
        _onionSkin              = [],
        _lastScrollY            = 0,
        _ticking                = false,
        scrollupWhileReading    = new CustomEvent("scrollupWhileReading", {}),
        scrolldownNormalReading = new CustomEvent("scrolldownNormalReading", {}),
        scrolldownWhileReading  = new CustomEvent("scrolldownWhileReading", {});

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
     * Keeping track of scroll history in an array
     * Using this, you can estimate the actual direction/speed of scrolls
     */
    function addToScrollHistory(y){
      _onionSkin.push(y);
      if(_onionSkin.length > 9){
        _onionSkin = _onionSkin.slice(1, 10);
        // console.log(_onionSkin);
      }
    }

    /**
     * Check if scrolling down
     */
    function checkIsReadingNormally(y){
      if(_scrollY > y){
        document.dispatchEvent(scrolldownNormalReading);
      }
    }

    /**
     * Do a check if scrolling up
     * Expand check by confirmed the scrolling up is actually happening
     */
    function checkIsScrollingUp(){
      var article = document.querySelector('#articleBody');
      var bounds = document.querySelector('#articleBody').getBoundingClientRect();
      if(bounds.top < 0 && (bounds.top+bounds.height-window.innerHeight) > 0){
        var isGoingUp = false;
        for(var i = 1; i < _onionSkin.length; i++){
          if(_onionSkin[i-1] >= _onionSkin[i]){
            isGoingUp = true;
          }
        }
        if(isGoingUp){
          _verifySpeed = 0;
          _countingDown = 0;
          _countingUp = _countingUp + 1;
          if(_countingUp > 3){
            document.dispatchEvent(scrollupWhileReading);
          }
        } else {
          _countingDown = _countingDown + 1;
          _countingUp = 0;
          if(_countingDown > 3){
            document.dispatchEvent(scrolldownWhileReading);
          }
        }
        // console.log('Going down');
      } else {
        document.dispatchEvent(scrolldownWhileReading);
      }
    }

    /**
     * This is the "controller" for this entire process
     */
    var updateLocation = function(){
      // console.log('fn running');
      var y = window.scrollY;
      addToScrollHistory(y);
      checkIsScrollingUp();
      checkIsReadingNormally(y);
      _scrollY = y;
    };
  }
