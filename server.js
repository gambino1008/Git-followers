const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public')); // ضع ملف index.html داخل مجلد باسم public

// قاعدة بيانات وهمية في الذاكرة (استبدلها بـ MongoDB مستقبلاً)
let users = {};

// جلب بيانات المستخدم أو تسجيله
app.post('/api/user', (req, res) => {
    const { id, name } = req.body;
    if (!users[id]) {
        users[id] = { id, name, points: 10, campaigns: [] };
    }
    res.json(users[id]);
});

// إضافة نقاط بعد إتمام المهمة
app.post('/api/complete-task', (req, res) => {
    const { id, reward } = req.body;
    if (users[id]) {
        users[id].points += reward;
        return res.json({ success: true, points: users[id].points });
    }
    res.status(404).json({ success: false, message: "User not found" });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

