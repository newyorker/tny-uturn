function speedingTicket (initialContainers, options) {
  var len = arguments.length;
  if (len === 1 && Array.isArray(initialContainers) === false) {
    options = initialContainers;
    initialContainers = [];
  }
  var body = document.body;
  var documentElement = document.documentElement;
  var _scrollX; // reference x
  var _scrollY; // reference y

  var o = options || {};
  if (o.movement === void 0) { o.movement = false; }
  if (o.direction === void 0) { o.direction = stopped; }

  var speedingTicket = emitter({
    movement: o.movement,
    direction: o.direction
  });

  events();

  return speedingTicket;
}
