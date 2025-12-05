const Student = require('../models/Student');

// Render list page
exports.listPage = async (req, res) => {
  const students = await Student.find().sort({ createdAt: -1 }).lean();
  res.render('students/list', { students, title: 'Students' });
};

// Render new form
exports.newForm = (req, res) => {
  res.render('students/form', { student: {}, title: 'Add Student', action: '/students' });
};

// Render edit form
exports.editForm = async (req, res) => {
  const student = await Student.findById(req.params.id).lean();
  if(!student) return res.redirect('/students');
  res.render('students/form', { student, title: 'Edit Student', action: `/students/${student._id}?_method=PUT` });
};

// Render details
exports.detailsPage = async (req, res) => {
  const student = await Student.findById(req.params.id).lean();
  if(!student) return res.redirect('/students');
  res.render('students/details', { student, title: 'Student Details' });
};

// Create (from form or API)
exports.create = async (req, res) => {
  try {
    const s = await Student.create(req.body);
    if (req.headers.accept && req.headers.accept.includes('application/json')) {
      return res.status(201).json(s);
    }
    res.redirect('/students');
  } catch (err) {
    console.error(err);
    res.status(400).send('Error creating student');
  }
};

// Update
exports.update = async (req, res) => {
  try {
    const s = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!s) return res.status(404).json({ error: 'Not found' });
    if (req.headers.accept && req.headers.accept.includes('application/json')) {
      return res.json(s);
    }
    res.redirect('/students');
  } catch (err) {
    console.error(err);
    res.status(400).send('Error updating student');
  }
};

// Delete
exports.remove = async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    if (req.headers.accept && req.headers.accept.includes('application/json')) {
      return res.json({ message: 'Deleted' });
    }
    res.redirect('/students');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting');
  }
};

// JSON list (API)
exports.listJson = async (req, res) => {
  const students = await Student.find().sort({ createdAt: -1 });
  res.json(students);
};

// JSON get
exports.getJson = async (req, res) => {
  const student = await Student.findById(req.params.id);
  if (!student) return res.status(404).json({ error: 'Not found' });
  res.json(student);
};
