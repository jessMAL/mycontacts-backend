import { Router } from 'express';
import * as contactController from '../controllers/contact-controller.js';

const router = Router();

router.route('/')
    .get(contactController.getContacts)
    .post(contactController.createContact);   

router.route('/:id')
    .get(contactController.getContact)
    .put(contactController.updateContact)
    .delete(contactController.deleteContact);       

export default router;