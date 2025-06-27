const express = require('express');
const router = express.Router();

// Require controller modules.
const event_controller = require('../controllers/eventController');

/// EVENT ROUTES ///

// GET request for listing all Events.
router.get('/events', event_controller.event_list);

// POST request for creating an Event.
router.post('/events', event_controller.event_create_post);

// POST request for updating an Event.
router.post('/events/:id', event_controller.event_update_post);

// POST request for deleting an Event.
router.delete('/events/:id', event_controller.event_delete_post);

module.exports = router;