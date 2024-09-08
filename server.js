const net = require('net');
const { exec } = require('child_process');
const path = require('path');

const PORT = 9100;
const TEMP_FILE_PATH = path.join(__dirname, 'temp_print_file.txt');

const server = net.createServer((socket) => {
    socket.on('data', (data) => {
        // Save the received data to a temporary file
        require('fs').writeFile(TEMP_FILE_PATH, data, (err) => {
            if (err) {
                console.error('Failed to write print data:', err);
                return;
            }
            console.log('Print job received and saved.');
            
            // Send the temporary file to Microsoft Print to PDF
            exec(`powershell -Command "Start-Process -FilePath '${TEMP_FILE_PATH}' -ArgumentList '/p' -NoNewWindow -Wait"`, (err, stdout, stderr) => {
                if (err) {
                    console.error('Failed to print file:', err);
                    return;
                }
                console.log('Print command executed.');
                console.log(stdout);
                console.error(stderr);
            });
        });
    });

    socket.on('end', () => {
        console.log('Client disconnected');
    });
});

server.listen(PORT, () => {
    console.log(`TCP print server listening on port ${PORT}`);
});
const PDF_PORT = 9101;

const pdfServer = net.createServer((socket) => {
    socket.on('data', (data) => {
        const pdfFilePath = path.join(__dirname, 'temp_print_file.pdf');
        
        // Save the received data to a temporary PDF file
        require('fs').writeFile(pdfFilePath, data, (err) => {
            if (err) {
                console.error('Failed to write PDF data:', err);
                return;
            }
            console.log('PDF print job received and saved.');
            
            // Send the temporary PDF file to Microsoft Print to PDF
            exec(`powershell -Command "Start-Process -FilePath '${pdfFilePath}' -ArgumentList '/p' -NoNewWindow -Wait"`, (err, stdout, stderr) => {
                if (err) {
                    console.error('Failed to print PDF file:', err);
                    return;
                }
                console.log('PDF print command executed.');
                console.log(stdout);
                console.error(stderr);
            });
        });
    });

    socket.on('end', () => {
        console.log('PDF client disconnected');
    });
});

pdfServer.listen(PDF_PORT, () => {
    console.log(`TCP PDF print server listening on port ${PDF_PORT}`);
});