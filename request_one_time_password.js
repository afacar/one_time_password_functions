const admin = require('firebase-admin');
const twilio = require('./twilio');

module.exports = function (req, res) {
    if (!req.body.phone) {
        return res.status(422).send({ error: 'You must provide the number' });
    }
    const phone = '+' + String(req.body.phone).replace(/[^\d]/g, ''); 
    console.log("check the number: ", phone);
    admin.auth().getUser(phone)
    .then(userRecord => {
        const code = Math.floor((Math.random() * 8999 + 1000 ));
        
        twilio.messages.create({
            body: 'Your code is ' + code,
            to: phone,
            from: '+18654019381'
        }, (err) => {
            if (err) { 
                return res.status(422).send({ err: "Twilio Error--> " + err }); 
            }

            // Real big GOTCHA with firebase: we cannot use Authentication to store code

            admin.database().ref('users/' + phone)
            .update({ code: code, codeValid: true }, () => {
                res.send({ success: true });
            });
        });
        return null;
    })
    .catch((err) => {
        res.status(422).send({ error: "No such user in Firebase--> ", err });
    });
}