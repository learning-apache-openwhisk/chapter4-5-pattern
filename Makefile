include _config.mk

export MAILGUN_APIKEY
export MAILGUN_SANDBOX
export MAILGUN_RECIPIENT

all: deploy
	wsk action get pattern/mvc-controller --url

deploy: bind.done \
		proxy.done \
        command \
		strategy \
		bridge \
		composite-visitor
	cd pattern ;\
	env PROXY_URL=$$(wsk action get pattern-proxy-sendmail --url | tail -1) \
	wskdeploy

undeploy:
	cd pattern ; wskdeploy undeploy

clean: 
	make undeploy
	make unproxy
	make unbind
	-rm -v pattern/*/done
	-rm -v pattern/*/*.zip 

bind: 
	wsk package bind /whisk.system/cloudant patterndb \
	-p username "$(CLOUDANT_USER)" \
    -p password "$(CLOUDANT_PASS)" \
    -p host "$(CLOUDANT_USER).cloudant.com" \
    -p dbname patterndb
	-wsk action invoke patterndb/create-database -r

bind.done: 
	make bind
	touch bind.done

unbind: 
	-wsk action invoke patterndb/delete-database -r
	wsk package delete patterndb
	test -e bind.done && rm bind.done

proxy:
	wsk action update \
	pattern-proxy-sendmail pattern/proxy/sendmail.js \
	-P _mailgun.json --web true
	
proxy.done:
	make proxy
	touch proxy.done

unproxy:
	wsk action delete pattern-proxy-sendmail
	test -e proxy.done && rm proxy.done

%.zip: %.js
	bash scripts/pack.sh $@

strategy: \
  pattern/strategy/name.zip \
  pattern/strategy/phone.zip \
  pattern/strategy/email.zip 

command: pattern/command/database.zip

bridge: pattern/bridge/formsave.zip

composite-visitor: pattern/composite-visitor/view.zip

.PHONY: deploy undeploy bind unbind proototype strategy command bridge composite-visitor

