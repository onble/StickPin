import { _decorator, Component, input, Input, instantiate, Label, Node, Prefab } from "cc";
import { Pin } from "./Pin";
import { Circle } from "./Circle";
const { ccclass, property } = _decorator;

@ccclass("GameManager")
export class GameManager extends Component {
    private static _inst: GameManager = null;

    public static get inst() {
        return this._inst;
    }

    @property(Node)
    p1: Node = null;
    @property(Node)
    p2: Node = null;
    @property(Node)
    p3: Node = null;

    @property(Prefab)
    pinPrefab: Prefab = null;

    @property
    moveDuiation: number = 0.5;

    protected onLoad(): void {
        GameManager._inst = this;
        input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
    }

    @property(Node)
    circleNode: Node = null;

    @property(Label)
    scoreLabel: Label = null;

    private curPin: Pin = null;
    private score: number = 0;
    private isGameOver: boolean = false;

    start() {
        this.pinSpawn();
    }

    update(deltaTime: number) {}

    onTouchStart() {
        if (this.isGameOver) return;
        this.curPin.moveTo(this.p3.position, this.moveDuiation, this.circleNode);
        this.pinSpawn();
    }

    updateScore() {
        this.score++;
        this.scoreLabel.string = this.score.toString();
    }

    pinSpawn() {
        const pinNode = instantiate(this.pinPrefab);
        this.node.addChild(pinNode);
        pinNode.setPosition(this.p1.position);

        this.curPin = pinNode.getComponent(Pin);
        if (this.curPin) {
            this.curPin.moveTo(this.p2.position, this.moveDuiation);
        } else {
            console.error("你实例化的针身上没有Pin组件，请检查。");
        }
    }

    gameOver() {
        // 确保游戏结束函数只会被调用一次
        if (this.isGameOver) return;
        this.isGameOver = true;

        this.circleNode.getComponent(Circle).stopRotate();
    }

    protected onDestroy(): void {
        input.off(Input.EventType.TOUCH_START, this.onTouchStart, this);
    }
}
