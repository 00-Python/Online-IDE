require.config({
    paths: {
        'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.40.0/min/vs'
    }
});

require(['vs/editor/editor.main'], function () {
    const editor = monaco.editor.create(document.getElementById('editor-container'), {
        value: '',
        language: 'python',
        theme: 'vs-dark'
    });

    const languageSelect = document.getElementById('language-select');
    const runButton = document.getElementById('run-button');
    const outputContainer = document.getElementById('output-container');

    languageSelect.addEventListener('change', function () {
        const selectedLanguage = languageSelect.value;
        const helloWorldCode = getHelloWorldCode(selectedLanguage);
        editor.setValue(helloWorldCode);
        monaco.editor.setModelLanguage(editor.getModel(), selectedLanguage);
    });

    runButton.addEventListener('click', function () {
        const code = editor.getValue();
        const selectedLanguage = languageSelect.value;
        
        // Send code to server for execution
        fetch('/run', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code, language: selectedLanguage }),
        })
        .then(response => response.json())
        .then(data => {
            // Display the output in the outputContainer
            outputContainer.innerText = `Output:\n${data.output}`;
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });

    function getHelloWorldCode(language) {
        switch (language) {
            case 'python':
                return 'print("Hello, World!")';
            case 'java':
                return 'class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}';
            case 'javascript':
                return 'console.log("Hello, World!");';
            default:
                return '';
        }
    }
});
