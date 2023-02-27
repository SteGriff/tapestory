import type { IMovable } from "@/types/IMovable"

export const startMove = (el: IMovable, e: MouseEvent & TouchEvent) => {
    el.offsX = 0;
    if (e.type === "touchstart") {
        el.initX = e.touches[0].clientX - el.offsX;
    } else {
        el.initX = e.clientX - el.offsX;
    }
}

export const doMove = (el: IMovable, e: MouseEvent & TouchEvent) => {
    e.preventDefault();

    if (e.type === "touchmove") {
        el.currX = e.touches[0].clientX - el.initX;
    } else {
        el.currX = e.clientX - el.initX;
    }

    el.offsX = el.currX;

    // if (currentX > 60) goRight();
    // else if (currentX < -60) goLeft();
    // else setTranslate(currentX, blobEl);
}

export const endMove = (el: IMovable) => {
    el.initX = el.currX;
    el.offsX = 0;
}
