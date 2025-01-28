import { _decorator, Component, Node, tween, Vec3 } from "cc";
const { ccclass, property } = _decorator;

@ccclass("Pin")
export class Pin extends Component {
    moveTo(targetPos: Vec3, duration: number = 1) {
        console.log("moveTo");
        tween(this.node).to(duration, { position: targetPos }, { easing: "smooth" }).start();
    }
}
