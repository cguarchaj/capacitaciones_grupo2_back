import express from 'express';
import * as EstudianteController from '../controllers/estudiante.controller';

const router = express.Router();

router.get('/', EstudianteController.getEstudiantes);
router.get('/:id', EstudianteController.getEstudiante);
router.post('/', EstudianteController.createEstudiante);
router.put('/:id', EstudianteController.updateEstudiante);
router.delete('/:id', EstudianteController.deleteEstudiante);

export default router;