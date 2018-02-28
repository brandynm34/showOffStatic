//import { Router, Request, Response, NextFunction } from 'express';
var AccountController = function (userModel, session, mailer) {
		this.crypto = require('crypto');
		this.uuid = require('node-uuid');
		this.ApiResponse = require('../models/api-response.js');
		this.ApiMessages = require('../models/api-messages.js');
        this.userProfileModel = require('../models/user_profile.js');
        this.registrationModel = require('../models/registration');
		this.userProfileModel = userProfileModel;
		this.session = session;
		this.mailer = mailer;
};

module.exports = AccountController;

exports.read_all_users = function(req, res) {
    User(req.params.userId, function(err, task) {
		if (err)
			res.send(err);
		res.send({type: GET});
		res.json(user);
	});
};

exports.create_user = function(req, res) {
	var newUser = new User(req.body);
	newUser.save(function(err, user) {
		if (err)
			res.send(err);
		res.send({type: POST});
		res.json(user);
	});
};

exports.read_user = function(req, res) {
	User.findById(req.params.userId, function(err, task) {
		if (err)
			res.send(err);
		res.send({type: GET});
		res.json(user);
	});
};

exports.update_user = function(req, res) {
	User.findOneAndUpdate({_id: req.params.userId}, req.body, {new: true}, function(err, task) {
		if (err)
			res.send(err);
		res.send({type: PUT});
		res.json(user);
	});
};

exports.delete_user = function(req, res) {
	User.remove({_id: req.params.userId}, function(err, task) {
		if (err)
			res.send(err);
		res.send({type: DELETE});
		res.json({message: 'User was succesfully deleted'});
	});
};

AccountController.prototype.getSession = function () {
		return this.session;
};

AccountController.prototype.setSession = function (session) {
		this.session = session;
};

AccountController.prototype.hashPassword = function (password, salt, callback) {
		var iterations = 10000,
				keyLen = 64; // 64 bit.
		this.crypto.pbkdf2(password, salt, iterations, keyLen, callback);
};

AccountController.prototype.logon = function(email, password, callback) {
		var me = this;
		me.userModel.findOne({ email: email }, function (err, user) {
				if (err) {
						return callback(err, new me.ApiResponse({ success: false, extras: { msg: me.ApiMessages.DB_ERROR } }));
				}
				if (user) {

					me.hashPassword(password, user.passwordSalt, function (err, passwordHash) {
							if (passwordHash == user.passwordHash) {
								var userProfileModel = new me.UserProfileModel({
										email: user.email,
										firstName: user.firstName,
										lastName: user.lastName
								});

								me.session.userProfileModel = userProfileModel;

								return callback(err, new me.ApiResponse({
										success: true, extras: {
												userProfileModel:userProfileModel
                   	}
                }));
              } else {
									return callback(err, new me.ApiResponse({ success: false, extras: { msg: me.ApiMessages.INVALID_PWD } }));
                }
            });
        } else {
	            return callback(err, new me.ApiResponse({ success: false, extras: { msg: me.ApiMessages.EMAIL_NOT_FOUND } }));
				}

		});
};

AccountController.prototype.logoff = function () {
		if (this.session.userProfileModel) delete this.session.userProfileModel;
			return;
};

AccountController.prototype.register = function (req, res, next) {
    var me = this;
    me.userModel.findOne({ email: newUser.email }, function (err, user) {

        if (err) {
            // return callback(err, new me.ApiResponse({ success: false, extras: { msg: me.ApiMessages.DB_ERROR } }));
						//TODO:can't have returns need to replace with respond json
						res.json({statusCode: 500, success: false, extras: { msg: me.ApiMessages.DB_ERROR }})
        }

        if (user) {
            return callback(err, new me.ApiResponse({ success: false, extras: { msg: me.ApiMessages.EMAIL_ALREADY_EXISTS } }));
        } else {

            newUser.save(function (err, user, numberAffected) {

                if (err) {
                    return callback(err, new me.ApiResponse({ success: false, extras: { msg: me.ApiMessages.DB_ERROR } }));
                }

                if (numberAffected === 1) {

                    var userProfileModel = new me.UserProfileModel({
                        email: user.email,
                        firstName: user.firstName,
                        lastName: user.lastName
                    });

                    return callback(err, new me.ApiResponse({
                        success: true, extras: {
                            userProfileModel: userProfileModel
                        }
                    }));
                } else {
                    return callback(err, new me.ApiResponse({ success: false, extras: { msg: me.ApiMessages.COULD_NOT_CREATE_USER } }));
                }

            });
        }

    });
};

//reset password
AccountController.prototype.resetPassword = function (email, callback) {
    var me = this;
    me.userModel.findOne({ email: email }, function (err, user) {

        if (err) {
            return callback(err, new me.ApiResponse({ success: false, extras: { msg: me.ApiMessages.DB_ERROR } }));
        }

        // Save the user's email and a password reset hash in session. We will use
        var passwordResetHash = me.uuid.v4();
        me.session.passwordResetHash = passwordResetHash;
        me.session.emailWhoRequestedPasswordReset = email;

        me.mailer.sendPasswordResetHash(email, passwordResetHash);

        return callback(err, new me.ApiResponse({ success: true, extras: { passwordResetHash: passwordResetHash } }));
    })
};

AccountController.prototype.resetPasswordFinal = function (email, newPassword, passwordResetHash, callback) {
    var me = this;
    if (!me.session || !me.session.passwordResetHash) {
        return callback(null, new me.ApiResponse({ success: false, extras: { msg: me.ApiMessages.PASSWORD_RESET_EXPIRED } }));
    }

    if (me.session.passwordResetHash !== passwordResetHash) {
        return callback(null, new me.ApiResponse({ success: false, extras: { msg: me.ApiMessages.PASSWORD_RESET_HASH_MISMATCH } }));
    }

    if (me.session.emailWhoRequestedPasswordReset !== email) {
        return callback(null, new me.ApiResponse({ success: false, extras: { msg: me.ApiMessages.PASSWORD_RESET_EMAIL_MISMATCH } }));
    }

    var passwordSalt = this.uuid.v4();

    me.hashPassword(newPassword, passwordSalt, function (err, passwordHash) {

        me.userModel.update({ email: email }, { passwordHash: passwordHash, passwordSalt: passwordSalt }, function (err, numberAffected, raw) {

            if (err) {
                return callback(err, new me.ApiResponse({ success: false, extras: { msg: me.ApiMessages.DB_ERROR } }));
            }

            if (numberAffected < 1) {

                return callback(err, new me.ApiResponse({ success: false, extras: { msg: me.ApiMessages.COULD_NOT_RESET_PASSWORD } }));
            } else {
                return callback(err, new me.ApiResponse({ success: true, extras: null }));
            }
        });
    });


};
