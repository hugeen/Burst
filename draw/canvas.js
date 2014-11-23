require('../core/model')(Canvas);
require('./canvas/path_drawing')(Canvas);
require('./canvas/path_drawing_debug')(Canvas);
require('./canvas/stylizing')(Canvas);


function Canvas (el) {
    this.context = el.getContext('2d');
    this.el = el;
}


(function (proto) {

    proto.def('clear', function () {
        this.context.clearRect(0, 0, this.el.width, this.el.height);
    });

})(Canvas.prototype);


module.exports = Canvas;