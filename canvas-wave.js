class Wave{
    constructor({
                    ctx,
                    startCoordinate = {
                        x: 0,
                        y: 0
                    }, //开始坐标
                    endCoordinate = {
                        x: 0,
                        y: 0
                    }, //结束坐标
                    speed = 0.01, //速度
                    amplitude = 20, //振幅（用于波峰）
                    period = 2, //周期
                    horizontalDisplacement = 0, //水平位移
                    verticalDisplacement, //垂直位移
                    linearGradientStartColor, //线性渐变开始颜色
                    linearGradientEndColor, //线性渐变结束颜色
                }){
        this.ctx = ctx;
        this.startCoordinate = startCoordinate;
        this.endCoordinate = endCoordinate;
        this.speed = speed;
        this.amplitude = amplitude;
        this.period = period;
        this.linearGradientStartColor = linearGradientStartColor;
        this.linearGradientEndColor = linearGradientEndColor;

        this.horizontalDisplacement = horizontalDisplacement;
        this.verticalDisplacement = verticalDisplacement || this.startCoordinate.y;

        this.linearGradient = null;

        this.init();
    }
    init(){
        this.linearGradient = this.ctx.createLinearGradient(this.startCoordinate.x, this.startCoordinate.y, this.endCoordinate.x, this.startCoordinate.y);
        this.linearGradient.addColorStop(0, this.linearGradientStartColor);
        this.linearGradient.addColorStop(1, this.linearGradientEndColor);
    }
    draw(){
        this.ctx.beginPath();

        this.ctx.moveTo(this.startCoordinate.x, this.startCoordinate.y);

        this.horizontalDisplacement += this.speed;

        for(let x = 0; x < this.endCoordinate.x; x++){
            const radians = x / this.endCoordinate.x * Math.PI * 2;
            const y = this.amplitude * Math.sin(this.period * radians + this.horizontalDisplacement) + this.verticalDisplacement;
            this.ctx.lineTo(x, y);
        }

        this.ctx.lineTo(this.endCoordinate.x, this.endCoordinate.y);
        this.ctx.lineTo(this.startCoordinate.x, this.endCoordinate.y);

        this.ctx.fillStyle = this.linearGradient;
        this.ctx.fill();

        this.ctx.closePath();

        this.ctx.globalCompositeOperation = "source-over";
    }
}