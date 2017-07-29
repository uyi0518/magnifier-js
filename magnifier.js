  (function($) {
      $.fn.magnifier = function(options) {
          var _width = this.width()
          var _height = this.height()
          var _left = this.offset().left
          var _top = this.offset().top
          var img_width = _width * 2 + "px"
          var img_height = _height * 2 + "px"
          var img_src = this.children("img").attr("src")
          var defaults = {
              s_magnifier_width: "200px",
              s_magnifier_height: "200px",
              s_magnifier_background_color: "rgba(0,0,0,0.5)"
          }
          options = $.extend({}, defaults, options)
          var b_width = parseInt(options.s_magnifier_width) * 2 + "px" //大盒子
          var b_height = parseInt(options.s_magnifier_height) * 2 + "px"
          var s_width = parseInt(options.s_magnifier_width) / 2 //小盒子的一半，偏移条件最小边界
          var s_height = parseInt(options.s_magnifier_height) / 2
          var s_max_width = _width - s_width //偏移条件最大边界
          var s_max_height = _height - s_height
          var s_max_left = _width - parseInt(options.s_magnifier_width) //偏移最大量
          var s_max_top = _height - parseInt(options.s_magnifier_height)
          var s_magnifier, b_magnifier, b_img, mposx, mposy, s_posx, s_posy, b_posx, b_posy
          var _this = this

          function init() {
              s_magnifier = $("<div></div>")
              console.log(s_magnifier)
              console.log(_this)
              s_magnifier.css({ "width": options.s_magnifier_width, "height": options.s_magnifier_height, "background-color": options.s_magnifier_background_color, "position": "absolute", "display": "none", "top": "0" })
              _this.append(s_magnifier)
              b_magnifier = $("<div></div>")
              b_magnifier.css({ "width": b_width, "height": b_height, "background-color": options.s_magnifier_background_color, "position": "absolute", "display": "none", "overflow": "hidden", "left": _width + "px", "top": "0" })
              _this.append(b_magnifier)
              b_img = $("<img>")
              b_img.attr("src", img_src)
              b_img.css({ "width": img_width, "height": img_height, "position": "absolute" })
              b_magnifier.append(b_img)
          }

          init()
          this.mousemove(function(e) {
              mposx = e.clientX - _left //在对象在页面处于脚下位置时（需滚动），应使用pageX

              mposy = e.clientY - _top
              s_posx = mposx - s_width + "px"

              s_posy = mposy - s_height + "px"
              b_posx = -(parseInt(s_posx) * 2) + "px"

              b_posy = -(parseInt(s_posy) * 2) + "px"

              s_magnifier.css("display", "block")
              b_magnifier.css("display", "block")
              if (mposx < s_width) {
                  s_magnifier.css("left", "0")
                  b_img.css("left", "0")
              } else if (mposx > s_max_width) {
                  s_magnifier.css("left", s_max_left + "px")
                  b_img.css("left", -s_max_left * 2 + "px")
              } else {
                  s_magnifier.css("left", s_posx)
                  b_img.css("left", b_posx)
              }

              if (mposy < s_height) {
                  s_magnifier.css("top", "0")
                  b_img.css("top", "0")
              } else if (mposy > s_max_height) {
                  s_magnifier.css("top", s_max_top + "px")
                  b_img.css("top", -s_max_top * 2 + "px")
              } else {
                  s_magnifier.css("top", s_posy)
                  b_img.css("top", b_posy)
              }

          })
          this.mouseout(function(argument) {
              s_magnifier.css("display", "none")
              b_magnifier.css("display", "none")

          })
      }
  })(jQuery)