#!/bin/bash

RORDER="s/Friend/Option/g;s/friend/option/g"
RCUSTOMER="s/Friend/Question/g;s/friend/question/g"

sed $RORDER client/static/js/factories/friendsFactory.js > client/static/js/factories/optionsFactory.js
sed $RCUSTOMER client/static/js/factories/friendsFactory.js > client/static/js/factories/questionsFactory.js

sed $RORDER server/config/route_snippet.js > server/config/option_snippet.js
sed $RCUSTOMER server/config/route_snippet.js > server/config/question_snippet.js

sed $RORDER server/controllers/friends.js > server/controllers/options.js
sed $RCUSTOMER server/controllers/friends.js > server/controllers/questions.js

sed $RORDER server/models/friend.js > server/models/option.js
sed $RCUSTOMER server/models/friend.js > server/models/question.js

cd client/views/partials
touch dashboard.html options.html questions.html products.html