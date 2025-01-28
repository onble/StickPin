import { _decorator, Component, Node } from "cc";
const { ccclass, property } = _decorator;

@ccclass("Circle")
export class Circle extends Component {
    @property
    ratateSpeed: number = 90;
    start() {}

    update(deltaTime: number) {
        this.node.angle -= this.ratateSpeed * deltaTime;
    }
}
