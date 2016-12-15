import { IPowerUpType } from './../../interfaces/IPowerUpType';
import { EPowerUp } from './../../enums/EPowerUp';

export const PowerType: IPowerUpType[] = [
    { type: EPowerUp.FIRE, duration: 150 },
    { type: EPowerUp.SIZE, duration: 300 }
];
