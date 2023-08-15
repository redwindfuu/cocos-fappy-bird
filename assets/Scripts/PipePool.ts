import { _decorator, Component, instantiate, Node, NodePool, Prefab } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PipePool')
export class PipePool extends Component {

    @property({
        type: Prefab,
        tooltip: 'pipe prefab'
    })
    public pipePrefab = null;

    @property({
        type: Node,
        tooltip: 'pipe pool'
    })
    public pipePoolHome = null;

    public pool = new NodePool();

    public pipe;

    initPool() {
        let initCount =  3;

        for (let i = 0; i < initCount; ++i) {
            this.pipe = instantiate(this.pipePrefab);
            if (i == 0 ) {
                this.pipePoolHome.addChild(this.pipe);
            }else {
                this.pool.put(this.pipe);
            }
        }

    }

    addPool() {
        if (this.pool.size() > 0) {
            this.pipe = this.pool.get();
        } else {
            this.pipe = instantiate(this.pipePrefab);
        }
        this.pipePoolHome.addChild(this.pipe);
    }

    reset() {
        this.pipePoolHome.removeAllChildren();
        this.pool.clear();
        this.initPool();
    }

}


