import { _decorator, Component, instantiate, Node, Prefab } from "cc";
import { Pin } from "./Pin";
const { ccclass, property } = _decorator;

@ccclass("GameManager")
export class GameManager extends Component {
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

    start() {
        this.pinSpawn();
    }

    update(deltaTime: number) {}

    pinSpawn() {
        const pinNode = instantiate(this.pinPrefab);
        this.node.addChild(pinNode);
        pinNode.setPosition(this.p1.position);

        const pin = pinNode.getComponent(Pin);
        if (pin) {
            pin.moveTo(this.p2.position, this.moveDuiation);
        }
    }
}
