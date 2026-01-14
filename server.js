const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

let announcements = [
    {
        author: "meowmeowcat92",
        message: "Welcome!",
        date: "2025-01-15"
    }
];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Home page
app.get('/', (req, res) => {
    res.render('index');
});

//reflected
app.get('/search', (req, res) => {
    const query = req.query.q || '';

    const allCourse = [
        { code: "CS101", name: "Introduction to Computer Science" },
        { code: "MATH201", name: "Calculus I" },
        { code: "HIST105", name: "World History" },
        { code: "BIO110", name: "General Biology" },
        { code: "PHYS150", name: "Physics Fundamentals" }
    ];

    const result = query ? allCourse.filter(c => 
        c.name.toLowerCase().includes(query.toLowerCase()))
        : [];
    res.render('search', { courses: result, query });
});

//stored
app.get('/announcements', (req, res) => {
    res.render('announcements', { announcements: announcements });
});

app.post('/announcements', (req, res) => {
    const { author, message } = req.body;

    announcements.push({
        author: author || 'Anonymous',
        message: message || '',
        date: new Date().toISOString().split('T')[0]
    });
    res.redirect('/announcements');
});

//DOM-based
app.get('/schedule', (req, res) => {
    res.render('schedule');
});

app.get('/api/schedule', (req, res) => {
    const scheduleData = {
        monday: ["CS101 - 10:00 AM", "MATH201 - 1:00 PM"],
        tuesday: ["HIST105 - 11:00 AM", "BIO110 - 2:00 PM"],
        wednesday: ["CS101 - 10:00 AM", "PHYS150 - 3:00 PM"],
        thursday: ["MATH201 - 1:00 PM", "BIO110 - 2:00 PM"],
        friday: ["HIST105 - 11:00 AM", "PHYS150 - 3:00 PM"]
    };
    res.json(scheduleData);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

