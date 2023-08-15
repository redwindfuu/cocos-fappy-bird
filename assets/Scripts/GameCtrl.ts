import { _decorator, CCInteger, Collider2D, Component, Contact2DType, director, EventKeyboard, Input, input, IPhysics2DContact, KeyCode, Node } from 'cc';
import { Ground } from './Ground';
import { Results } from './Results';
import { Bird } from './Bird';
import { PipePool } from './PipePool';
import { BirdAudio } from './BirdAudio';
const { ccclass, property } = _decorator;

@ccclass('GameCtrl')
export class GameCtrl extends Component {
    @property({
        type: Ground,
        tooltip: 'ground'
    })
    public ground: Ground;

    @property({
        type: CCInteger,
        tooltip: 'game speed'   
    })
    public speed: number = 300;
    
    @property({
        type: Bird,
    })
    public bird: Bird;

    @property({
        type: BirdAudio
    })
    public birdAudio: BirdAudio;

    @property({
        type: CCInteger,
        tooltip: 'game speed'   
    })
    public pipeSpeed: number = 200;

    @property({
        type: Results,
        tooltip: 'game results'
    })
    public results: Results;

    @property({
        type: PipePool,
    })
    public pipeQueue: PipePool;
    public isOver : boolean;


    onLoad() {
        this.initListener();
        this.results.resetScore();
        this.isOver = true;
        director.pause()
    }

    initListener() {
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        this.node.on(Node.EventType.TOUCH_START, () => {
            if (this.isOver) {
                this.resetGame();
                this.bird.resetBird();
                this.startGame();
            } else {
                this.bird.fly();
            }

        });
    }

    onKeyDown(event: EventKeyboard) {
        switch (event.keyCode) {
            // case KeyCode.KEY_A:
            //     this.gameOver();
            //     break;
            // case KeyCode.KEY_P:
            //     this.results.addScore();
            //     break;
            // case KeyCode.KEY_Q:
            //     this.resetGame();
            //     this.bird.resetBird();
            //     break;
            case KeyCode.SPACE:
                if (this.isOver) {
                    this.resetGame();
                    this.bird.resetBird();
                    this.startGame();
                } else {
                    this.bird.fly();
                    this.birdAudio.onAudioQueue(0);
                }
            default:
                break;
        }
    }

    startGame() {
        this.results.hideResult();
        director.resume();
    }

    gameOver() {
        this.results.showResult();
        this.isOver = true;
        this.birdAudio.onAudioQueue(3);
        director.pause()
    }

    resetGame() {
        this.results.resetScore();
        this.isOver = false;
        this.pipeQueue.reset();
        this.startGame();
    }

    createPipe() {
        this.pipeQueue.addPool();
    }
    

    public passPipe(){
        this.results.addScore();
        this.birdAudio.onAudioQueue(1);
    }

    contractGroupPipe() {
        let collider = this.bird.getComponent(Collider2D);

        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this)
        }
    }

    onBeginContact(selfCollider : Collider2D, otherCollider : Collider2D , contact : IPhysics2DContact | null) {
        this.bird.hitSomething = true;
        this.birdAudio.onAudioQueue(2);
    }

    birdStruck () {
        this.contractGroupPipe();

        if (this.bird.hitSomething) {
            this.gameOver();
        }
    }
    
    update() {
        if (!this.isOver) {
            this.birdStruck();
        }
    }


}



