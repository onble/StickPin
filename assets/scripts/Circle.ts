import { _decorator, Component, Node } from "cc";
const { ccclass, property } = _decorator;

@ccclass("Circle")
export class Circle extends Component {
    @property
    ratateSpeed: number = 90;

    private isRotate: boolean = true;
    start() {}

    update(deltaTime: number) {
        if (this.isRotate == false) return;
        this.node.angle -= this.ratateSpeed * deltaTime;
    }

    stopRotate() {
        console.log("stopRotate");
        this.isRotate = false;
    }
}
