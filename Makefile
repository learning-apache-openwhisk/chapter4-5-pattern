include _config.mk

export MAILGUN_APIKEY
export MAILGUN_SANDBOX
export MAILGUN_RECIPIENT

deploy: prototype.done \
        command \
		strategy \
		bridge \
		composite-visitor
	cd pattern ; wskdeploy

undeploy:
	-rm -v pattern/*/done
	-wsk package delete patterndb
	cd pattern ; wskdeploy undeploy
	-rm -v pattern/*/*.zip 

bind: 
	wsk package bind /whisk.system/cloudant patterndb \
	-p username "$(CLOUDANT_USER)" \
    -p password "$(CLOUDANT_PASS)" \
    -p host "$(CLOUDANT_USER).cloudant.com" \
    -p dbname patterndb
	-wsk action invoke patterndb/create-database -r
	touch prototype.done

unbind: 
	wsk package delete patterndb
	rm prototype.done

prototype.done: 
	make bind

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

