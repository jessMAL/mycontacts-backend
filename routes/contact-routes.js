import { Router } from 'express';
import * as contactController from '../controllers/contact-controller.js';
import { validateToken } from '../middleware/validate-token-handler.js';

const router = Router();

router.use(validateToken); //ira validar para todas as rotas do router

router.route('/')
    .get(contactController.getContacts)
    .post(contactController.createContact);   

router.route('/:id')
    .get(contactController.getContact)
    .put(contactController.updateContact)
    .delete(contactController.deleteContact);       

export default router;