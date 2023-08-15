import { _decorator, Component, Label, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Results')
export class Results extends Component {

    @property({
        type: Label,
        tooltip: 'score label'
    })
    public currentScoreLabel: Label;
    
    @property({
        type: Label,
        tooltip: 'high score label'
    })
    public highScoreLabel: Label;
    
    @property({
        type: Label,
        tooltip: 'result title label'
    })
    public resultTitle: Label;

    maxScore: number = 0;
    currentScore: number = 0;

    updateScore(num: number) {
        this.currentScore = num;
        this.currentScoreLabel.string = this.currentScore.toString();
    }

    resetScore() {
        this.updateScore(0);

        this.hideResult();

    }

    addScore(){
        this.updateScore(this.currentScore + 1);
    }

    showResult() {
        this.maxScore = this.currentScore > this.maxScore ? this.currentScore : this.maxScore;
        
        this.highScoreLabel.string = `High Score: ${this.maxScore}`;
        
        this.resultTitle.node.active = true;
        this.highScoreLabel.node.active = true;
    }

    hideResult() {
        
        this.resultTitle.node.active = false;
        this.highScoreLabel.node.active = false;


    }

}


