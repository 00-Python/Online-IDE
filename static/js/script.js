require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.40.0/min/vs' }});
require(['vs/editor/editor.main'], function() {
    var editor = monaco.editor.create(document.getElementById('editor-container'), {
        value: [
            'print("Hello, world!")'
        ].join('\n'),
        language: 'python'
    });

    document.getElementById('run-button').addEventListener('click', function() {
        var code = editor.getValue();
        var language = document.getElementById('language-select').value;

        fetch('/run', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ code: code, language: language })
        })
        .then(response => response.text())
        .then(output => {
            document.getElementById('output-container').textContent = output;
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});

