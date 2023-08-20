import subprocess
import os
from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/run', methods=['POST'])
def run_code():
    data = request.get_json()
    code = data['code']
    language = data['language']

    code_file_path = os.path.join('uploads', 'code.' + language)
    with open(code_file_path, 'w') as file:
        file.write(code)

    docker_image_name = f'code-runner-{language}'
    dockerfile_path = os.path.join('dockerfiles', language, 'Dockerfile')

    try:
        subprocess.run(['docker', 'build', '-t', docker_image_name, '-f', dockerfile_path, '.'], check=True)
        output = subprocess.run(['docker', 'run', '--rm', docker_image_name], stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True, input=code, capture_output=True)
        return output.stdout

    except subprocess.CalledProcessError as e:
        return f"Error: {e.returncode}\n{e.output}"

if __name__ == '__main__':
    app.run(debug=True)

