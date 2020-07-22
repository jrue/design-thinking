//https://stackoverflow.com/a/20618517
function CountDownTimer(duration, display) {
  this.duration = duration;
  this.granularity = 1000;
  this.tickFtns = [];
  this.running = false;
  this.display = display;
  this.paused = false;
}

CountDownTimer.prototype.start = function() {
  if (this.running) {
    return;
  }
  this.running = true;
  var start = Date.now(),
      that = this,
      diff, obj,timegap=0;

  (function timer() {


    if(that.paused){
      return;
    } 
      

    diff = that.duration - (((Date.now() - start) / 1000) | 0);


    

    if (diff > 0 && !that.paused) {
      setTimeout(timer, that.granularity);
    } else {
      diff = 0;
      that.running = false;
    }


    obj = CountDownTimer.parse(diff);
    that.tickFtns.forEach(function(ftn) {
      ftn.call(this, obj.minutes, obj.seconds);
    }, that);


  }());
};

CountDownTimer.prototype.pause = function() {
  this.paused = true;
}

CountDownTimer.prototype.onTick = function(ftn) {
  if (typeof ftn === 'function') {
    this.tickFtns.push(ftn);
  }
  return this;
};

CountDownTimer.prototype.expired = function() {
  return !this.running;
};

CountDownTimer.parse = function(seconds) {
  return {
    'minutes': (seconds / 60) | 0,
    'seconds': (seconds % 60) | 0
  };
};