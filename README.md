# Online Code Editor with Secure Code Execution

This project implements an online code editor that allows users to write, compile, and run code in various programming languages securely using Docker containers. The project is built using Flask and the Monaco Editor, and it provides real-time output to users.

## Features

- Choose from multiple programming languages.
- Edit code using the Monaco Editor.
- Secure code execution using Docker containers.
- Real-time output display.

## Prerequisites

- Python 3.x
- Docker

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/00-Python/Online-IDE.git
   cd Online-IDE
   ```

2. Install the required Python packages:

   ```bash
   pip install -r requirements.txt
   ```

3. Start the Flask application:

   ```bash
   python app.py
   ```

4. Access the application in your web browser at http://localhost:5000.

## Usage

1. Choose a programming language from the dropdown.
2. Write or paste your code in the Monaco Editor.
3. Click the "Run Code" button to execute the code.
4. View the real-time output in the designated output area.

## Security Considerations

- The application uses Docker containers to isolate code execution.
- Input validation is performed to prevent code injection and malicious input.

## License

This project is licensed under the GNU v3.0 License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- This project is based on [Monaco Editor](https://microsoft.github.io/monaco-editor/).
- Special thanks to the Flask and Docker communities.

Happy coding!
