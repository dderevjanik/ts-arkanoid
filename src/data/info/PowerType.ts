import { IPowerUpType } from './../../interfaces/IPowerUpType';
import { EPowerUp } from './../../enums/EPowerUp';

export const PowerType: IPowerUpType[] = [
    { type: EPowerUp.SIZE, duration: 300, char: 'S' },
    { type: EPowerUp.FIRE, duration: 150, char: 'F' }
];
