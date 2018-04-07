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
var MyImage = /** @class */ (function (_super) {
    __extends(MyImage, _super);
    function MyImage(url) {
        var _this = _super.call(this) || this;
        _this.url = url;
        _this.html = '<img src="img/dummy.png"\
        class="lazy"\
        data-src="' + url + '"/>';
        return _this;
    }
    return MyImage;
}(MyMedia));
