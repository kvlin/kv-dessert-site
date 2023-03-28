const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const AWS = require('aws-sdk');
const configuration = {
  region: 'us-east-2',
  secretAccessKey: '/XY7Q3Gm9j0qbR4ZZzedQN0Z8xa/lHEGnQrKwwnR',
  accessKeyId: 'AKIAXELGXQGMU25KJ7FA'
}
AWS.config.update(configuration)
const docClient = new AWS.DynamoDB.DocumentClient()
const configTable = "VivConfig"
// Telling passport we want to use a Local Strategy. In other words, we want login with a username/email and password
passport.use(
  new LocalStrategy(

    // Our user will sign in using an email
    {
      usernameField: 'email'
    },
    (email, password, done) => {
      const params = {
        TableName: configTable,
        ExpressionAttributeNames: {
          "#co": "configs"
        },
        // values use aliases with : prefix 
        ExpressionAttributeValues: {
          ":users": "users"
        },
        // specifies the search criteria
        KeyConditionExpression: "#co = :users",
      };
      // query dynamodb
      docClient.query(params, (err, results) => {
        if (err) {
          res.status(500).json(err)
        } else {
          fetchedUsers = results.Items[0].values[0]
          if (fetchedUsers.hasOwnProperty(email)) {
            console.log(fetchedUsers[email])
            // res.json({ email: email, password: fetchedUsers[email] })
            const hash = fetchedUsers[email].toString()

            // If the email exists
            bcrypt.compare(password, hash, (err, result) => {
              // If the input password was correct
              if (result === true) {
                return done(null, { email: email, password: fetchedUsers[email] })
              }
              // If incorrect password
              console.log('Incorrect password')
              return done(null, false, {
                message: 'Incorrect password.'
              })
            })
          } else {
            console.log('Email not found')
            return done(null, false, {
              message: 'Email not found.'
            })
          }


        }
      })

      // .then(dbUser => {
      //   // If the email does not exist
      //   if (!dbUser) {
      //     console.log('Incorrect Email')
      //     return done(null, false, {
      //       message: 'Incorrect email.'
      //     })
      //   }

      //   const hash = dbUser.password.toString()

      //   // If the email exists
      //   bcrypt.compare(password, hash, (err, result) => {
      //     // If the input password was correct
      //     if (result === true) {
      //       return done(null, dbUser)
      //     }
      //     // If incorrect password
      //     console.log('Incorrect password')
      //     return done(null, false, {
      //       message: 'Incorrect password.'
      //     })
      //   })
      // })
    }
  )
)

// In order to help keep authentication state across HTTP requests,
// Sequelize needs to serialize and deserialize the user
// Just consider this part boilerplate needed to make it all work
passport.serializeUser((user, cb) => {
  cb(null, user)
})

passport.deserializeUser((obj, cb) => {
  cb(null, obj)
})

// Exporting our configured passport
module.exports = passport
