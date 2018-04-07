var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var MyVideo = /** @class */ (function (_super) {
    __extends(MyVideo, _super);
    function MyVideo(url) {
        var _this = _super.call(this) || this;
        _this.url = url;
        _this.html = '<video controls src="img/dummy.png"\
                class="lazy"\
                data-src="' + url + '"></video>';
        return _this;
        //this.html = '<video controls><source src="img/dummy.png"\
        //    class="lazy"\
        //    data-src="'+ url + '"></video>';
    }
    return MyVideo;
}(MyMedia));
