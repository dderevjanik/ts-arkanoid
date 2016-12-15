import { IControls } from './interfaces/IControls';
import { IPlayer } from './interfaces/IPlayer';
import { EKeyState } from './enums/EKeyState';
import { EKey } from './enums/EKey';
import { isOutsideLeft, isOutsideRight } from './Mechanics';

/**
 * Add Event listeners to DOM
 */
export const addControlListeners = (controls: IControls) => {
    const leftBtnEl: any = document.getElementById('left-btn');
    const rightBtnEl: any = document.getElementById('right-btn');
    const body: any = document.getElementsByTagName('body');

    // mouse control
    leftBtnEl.addEventListener('mousedown', () => { controls.leftpaddle = EKeyState.PRESS; });
    leftBtnEl.addEventListener('mouseup', () => { controls.leftpaddle = EKeyState.UP; });
    rightBtnEl.addEventListener('mousedown', () => { controls.rightpaddle = EKeyState.PRESS; });
    rightBtnEl.addEventListener('mouseup', () => { controls.rightpaddle = EKeyState.UP; });

    // touch screen
    leftBtnEl.addEventListener('touchstart', () => { controls.leftpaddle = EKeyState.PRESS; });
    leftBtnEl.addEventListener('touchend', () => { controls.leftpaddle = EKeyState.UP; });
    rightBtnEl.addEventListener('touchstart', () => { controls.rightpaddle = EKeyState.PRESS; });
    rightBtnEl.addEventListener('touchend', () => { controls.rightpaddle = EKeyState.UP; });

    // keyboard control
    document.addEventListener('keydown', (e) => {
        switch(e.keyCode) {
            case EKey.LEFT:
                controls.leftpaddle = EKeyState.PRESS;
                break;
            case EKey.RIGHT:
                controls.rightpaddle = EKeyState.PRESS;
                break;
        }
    });
    document.addEventListener('keyup', (e) => {
        switch(e.keyCode) {
            case EKey.LEFT:
                controls.leftpaddle = EKeyState.UP;
                break;
            case EKey.RIGHT:
                controls.rightpaddle = EKeyState.UP;
                break;
        }
    });

};

/**
 * Clear current inputs
 */
export const clearControls = (controls: IControls) => {
    controls.leftpaddle = EKeyState.UP;
    controls.rightpaddle = EKeyState.UP;
};

/**
 * Handle player inputs
 */
export const handleControls = (player: IPlayer, controls: IControls) => {
    if (controls.leftpaddle === EKeyState.PRESS) {
        if (!isOutsideLeft(player.x - player.v)) {
            player.x -= player.v;
        }
    }
    if (controls.rightpaddle === EKeyState.PRESS) {
        if (!isOutsideRight(player.x + player.w + player.v, 300)) {
            player.x += player.v;
        }
    };
};
