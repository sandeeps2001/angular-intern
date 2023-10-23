// Require:
var postmark = require("postmark");

// Send an email:
var client = new postmark.ServerClient("3e7d22bc-90f8-4721-a3cd-e371eb0d5e11");

const name = 'Cajig 23354'

client.sendEmailWithTemplate({
    "From": "cajig23354@extemer.com",
    "To": "cajig23354@extemer.com",
    "TemplateAlias": "user-invitation",
    "TemplateModel": {
        "product_url": "http://localhost:5000/login",
        "product_name": "Administrator App",
        "name": name,
        "action_url": "http://localhost:5000/login",
        "company_name": "Administrator App",
        "company_address": "Bangalore, Karnataka, India"
    }
});