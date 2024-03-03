from flask import Flask, request, jsonify
from flask_mysql_connector import MySQL

app = Flask(__name__)
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'password'
app.config['MYSQL_DB'] = 'sys'

mysql = MySQL(app)

CREATE_TABLE_QUERY = """
CREATE TABLE IF NOT EXISTS devices (
    id INT AUTO_INCREMENT PRIMARY KEY,
    serial VARCHAR(255),
    defects TEXT,
    origin TEXT,
    os VARCHAR(50),
    device_name VARCHAR(255)
)
"""

@app.route('/submit-form', methods=['POST'])
def submit_form():
    data = request.json
    serial = data.get('serial')
    defects = data.get('defects')
    origin = data.get('origin')
    os = data.get('os')
    device_name = data.get('device_name')

    try:
        cur = mysql.connection.cursor()
        cur.execute(CREATE_TABLE_QUERY)
        cur.execute("INSERT INTO devices (serial, defects, origin, os, device_name) VALUES (%s, %s, %s, %s, %s)", (serial, defects, origin, os, device_name))
        mysql.connection.commit()
        cur.close()

        return jsonify(message='Device added successfully'), 201
    except Exception as e:
        return jsonify(error=str(e)), 500

if __name__ == "__main__":
    app.run(debug=True)
