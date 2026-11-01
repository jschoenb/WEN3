import './view.js';
import { TodoController } from './controller.js';

// type="module" wird erst nach dem Parsen des HTML ausgeführt: das DOM ist bereit
new TodoController().init();
