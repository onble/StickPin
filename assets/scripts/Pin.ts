import { _decorator, CircleCollider2D, Collider2D, Component, Contact2DType, Node, tween, Vec3 } from "cc";
import { GameManager } from "./GameManager";
const { ccclass, property } = _decorator;

@ccclass("Pin")
export class Pin extends Component {
    protected onLoad(): void {
        const collider2d = this.getComponent(CircleCollider2D);
        if (collider2d) {
            collider2d.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        } else {
            console.error("你的针没有添加碰撞器，无法进行碰撞回调");
        }
    }

    onBeginContact() {
        console.log("contact");
    }
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

    protected onDestroy(): void {
        const collider2d = this.getComponent(Collider2D);
        if (collider2d) {
            collider2d.off(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
    }
}
