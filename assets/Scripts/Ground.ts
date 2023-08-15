import { _decorator, Canvas, Component, director, Node, UITransform, Vec3 } from 'cc';

import { GameCtrl } from './GameCtrl';

const { ccclass, property } = _decorator;

@ccclass('Ground')
export class Ground extends Component {
    
    @property({
        type: Node,
        tooltip: 'ground node 1'
    })
    public ground1: Node;
    
    @property({
        type: Node,
        tooltip: 'ground node 1'
    })
    public ground2: Node;
    
    @property({
        type: Node,
        tooltip: 'ground node 1'
    })
    public ground3: Node;

    public groundWidth: Array<number> = [0, 0, 0];

    public tempStartLocation : Array<Vec3> = [new Vec3, new Vec3, new Vec3];

    public gameCtrl = new GameCtrl;
    public gameSpeed : number = 50;

    onLoad() {
        this.startUp();
    }

    startUp(){
        this.groundWidth[0] = this.ground1.getComponent(UITransform).width;
        this.groundWidth[1] = this.ground2.getComponent(UITransform).width;
        this.groundWidth[2] = this.ground3.getComponent(UITransform).width;        

        this.tempStartLocation[0].x = 0;
        this.tempStartLocation[1].x = this.groundWidth[0];
        this.tempStartLocation[2].x = this.groundWidth[0] + this.groundWidth[1];

        this.ground1.setPosition(this.tempStartLocation[0]);
        this.ground2.setPosition(this.tempStartLocation[1]);
        this.ground3.setPosition(this.tempStartLocation[2]);
    }


    update(deltaTime: number) {

        this.gameSpeed = this.gameCtrl.speed;
        
        this.tempStartLocation[0] = this.ground1.position;
        this.tempStartLocation[1] = this.ground2.position;
        this.tempStartLocation[2] = this.ground3.position;
        

        this.tempStartLocation[0].x -= this.gameSpeed * deltaTime;
        this.tempStartLocation[1].x -= this.gameSpeed * deltaTime;
        this.tempStartLocation[2].x -= this.gameSpeed * deltaTime;

        const scene = director.getScene();
        const canvas = scene.getComponentInChildren(Canvas);
        // vị trí của ground 1 trên đồ thị bé hơn 0 | ground1.x + ground1.width < 0
        if (this.tempStartLocation[0].x <= (0 - this.groundWidth[0])) {
            this.tempStartLocation[0].x = canvas.getComponent(UITransform).width;
        }

        if (this.tempStartLocation[1].x <= (0 - this.groundWidth[1])) {
            this.tempStartLocation[1].x = canvas.getComponent(UITransform).width;
        }

        if (this.tempStartLocation[2].x <= (0 - this.groundWidth[2])) {
            this.tempStartLocation[2].x = canvas.getComponent(UITransform).width;
        }

        this.ground1.setPosition(this.tempStartLocation[0]);
        this.ground2.setPosition(this.tempStartLocation[1]);
        this.ground3.setPosition(this.tempStartLocation[2]);
    }
}


