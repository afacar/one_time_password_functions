const twilio = require('twilio');

const accountSid = 'ACd12eb9051d39d2645748d27bb45455e0';
const authToken = 'f0ff5d2e4d1dfe6846c183cda4653b56';

module.exports = new twilio.Twilio(accountSid, authToken);
