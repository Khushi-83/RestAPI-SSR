const Peon = require('../models/Peon');

// Render list page
exports.listPage = async (req, res) => {
  const peons = await Peon.find().sort({ createdAt: -1 }).lean();
  res.render('peons/list', { peons, title: 'Peons' });
};

// Render new form
exports.newForm = (req, res) => {
  res.render('peons/form', { peon: {}, title: 'Add Peon', action: '/peons' });
};

// Render edit form
exports.editForm = async (req, res) => {
  const peon = await Peon.findById(req.params.id).lean();
  if (!peon) return res.redirect('/peons');
  res.render('peons/form', { peon, title: 'Edit Peon', action: `/peons/${peon._id}?_method=PUT` });
};

// Render details
exports.detailsPage = async (req, res) => {
  const peon = await Peon.findById(req.params.id).lean();
  if (!peon) return res.redirect('/peons');
  res.render('peons/details', { peon, title: 'Peon Details' });
};

// Create (from form or API)
exports.create = async (req, res) => {
  try {
    const p = await Peon.create(req.body);
    if (req.headers.accept && req.headers.accept.includes('application/json')) {
      return res.status(201).json(p);
    }
    res.redirect('/peons');
  } catch (err) {
    console.error(err);
    res.status(400).send('Error creating peon');
  }
};

// Update
exports.update = async (req, res) => {
  try {
    const p = await Peon.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!p) return res.status(404).json({ error: 'Not found' });

    if (req.headers.accept && req.headers.accept.includes('application/json')) {
      return res.json(p);
    }

    res.redirect('/peons');
  } catch (err) {
    console.error(err);
    res.status(400).send('Error updating peon');
  }
};

// Delete
exports.remove = async (req, res) => {
  try {
    await Peon.findByIdAndDelete(req.params.id);

    if (req.headers.accept && req.headers.accept.includes('application/json')) {
      return res.json({ message: 'Deleted' });
    }

    res.redirect('/peons');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting peon');
  }
};

// JSON list (API)
exports.listJson = async (req, res) => {
  const peons = await Peon.find().sort({ createdAt: -1 });
  res.json(peons);
};

// JSON get
exports.getJson = async (req, res) => {
  const peon = await Peon.findById(req.params.id);
  if (!peon) return res.status(404).json({ error: 'Not found' });
  res.json(peon);
};
