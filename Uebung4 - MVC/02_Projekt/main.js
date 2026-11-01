import './project-view.js';
import './employee-view.js';
import { ProjectController } from './controller.js';

// type="module" läuft erst nach dem Parsen: Templates und Elemente sind vorhanden
new ProjectController().init();
