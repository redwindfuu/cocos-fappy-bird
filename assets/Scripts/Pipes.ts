import { _decorator, Component, find, Node, screen, Vec3, UITransform } from 'cc';
import { GameCtrl } from './GameCtrl';
const { ccclass, property } = _decorator;

const random = (min: number, max: number) => {
    return Math.random() * (max - min) + min;
}

@ccclass('Pipes')
export class Pipes extends Component {
    
    @property({
        type: Node,
        tooltip: 'top pipe'
    })
    public topPipe: Node;

    @property({
        type: Node,
        tooltip: 'bottom pipe'
    })
    public bottomPipe: Node;

    public tempStartLocationUp: Vec3 = new Vec3(0, 0, 0);
    public tempStartLocationDown: Vec3 = new Vec3(0, 0, 0);

    public scene = screen.windowSize;
    
    public game;
    public pipeSpeed: number ;
    public tempSpeed : number;
    isPass : boolean ;

    onLoad() {
        this.game = find('GameCtrl').getComponent('GameCtrl');
        this.pipeSpeed = this.game.pipeSpeed;
        this.initPost();
        this.isPass = false;
    }

    initPost(){
        this.tempStartLocationUp.x = this.topPipe.getComponent(UITransform).width + this.scene.width;
        this.tempStartLocationDown.x = this.topPipe.getComponent(UITransform).width + this.scene.width;

        let gap = random(90 , 100);
        let topHeight = random(0 , 450);

        this.tempStartLocationUp.y = topHeight ;
        this.tempStartLocationDown.y = topHeight - (gap * 10);

        this.topPipe.setPosition(this.tempStartLocationUp);
        this.bottomPipe.setPosition(this.tempStartLocationDown);

    }


    update(deltaTime: number) {

        this.tempSpeed = this.pipeSpeed * deltaTime;

        this.tempStartLocationUp = this.topPipe.position;
        this.tempStartLocationDown = this.bottomPipe.position;

        this.tempStartLocationUp.x -= this.tempSpeed;
        this.tempStartLocationDown.x -= this.tempSpeed;

        this.topPipe.setPosition(this.tempStartLocationUp);
        this.bottomPipe.setPosition(this.tempStartLocationDown);


        if (this.isPass == false && this.topPipe.position.x <= 0) {
            this.isPass = true;
            this.game.passPipe();
        }

        if (this.topPipe.position.x < -this.scene.width) {
            this.game.createPipe();
            this.destroy();
        }

    }

}


