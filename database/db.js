var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var options = {
  db: { native_parser: true },
  server: { poolSize: 5 },
  replset: { rs_name: 'myReplicaSetName' },
  user: '',
  pass: ''
};

mongoose.connect('mongodb://127.0.0.1/bt?maxPoolSize=200',options, function(error) {
    if (error) {
        console.log('Cant connect to db', error);
    } else {
      console.log('Connection Successfully');
   }
});
