const express = require('express');
const app = express();
const port = 3000;

// ⚠️ SECURITY ISSUE: User input directly executed (Risk: Command Injection)
const { exec } = require('child_process');

app.get('/', (req, res) => {
    res.send('<h1>Hello, World! This is a Snyk Security Test.</h1>');
});

app.get('/ping', (req, res) => {
    let host = req.query.host || 'localhost';

    // ⚠️ POTENTIAL SECURITY VULNERABILITY: UNSAFE EXECUTION
    exec(`ping -c 2 ${host}`, (error, stdout, stderr) => {
        if (error) {
            res.status(500).send(`Error: ${error.message}`);
            return;
        }
        res.send(`<pre>${stdout}</pre>`);
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
