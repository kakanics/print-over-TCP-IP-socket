# Virtual Printer

## Reason for creation

Normal printers can be used over network via TCP, but "Microsoft Print to PDF" cannot.
Therefore, I created this project. The request is sent via a TCP socket. A server is running on this socket which forwards the request to print to the default "Microsoft Print to PDF" printer.

## Requirements

1. Node.js is installed
2. Powershell is installed (comes with windows 10/11)
3. Windows is being used

## Usage

1. Clone the repo using
2. cd into the cloned repo
3. use ```node server.js```

Now in you other programs, you can send data over localhost:9100 or localhost:9101 and it will act as "Microsoft Print to PDF" over a TCP port.  
Port 9100 acts as a thermal printer and expects raw text inputs. POS/ESC not supported.  
Port 9101 acts as a regular printer and expects pdf.  
