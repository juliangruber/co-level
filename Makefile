
test:
	@mocha \
		--reporter spec \
		--harmony	

example:
	@node --harmony example

.PHONY: test example
