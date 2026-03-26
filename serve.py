import http.server
import socketserver
import threading
import webbrowser
import time

PORT = 5500

def open_browser():
    time.sleep(1)
    webbrowser.open(f"http://localhost:{PORT}/index.html")

threading.Thread(target=open_browser, daemon=True).start()

with socketserver.TCPServer(("", PORT), http.server.SimpleHTTPRequestHandler) as httpd:
    print(f"Serving HER-AI at http://localhost:{PORT}")
    print("Press Ctrl+C to stop")
    httpd.serve_forever()
