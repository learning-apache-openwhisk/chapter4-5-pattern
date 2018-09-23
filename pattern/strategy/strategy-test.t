  $ source $T/../../aliases
  $ export P=pattern/strategy
  $ wkai $P-name -r
  {
      "errors": [
          "missing name"
      ],
      "message": []
  }
  $ wkai $P-name -p name Mike -r
  {
      "errors": [],
      "message": [
          "name: Mike"
      ],
      "name": "Mike"
  }
  $ wkai $P-email -r
  {
      "errors": [
          "missing email"
      ],
      "message": []
  }
  $ wkai $P-email -r -p email michele
  {
      "email": "michele",
      "errors": [
          "michele does not look like an email"
      ],
      "message": []
  }
  $ wkai $P-email -r -p email michele@sciabarra.com 
  {
      "email": "michele@sciabarra.com",
      "errors": [],
      "message": [
          "email: michele@sciabarra.com"
      ]
  }
  $ wkai $P-phone -r 
  {
      "errors": [
          "missing phone"
      ],
      "message": []
  }
  $ wkai $P-phone -r -p phone 12345
  {
      "errors": [
          "12345 does not look like a phone number"
      ],
      "message": [],
      "phone": 12345
  }
  $ wkai $P-phone -r -p phone 1234567890
  {
      "errors": [],
      "message": [
          "phone: 1234567890"
      ],
      "phone": 1234567890
  }
