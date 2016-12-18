import { PADDLE_INIT_W, PADDLE_INIT_EW } from './data/Constants';
import { IAppState } from './interfaces/IAppState';
import { IPowerUp } from './interfaces/IPowerUp';
import { EPowerUp } from './enums/EPowerUp';

const availablePowerUps = [EPowerUp.SIZE, EPowerUp.FIRE];

const noTimeLeft = (powerup: IPowerUp) => (powerup.timeleft === 0);
const active = (powerup: IPowerUp) => (powerup.timeleft);
const justStarted = (powerup: IPowerUp) => (powerup === powerup.duration);

/**
 * Create random powerup at specific position
 */
export const createPowerUp = (x: number, y: number) => ({
    type: Math.floor(Math.random() * availablePowerUps.length),
    x: x,
    y: y,
    w: 20,
    h: 20
});

export const handlePowerUps = (state: IAppState) => {
    const powerups = state.player.powerUps;
    if (active(powerups.fire)) {
        powerups.fire.timeleft -= 1;
    }
    if (active(powerups.size)) {
        if (justStarted(powerups.size)) {
            state.player.x -= PADDLE_INIT_EW;
        }
        state.player.w = (PADDLE_INIT_W + (2 * PADDLE_INIT_EW));
        powerups.size.timeleft -= 1;
        if (noTimeLeft(powerups.size)) {
            state.player.w = PADDLE_INIT_W;
        }
    }
}
