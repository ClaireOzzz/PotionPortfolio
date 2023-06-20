
import { useThree, useLoader } from "@react-three/fiber";

export default function Tendrils() { 
    const RAND_A = Math.PI / 40;
    const SPACE = 0.2;

    const viewport = useThree(state => state.viewport)
    //console.log("viewport.width", viewport.width)

    window.addEventListener("load", function () {
    // var cv = document.createElement("canvas");
    // document.body.appendChild(cv);
    
    cv.width = viewport.width
    cv.height = viewport.height
    
    const ctx = cv.getContext("2d");
    ctx.translate(cv.width / 2, cv.height / 2);
    ctx.scale(devicePixelRatio, devicePixelRatio);
    
    const t = [
        new Tendril(-cv.width/4, -cv.height/6, 0, 10),
        new Tendril(-cv.width/4, 0, 0, 10),
        new Tendril(-cv.width/4, cv.height/6, 0, 10),
        new Tendril(cv.width/4, -cv.height/6, Math.PI, 10),
        new Tendril(cv.width/4, 0, Math.PI, 10),
        new Tendril(cv.width/4, cv.height/6, Math.PI, 10),
    ];
    animate();
    });

    function animate() {
    window.requestAnimationFrame(animate);
    for (var i = t.length-1; i >= 0; i--) {
        if (t[i].update())
        t[i].draw(ctx);
    }
    }

    function Tendril(x, y, a, w, ow) {
    this.x = x;
    this.y = y;
    this.a = a;
    this.w = w;
    this.ow = ow || w;
    this.d1 = 1;
    this.d2 = 0.99995;
    this.tick = 0;
    }

    Tendril.prototype.update = function () {
    if (this.w < 0.5)
        return false;
    
    this.x += SPACE * this.w * Math.cos(this.a);
    this.y += SPACE * this.w * Math.sin(this.a);
    this.w *= this.d1;
    this.d1 *= this.d2;
    this.a += (1 - 2 * Math.random()) * RAND_A;
    
    var b = Math.random() > 0.96 + 0.03 * (1 - this.w / this.ow);
    
    if (b && t.length < 1000) {
        var r = (1 - 2 * Math.random()) * Math.PI / 8;
        t.push(new Tendril(this.x, this.y, this.a + r, 0.5 * this.w, this.ow));
    }
    
    return true;
    }

    Tendril.prototype.draw = function (ctx) {
    // ctx.fillStyle = "hsl(0, 0%, " + (25 - 25 * (this.w / this.ow)) + "%)";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.w, 0, 2 * Math.PI);
    ctx.fill();
    }


}