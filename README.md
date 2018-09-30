# Chapter 4 and 5 examples

To deploy, first get 

- An Access to OpenWhisk, with a configured `wsk` command line with tokens.
- Cloudant User and Password
- Mailgun Api key and Sandbox domain
- Pick an email recipient of the contact form

Then type `./configure.sh <user> <pass> <apikey> <sandbox> <recipient>`

You can now deploy with `make deploy` and undeploy with `make clean`
