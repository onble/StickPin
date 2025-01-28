import { _decorator, Component, Node, tween, Vec3 } from "cc";
import { GameManager } from "./GameManager";
const { ccclass, property } = _decorator;

@ccclass("Pin")
export class Pin extends Component {
    moveTo(targetPos: Vec3, duration: number = 1, parentNode: Node = null) {
        tween(this.node)
            .to(duration, { position: targetPos }, { easing: "smooth" })
            .call(() => {
                if (parentNode != null) {
                    const p = this.node.getWorldPosition();
                    const rotation = this.node.getWorldRotation();
                    this.node.setParent(parentNode);
                    this.node.setWorldPosition(p);
                    this.node.setWorldRotation(rotation);

                    GameManager.inst.updateScore();
                }
            })
            .start();
    }
}
