// Get references to DOM elements
const languageSelect = document.getElementById('language-select');
const codeEditor = monaco.editor.create(document.getElementById('editor'), {
  value: getDefaultCode(),
  language: 'python', // Set the default language to Python
});

// Mapping of programming languages to their respective default code
const defaultCodeMap = {
  'python': `print("Hello, World!")`,
  'javascript': `console.log("Hello, World!");`,
  'java': `public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
};

// Initialize the Monaco editor with default code
function getDefaultCode() {
  const defaultLanguage = 'python'; // Set the default language here
  return defaultCodeMap[defaultLanguage];
}

// Update the code editor when a new language is selected
languageSelect.addEventListener('change', () => {
  const selectedLanguage = languageSelect.value;
  codeEditor.setValue(defaultCodeMap[selectedLanguage] || '');
  codeEditor.setModelLanguage(codeEditor.getModel(), selectedLanguage);
});

// Function to run the code and display output
async function runCode() {
  const code = codeEditor.getValue();
  const selectedLanguage = languageSelect.value;

  // Make a POST request to the server to run the code
  try {
    const response = await fetch('/run', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        code: code,
        language: selectedLanguage,
      }),
    });

    if (response.ok) {
      const result = await response.text();
      document.getElementById('output').textContent = result;
    } else {
      console.error('Error running code:', response.statusText);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}
