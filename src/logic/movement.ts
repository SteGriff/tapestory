import type { IMovable } from "@/types/IMovable"

const makeMovable = (el: IMovable) => {
    el.currX = el.currX || 0;
    el.currY = el.currY || 0;
    el.offsX = el.offsX || 0;
    el.offsY = el.offsY || 0;
}

export const startMove = (el: IMovable, e: MouseEvent & TouchEvent) => {
    makeMovable(el);
    if (e.type === "touchstart") {
        el.initX = e.touches[0].clientX - el.offsX;
        el.initY = e.touches[0].clientY - el.offsY;
    } else {
        el.initX = e.clientX - el.offsX;
        el.initY = e.clientY - el.offsY;
    }
}

export const doMove = (el: IMovable, e: MouseEvent & TouchEvent) => {
    e.preventDefault();

    if (e.type === "touchmove") {
        el.currX = e.touches[0].clientX - el.initX;
        el.currY = e.touches[0].clientY - el.initY;
    } else {
        el.currX = e.clientX - el.initX;
        el.currY = e.clientY - el.initY;
    }

    el.offsX = el.currX;
    el.offsY = el.currY;

    //console.log(e);

    // if (currentX > 60) goRight();
    // else if (currentX < -60) goLeft();
    // else setTranslate(currentX, blobEl);
}

export const endMove = (el: IMovable) => {
    // el.initX = el.currX;
    // el.initY = el.currY;
    // el.offsX = 0;
    // el.offsY = 0;
    el.currX = 0;
    el.currY = 0;
    el.offsX = 0;
    el.offsY = 0;
    el.initX = 0;
    el.initY = 0;
}
