window.forms = {
    choices:
    {
        "legend": "",
        "name": "choices",
        "autoFocus": false,
        "default": {
            "horizontal": false
        },
        "horizontal": true,
        "actions": [
            {
                "type": "save",
                "action": "save",
                "label": "Submit",
                "modifiers": "btn btn-primary"
            }
        ],
        "fields": [
            {
                "name":"mode",
                "type":"hidden",
                "value":"choices"
            },
            {
                "type": "radio",
                "label": "Please select the choice which best applies to you:",
                "name": "choice",
                "multiple": false,
                "required": "show",
                "showColumn": true,
                "parse":true,
                "options": [
                    {
                        "label": "",
                        "type": "optgroup",
                        "options": [
                            {
                                "label": "I am claiming my account for the first time",
                                "value": "claiming_account"
                            },
                            {
                                "label": "I don't know my password",
                                "value": "forgot_password"
                            },
                            {
                                "label": "I don't know my second factor one-time-password (OTP)",
                                "value": "forgot_otp"
                            },
                            {
                                "label": "I am locked out of my account",
                                "value": "locked_out"
                            },
                            {
                                "label": "I don't know my username",
                                "value": "forgot_username"
                            },
                            {
                                "label": "I know my username / password / one-time-password (OTP) and I want to change my password",
                                "value": "CAS_forgot_password"
                            },
                            {
                                "label": "I know my username / password / one-time-password (OTP) and I want to configure my second factor authentication (2FA)",
                                "value": "CAS_forgot_otp"
                            }
                        ]
                    }
                ],
                "show": [
                    {
                        "op": "and",
                        "conditions": [
                            {
                                "type": "matches",
                                "name": "mode",
                                "value": [
                                    "choices"
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                "type": "output",
                "label": "",
                "name": "text",
                "showColumn": true,
                "edit": false,
                "parse": false,    
                "format": {
                    "value": '<div class="alert alert-warning">Notice to applicants: the account creation process may have intermittent outages. If you are unable to claim your account, please try again later.</div>'
                },
                "show": [
                    {
                        "op": "and",
                        "conditions": [
                            {
                                "type": "matches",
                                "name": "choice",
                                "value": [
                                    "claiming_account"
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                "label": "Username",
                "name": "username",
                "show": [
                    {
                        "op": "and",
                        "conditions": [
                            {
                                "type": "matches",
                                "name": "choice",
                                "value": [
                                    "forgot_password","claiming_account","forgot_otp","locked_out"
                                ]
                            }
                        ]
                    }
                ],
                "required": "show",
                "showColumn": true,
                "type": "text"
            },
            {
                "type": "email",
                "label": "Personal Email Address",
                "name": "personal_email",
                "help": "Specify a personal email address which might be on file",
                "show": [
                    {
                        "op": "and",
                        "conditions": [
                            {
                                "type": "matches",
                                "name": "choice",
                                "value": [
                                    "forgot_username"
                                ]
                            }
                        ]
                    }
                ],
                "required": "show",
                "showColumn": true
            }
        ]
    },
    request_code:
    {
        "legend": "",
        "name": "request_code",
        "autoFocus": true,
        "default": {
            "horizontal": false
        },
        "horizontal": true,
        "actions": [
            {
                "type": "save",
                "action": "save",
                "label": "Request Security Code",
                "modifiers": "btn btn-primary"
            },
            {
                "type": "cancel",
                "action": "notapplicable",
                "label": "I Can't Access These Contacts",
                "modifiers": "btn btn-danger"
            }
        ],
        "fields": [
            {
                "type": "select",
                "label": "Contacts",
                "name": "contact",
                "multiple": false,
                "showColumn": true,
                "options": [
                    {
                        "label": "",
                        "type": "optgroup",
                        "path": "contacts"
                    }
                ]
            }
        ]
    },
    validate_code:
    {
        "legend": "",
        "name": "validate_code",
        "autoFocus": true,
        "default": {
            "horizontal": false
        },
        "horizontal": true,
        "actions": [
            {
                "type": "save",
                "action": "save",
                "label": "Submit",
                "modifiers": "btn btn-primary"
            }
        ],
        "fields": [
            {
                "label": "Security Code",
                "name": "code",
                "showColumn": true,
                "type": "text"
            }
        ]
    }
}