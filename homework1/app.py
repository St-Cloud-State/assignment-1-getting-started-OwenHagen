from flask import Flask, jsonify, render_template, request

app = Flask(__name__)

# Store applications as a dictionary
applications = {}
next_application_number = 1  # Counter for generating unique application numbers


@app.route('/api/accept_application', methods=['POST'])
def accept_application():
    global next_application_number

    data = request.get_json()
    name = data.get('name')
    zipcode = data.get('zipcode')

    if not name or not zipcode:
        return jsonify({'error': 'Name and zipcode are required'}), 400

    # Assign a new application number
    application_number = next_application_number
    next_application_number += 1

    # Save the application
    applications[application_number] = {'name': name, 'zipcode': zipcode, 'status': 'received'}
    return jsonify({'application_number': application_number})


@app.route('/api/check_status/<int:application_number>', methods=['GET'])
def check_status(application_number):
    application = applications.get(application_number)
    if application:
        return jsonify({'status': application['status']})
    else:
        return jsonify({'status': 'not found'}), 404


@app.route('/api/change_status', methods=['POST'])
def change_status():
    data = request.get_json()
    application_number = int(data.get('application_number'))
    new_status = data.get('status')

    if application_number not in applications:
        return jsonify({'error': 'Application not found'}), 404

    applications[application_number]['status'] = new_status
    return jsonify({'message': f"Status updated to {new_status}"})


@app.route('/')
def index():
    return render_template('index.html')


if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0")
