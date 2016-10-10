
BIN_DIR = node_modules/.bin
STANDARD = $(BIN_DIR)/standard
WATCHIFY = $(BIN_DIR)/watchify
SASS = $(BIN_DIR)/node-sass
MOCHA = $(BIN_DIR)/_mocha
ISTANBUL = $(BIN_DIR)/istanbul
STYLELINT = $(BIN_DIR)/stylelint

.PHONY: stylelint
stylelint:
	$(STYLELINT) css/*.scss components/**/*.scss

.PHONY: standard
standard:
	$(STANDARD)

.PHONY: watch
watch:
	$(WATCHIFY) examples/js/script.js \
		--outfile examples/js/script.min.js \
		--debug \
		--verbose \
		--transform [ babelify --presets [ es2015 react stage-0 react-hmre ] ]\
		--plugin browserify-hmr

.PHONY: css
css:
	$(SASS) examples/css/styles.scss examples/css/styles.min.css
	$(SASS) --watch examples/css/styles.scss examples/css/styles.min.css

.PHONY: serve
serve:
	cd examples && python -m SimpleHTTPServer 5000

.PHONY: test
test:
	$(STANDARD) && $(STYLELINT) && $(ISTANBUL) cover $(MOCHA) test/.setup.js components/**/test/test.js
