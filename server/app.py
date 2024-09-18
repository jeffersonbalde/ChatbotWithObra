import firebase_admin
from firebase_admin import credentials, auth
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

cred = credentials.Certificate('mobilechatbot-43259-firebase-adminsdk-6doxn-2f313c2b29.json') 
firebase_admin.initialize_app(cred)

@app.route('/users', methods=['GET'])
def get_all_users():
    try:
        all_users = []
        
        page = auth.list_users()

        while page:
            for user in page.users:
                user_data = {
                    'uid': user.uid,
                    'email': user.email,
                    'display_name': user.display_name,
                    'phone_number': user.phone_number,
                    'photo_url': user.photo_url,
                    'disabled': user.disabled,
                    'email_verified': user.email_verified,
                }
                all_users.append(user_data)
            page = page.get_next_page()
        
        return jsonify(all_users), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True) 
