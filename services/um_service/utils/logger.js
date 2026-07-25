import pinoConfig from '../config/pinoConfig.js';
import pino from 'pino';

const logger = pino(pinoConfig);

export default logger;
