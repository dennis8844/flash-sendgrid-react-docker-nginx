from flask import Blueprint, Response, request, jsonify, json
from email_validator import validate_email, EmailNotValidError
from flask_cors import CORS
import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

api_bp = Blueprint("api", __name__, url_prefix="/api")
CORS(api_bp, resources={r"/*": {"origins": "*"}})
resp_headers = {"Content-Type": "application/json"}


#@cross_origin(allow_headers=['Content-Types'])

@api_bp.route("/test", methods=["GET"])
def index() -> Response:
    """Defines the main website view

        this is used for testing the response
    """
    k = {
        "sender_email": "dpitcock+sendgrid@gmail.com",
        "recipient_email": "dpitcock+sendgrid2@gmail.com",
        "subject": "working yet",
        "message": "body"
    }
    return jsonify(isError= False, message= "Success", statusCode=200, data= k), 200


@api_bp.route("/send-test-email", methods=["POST"])
def send_test_email():
    """

    Pretty boilerplate, I had to enable CORS

    This takes the data, revalidates, then passese it to sendgrid via their package
    it uses variables form the .env file in the server dir

    Note, not all error codes are perfect

    :return:
    """

    request_data = json.loads(request.get_data(as_text=True))
    if len(request_data) > 0:

        #check if all data there and present
        data_errors_dict = {}

        def validate_email_key(email_key, input_dict, errors_dict):
            if not input_dict[email_key]:
                errors_dict[email_key] = "No value at all - empty string or wrong type"
            else:
                try:
                    valid = validate_email(input_dict[email_key])
                except EmailNotValidError as e:
                    # email is not valid, exception message is human-readable
                    errors_dict[email_key] =  str(e)
                    return errors_dict

        validate_email_key("sender_email", request_data, data_errors_dict)
        validate_email_key("recipient_email", request_data, data_errors_dict)

        def validate_value_key(value_key, input_dict, errors_dict):
            if not input_dict[value_key]:
                errors_dict[value_key] = "No value at all - empty string or wrong type"
            else:
                try:
                    valid =input_dict[value_key] is not None
                except KeyError:
                    errors_dict["sender_email"] = "email does not have value"
                    return errors_dict

        validate_value_key("subject", request_data, data_errors_dict)
        validate_value_key("message", request_data, data_errors_dict)

        if len(data_errors_dict) == 0:
            #send on. relabel data accordign to SG's packages requirements
            message = Mail(
                from_email=request_data["sender_email"],
                to_emails=request_data["recipient_email"],
                subject=request_data["subject"],
                html_content=request_data["message"])
            try:
                sendgrid_client = SendGridAPIClient(os.environ.get('SENDGRID_API_KEY'))
                response = sendgrid_client.send(message)
                success_data = {}
                success_data["status"] = "Email sent successfully"
                return jsonify(isError= False, message= "Success", statusCode= 200, data = success_data), 200
            except Exception as e:
                request_data["sg_resp_error"] = str(e)
                return jsonify(isError= True, message= "Server Connection Error", statusCode=500, data =request_data), 500
        else:
            return jsonify(isError= True, message= "Data form client error", statusCode=422, data= data_errors_dict), 422
    else:
        return jsonify(isError= True, message= "Bad or Incomplete Data", statusCode=422), 422





