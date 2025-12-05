const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/studentController');

// SSR pages
router.get('/', ctrl.listPage);
router.get('/new', ctrl.newForm);
router.get('/:id/edit', ctrl.editForm);
router.get('/:id', ctrl.detailsPage);

// REST JSON endpoints (prefixed with /api)
router.get('/api', ctrl.listJson);                // GET /students/api  -> all students JSON
router.get('/api/:id', ctrl.getJson);             // GET /students/api/:id

// Create/Update/Delete (forms use method-override for PUT/DELETE)
router.post('/', ctrl.create);                    // create (form)
router.put('/:id', ctrl.update);                  // update (form with _method=PUT)
router.delete('/:id', ctrl.remove);               // delete

// API endpoints (alternate convention: /api/students)
router.post('/api', ctrl.create);
router.put('/api/:id', ctrl.update);
router.delete('/api/:id', ctrl.remove);

module.exports = router;

