const Teacher = require('../models/Teacher');

// Render list page
exports.listPage = async (req, res) => {
  const teachers = await Teacher.find().sort({ createdAt: -1 }).lean();
  res.render('teachers/list', { teachers, title: 'Teachers' });
};

// Render new form
exports.newForm = (req, res) => {
  res.render('teachers/form', { teacher: {}, title: 'Add Teacher', action: '/teachers' });
};

// Render edit form
exports.editForm = async (req, res) => {
  const teacher = await Teacher.findById(req.params.id).lean();
  if (!teacher) return res.redirect('/teachers');
  res.render('teachers/form', { teacher, title: 'Edit Teacher', action: `/teachers/${teacher._id}?_method=PUT` });
};

// Render details
exports.detailsPage = async (req, res) => {
  const teacher = await Teacher.findById(req.params.id).lean();
  if (!teacher) return res.redirect('/teachers');
  res.render('teachers/details', { teacher, title: 'Teacher Details' });
};

// Create (from form or API)
exports.create = async (req, res) => {
  try {
    const t = await Teacher.create(req.body);
    if (req.headers.accept && req.headers.accept.includes('application/json')) {
      return res.status(201).json(t);
    }
    res.redirect('/teachers');
  } catch (err) {
    console.error(err);
    res.status(400).send('Error creating teacher');
  }
};

// Update
exports.update = async (req, res) => {
  try {
    const t = await Teacher.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!t) return res.status(404).json({ error: 'Not found' });

    if (req.headers.accept && req.headers.accept.includes('application/json')) {
      return res.json(t);
    }

    res.redirect('/teachers');
  } catch (err) {
    console.error(err);
    res.status(400).send('Error updating teacher');
  }
};

// Delete
exports.remove = async (req, res) => {
  try {
    await Teacher.findByIdAndDelete(req.params.id);

    if (req.headers.accept && req.headers.accept.includes('application/json')) {
      return res.json({ message: 'Deleted' });
    }

    res.redirect('/teachers');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting teacher');
  }
};

// JSON list (API)
exports.listJson = async (req, res) => {
  const teachers = await Teacher.find().sort({ createdAt: -1 });
  res.json(teachers);
};

// JSON get
exports.getJson = async (req, res) => {
  const teacher = await Teacher.findById(req.params.id);
  if (!teacher) return res.status(404).json({ error: 'Not found' });
  res.json(teacher);
};
