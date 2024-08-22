const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const con = require("./connection.js");
const multer = require("multer");
const fs = require("fs");
const crypto = require("crypto");
const { Web3 } = require("web3");

// 0x5e9471Bae2bf7f496E99fC0cE503D9c1c08D938f

const web3 = new Web3(
  "https://eth-sepolia.g.alchemy.com/v2/QN0xK0QkO0DomFMfxewMLzKgxALAlg61"
);

const contractAbi = require("./abi.json"); // ABI of your smart contract
const { AsyncLocalStorage } = require("async_hooks");

const contractAddress = "0x5e9471Bae2bf7f496E99fC0cE503D9c1c08D938f"; // Address of your smart contract
const contract = new web3.eth.Contract(contractAbi, contractAddress);

var count = 0;
var login = {
  emailforlogin: "",
  passowrdforlogin: "",
};

function calculateHash(filePath) {
  return new Promise((resolve, reject) => {
    const hash = crypto.createHash("sha256");
    const input = fs.createReadStream(filePath);

    input.on("error", (err) => {
      reject(err);
    });

    hash.setEncoding("hex");

    input.pipe(hash);

    input.on("end", () => {
      hash.end();
      resolve(hash.read());
    });
  });
}

// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Preserve original file name
  },
});

const upload = multer({ storage: storage });

app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static(__dirname));

/*con.query("select * from signup",function(error,result){ 
  if(error)  console.log("error")
  else  { console.log(result) 
console.log(result[0].password) 
 }})*/

con.connect(function (error) {
  if (error) {
    console.log("error");
  } else {
    console.log("connected to db from node js");
  }
});

const session = require('express-session');
app.use(session({
  secret: 'abcd1234',
  resave: false,
  saveUninitialized: true
}));

// Route to handle form submissions from signup.html
// dbOperations.js
//const con = require('./connection'); // Assuming connection.js exports the database connection


var gcnic;
var gpassword;
app.get("/login", (req, res) => {
  con.query("select * from signup", function (error, result) {
    //console.log(result);
    res.json(result);
  });
  // Send the signup data as JSON response
});

app.post('/signup', function(req, res) {
  var cnic = req.body.CNIC;
  var fullname = req.body.fullname;
  var contactNumber = req.body.contactNumber;
  var email = req.body.email;
  var password = req.body.password;
  var confirmPassword = req.body.confirmpassword;

  // Check if password matches confirmPassword and they are not empty
  if (password !== '' && confirmPassword !== '' && password === confirmPassword && password.length > 8) {
      // Query to check if the contactNumber or email already exists
      var checkQuery = "SELECT COUNT(*) AS count FROM signup WHERE contactno = ? OR email = ? OR cnic = ?";
      con.query(checkQuery, [contactNumber, email,cnic], function(error, results) {
          if (error) {
              console.log("Database error:", error);
             // res.status(500).send("Internal Server Error");
          } else {
              // If contactNumber or email already exists, don't insert new data
              if (results[0].count > 0) {
                  console.log("Contact number or email already exists in the database.");
                  var msg = "Contact number or email already exists in the database.";
                //  res.status(400).json({ error: msg });
              } else {
                  // Insert new data into the database
                  var insertQuery = "INSERT INTO signup (`cnic`, `fullname`, `contactno`, `email`, `password`) VALUES (?, ?, ?, ?, ?)";
                  con.query(insertQuery, [cnic, fullname, contactNumber, email, password], function(error, result) {
                      if (error) {
                          console.log("Insertion error:", error);
                          //res.status(500).send("Internal Server Error");
                      } else {
                          console.log("Data inserted successfully.");
                          //res.status(200).send("Data inserted successfully.");
                      }
                  });
                  /*var insertQuery2 = "INSERT INTO users (`cnic`,  `password`) VALUES (?, ?)"; 
                  con.query(insertQuery2, [cnic, password], function(error, result) {
                    if (error) {
                        console.log("Insertion error:", error);
                        //res.status(500).send("Internal Server Error");
                    } else {
                        console.log("Data inserted successfully into users.");
                        //res.status(200).send("Data inserted successfully.");
                    }
                }); */
              }
          }
      });
  } else {
      console.log("Passwords do not match or are empty.");
    //  res.status(400).send("Passwords do not match or are empty.");
  }
});


// GET endpoint for checking if email or contact number already exists
app.get('/signup', function(req, res) {
  var contactNumber = req.query.contactNumber;
  var email = req.query.email;
  var cnic = req.query.username;

  // Query to check if the contactNumber or email already exists
  var checkQuery = "SELECT * FROM signup WHERE contactno = ? OR email = ? OR cnic = ?";
  con.query(checkQuery, [contactNumber, email,cnic], function(error, results) {
      if (error) {
          console.log("Database error:", error);
          // Send an error response in case of a database error
          res.status(500).send("Internal Server Error");
      } else {
        var contactExists = results.some(result => result.contactno === contactNumber.toString());
          var emailExists = results.some(result => result.email === email);
          var cnicExists = results.some(result => result.cnic === cnic.toString());
  
          if (contactExists && emailExists && cnicExists) {
              console.log("Contact number , cnicn and email already exist in the database.");
              var msg = "contact number , cnic and email are already taken.";
              console.log(results);
              res.json(msg);
          } else if (contactExists && emailExists ) {
              console.log("Contact number ande email already exists in the database.");
              var msg = "Contact number and email is already taken.";
              console.log(results);
              res.json(msg);
          } 
          else if (contactExists && cnicExists ) {
            console.log("Contact number ande cnic already exists in the database.");
            var msg = "Contact number and cnic is already taken.";
            console.log(results);
            res.json(msg);
        } 
        else if (emailExists && cnicExists ) {
          console.log("cnic ande email already exists in the database.");
          var msg = "cnic and email is already taken.";
          console.log(results);
          res.json(msg);
      } 
          else if (contactExists) {
            console.log("Contact number already exists in the database.");
            var msg = "Contact number is already taken.";
            console.log(results);
            res.json(msg);
        } 
          else if (emailExists) {
              console.log("Email already exists in the database.");
              var msg = "Email is already taken.";
              console.log(results);
              res.json(msg);
          }
          else if (cnicExists) {
            console.log("cnic already exists in the database.");
            var msg = "cnic is already taken.";
            console.log(results);
            res.json(msg);
        }
        else if (cnic.length < 14 ) {
          console.log("length of cnic is not correct.");
          var msg = "length of cnic is not correct.";
          console.log(results);
          res.json(msg);
      }
      else if (contactNumber.length < 11 ) {
        console.log("length of contact no is not correct.");
        var msg = "length of contact no is not correct.";
        console.log(results);
        res.json(msg);
    }
           else {
              // Send a success response if neither contact number nor email is taken
              res.status(200).json({ success: true });
          }
      }
  });
});

app.post('/login', function(req, res) {

  
  var email = req.body.email; // CNIC
  var password = req.body.password;

  gcnic =  req.body.email;
  password = req.body.password;

  // Validate input to ensure email (CNIC) and password are not null or empty
  if (!email || !password) {
    console.log("Email or password cannot be null or empty");
    //return res.status(400).send("Email and password are required");
  }

  // Step 1: Check if the CNIC and password combination exists in the signup table
  var checkSignupSql = "SELECT * FROM signup WHERE cnic = ? AND password = ?";
  con.query(checkSignupSql, [email, password], function(err, results) {
    if (err) {
      console.log("Error checking signup data:", err.message);
     // return res.status(500).send("Server error");
    }

    if (results.length > 0) {
      // Step 2: CNIC and password exist in signup table, check if CNIC already exists in the users table
      var checkUserSql = "SELECT * FROM users WHERE cnic = ?";
      con.query(checkUserSql, [email], function(err, userResults) {
        if (err) {
          console.log("Error checking users table:", err.message);
          return res.status(500).send("Server error");
        }

        if (userResults.length > 0) {
          // CNIC already exists in the users table, do not insert
          console.log("Record with this CNIC already exists in users table");
          // Set session user data
          req.session.user = {
            cnic: email
          };
          
          console.log("User logged in and session created.");
          //res.json({ success: true });
          console.log(gcnic);
          
        } else {
          console.log(gcnic);
          const createTableQuery = 'CREATE TABLE `' + gcnic + '` (' +
    'area INT(11),' +
    'city VARCHAR(255),' +
    'walletaddress VARCHAR(255),' +
    'price DECIMAL(10,2),' +
    'property_number INT(11),' +
    'landImage VARCHAR(255),' +
    'frc VARCHAR(255),' +
    'powerofAttorney VARCHAR(255),' +
    'wallet_address VARCHAR(255),' + // New column
    'name VARCHAR(100),' +            // New column
    'age INT(11),' +                  // New column
    'buyers_city VARCHAR(100)' +             // New column (note: this duplicates the 'city' column, which might be unintended)
    ');';
    con.query(createTableQuery, function (err, results) {
      if (err) {
          console.error('Error creating table: ' + err.message);
          return;
      }
      console.log('Table created successfully');
  });
          // CNIC does not exist in the users table, insert new record
          var insertSql = "INSERT INTO users (cnic, password) VALUES (?, ?)";
          con.query(insertSql, [email, password], function(err, result) {
            if (err) {
              console.log("Error inserting new record:", err.message);
              return res.status(500).send("Server error");
            }
            console.log("Record inserted successfully");
            // Set session user data
            req.session.user = {
              cnic: email
            };
            res.status(201).json({ success: true });
          });
        }
      });
    } else {
      // CNIC and password do not exist in signup table
      console.log("No matching record found in signup table");
     // res.status(400).send("No matching record found in signup table");
    }
  });
});

var propno;

app.post(
  "/sellerform",
  upload.fields([
    { name: "landImage" },
    { name: "frc" },
    { name: "powerOfAttorney" },
  ]),
  async function (req, res) {
    const { area, city, walletAddress, price, propertyNumber } = req.body;
    const landImage = req.files["landImage"] ? req.files["landImage"][0].filename : null;
    const frc = req.files["frc"] ? req.files["frc"][0].filename : null;
    const powerOfAttorney = req.files["powerOfAttorney"] ? req.files["powerOfAttorney"][0].filename : null;
    console.log(gcnic);
    propno = req.body.propertyNumber;
    var cnic = req.body.cnic;
    console.log(cnic)
    console.log(propno);
    // Check if propertyNumber already exists in the database
   // const checkQuery = "SELECT * FROM sellerform WHERE property_number = ?";
    const checkQuery = 'SELECT * FROM `' + gcnic + '` WHERE property_number = ?';
    con.query(checkQuery, [propertyNumber], async function (error, results) {
      if (error) {
        console.log("Query error:", error);
        return res.status(500).send("Internal Server Error");
      }

      if (results.length > 0) {
        // Property number already exists
       // res.json({ success: true, message: "Property number already exists." });
       return res.status(400).json({ success: false, message: "Property number already exists." });
      }

      // Proceed with hash verification and insertion if property number does not exist
      console.log(req.body);
      console.log(landImage);
      console.log(frc);

      const filePath = `uploads/${frc}`;
      var frcHash = "0x";
      var hash = await calculateHash(filePath);
      console.log(`SHA-256 Hash of ${filePath}:`);
      console.log(hash);
      frcHash = frcHash + hash.toString();
      console.log(frcHash);

      const result = await contract.methods.verifyPDFHash(frcHash.toString()).call();
      console.log("Result of hashing is", result);
      res.json({ success: true, result: result });
      console.log(typeof cnic, cnic);
      console.log(typeof gcnic, gcnic);
     if (cnic.trim() === gcnic.trim()) {
      if(result){
        const insertQuery1 = "INSERT INTO sellerform (area, city, walletaddress, price, property_number, landImage, frc, powerOfAttorney ,cnic) VALUES (?, ?, ?, ?, ?, ?, ?, ?,?)";
        con.query(insertQuery1,[area, city, walletAddress, price, propertyNumber, landImage, frc, powerOfAttorney , gcnic], (err, results) => {
          if (err) {
              console.error('Error executing query:', err);
              return;
          }
          console.log('Record inserted successfully:', results);
      });
        const insertQuery = 'INSERT INTO `' + gcnic + '` (area, city, walletaddress, price, property_number, landImage, frc, powerOfAttorney) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        con.query(insertQuery, [area, city, walletAddress, price, propertyNumber, landImage, frc, powerOfAttorney], function (error) {
          if (error) {
            console.log("Insertion error:", error);
            return ;
          } else {
            console.log("Data inserted successfully.");

            return ;
          }
        });
      }  

    }
    else {
    
      }
    });
  }
);

// Fetch data from the sellerform table
app.get("/landgallery", (req, res) => {
  //const query = "SELECT area, city, property_number, price, landImage FROM sellerform";
  const query = 'SELECT area, city, property_number, price, landImage FROM `' + gcnic + '`';
  con.query(query, (error, results) => {
      if (error) {
          console.error("Error fetching land data:", error);
          res.status(500).send("Internal Server Error");
      } else {
          res.json(results);  // Send the results as a JSON response
      }
  });
});

app.get("/seller", (req, res) => {
  const query = 'SELECT area, city, property_number, price FROM `' + gcnic + '`';
  con.query(query, (error, results) => {
      if (error) {
          console.error("Error fetching land data:", error);
          res.status(500).send("Internal Server Error");
      } else {
          res.json(results);  // Send the results as a JSON response
      }
  });
});

app.post("/buyerform", function (req, res) {
  const name = req.body.name || null;
  const newAddress = req.body.wallet_address || null;
  const city = req.body.city || null;
  const age = parseInt(req.body.age, 10) || null;

  if (!name || !newAddress || !city || age === null) {
    return res.status(400).send('Please fill in all fields');
}

  // Ensure gcnic is defined and valid
  if (!gcnic) {
      return res.status(500).send('Table name is not defined');
  }

  // Check if there's any existing record with a wallet addres
  const sqlCheck = 'SELECT * FROM `' + gcnic + '` WHERE wallet_address IS NOT NULL LIMIT 1';
  //const sqlCheck = 'SELECT * FROM `' + gcnic + '` LIMIT 1';
  con.query(sqlCheck, function (err, results) {
      if (err) {
          console.error('Database error:', err);
          res.status(500).send('Database error');
          return;
      }

      if (results.length > 0) {
          const existingAddress = results[0].wallet_address;

          if (existingAddress === newAddress) {
              // Condition 1: Same wallet address exists
             /* const sqlUpdate = 'UPDATE `' + gcnic + '` SET name = ?, age = ?, buyers_city = ? WHERE wallet_address = ?';
              con.query(sqlUpdate, [name, age, city, newAddress], function (err, result) {
                  if (err) {
                      console.error('Error updating data in database:', err);
                      res.status(500).send('Error updating data');
                      return;
                  }

                  res.send('Profile updated with the same address');
              });*/
              res.send(' address taken');
          } else {
              // Condition 2: Different wallet address exists
              const sqlUpdate = 'UPDATE `' + gcnic + '` SET name = ?, age = ?, buyers_city = ?, wallet_address = ? WHERE wallet_address = ?';
              con.query(sqlUpdate, [name, age, city, newAddress, existingAddress], function (err, result) {
                  if (err) {
                      console.error('Error updating data in database:', err);
                      res.status(500).send('Error updating data');
                      return;
                  }

                  res.send('Profile updated with a new address');
              });
          }
      } else {
          // Condition 3: No wallet address exists
          const sqlInsert = 'INSERT INTO `' + gcnic + '` (wallet_address, name, age, buyers_city) VALUES (?, ?, ?, ?)';
          con.query(sqlInsert, [newAddress, name, age, city], function (err, result) {
              if (err) {
                  console.error('Error inserting data into database:', err);
                  res.status(500).send('Error inserting data');
                  return;
              }
              res.send('Data inserted successfully');
          });
      }
  });
});

app.get("/buyer", (req, res) => {
  // Query to select wallet_address, name, buyers_city, age from gcnic table and email from signup table
  const sqlQuery = `
    SELECT g.wallet_address, g.name, g.buyers_city, g.age, s.email, s.cnic
    FROM \`${gcnic}\` g
    JOIN signup s ON s.cnic = ?
  `;

  con.query(sqlQuery, [gcnic], function (error, results) {
    if (error) {
      console.error('Database error:', error);
      res.status(500).send('Database error');
      return;
    }

    // Log the results for debugging
    console.log(results);

    // Send the data as a JSON response
    res.json(results);
  });
});

app.get('/search', (req, res) => {
  console.log("gcnic");
  const squareYards = req.query.squareYards; // Extract squareYards from query parameters
  console.log('Received squareYards:', squareYards); 
  console.log(gcnic);// Debugging to ensure data is received

  // Replace with the actual value of gcnic

  const query = 'SELECT area, city, walletaddress, price, property_number,cnic  FROM sellerform WHERE area = ? AND cnic != ?';
  
  // Execute the query with the squareYards value and gcnic as parameters
  con.query(query, [squareYards, gcnic], (err, results) => {
      if (err) {
          console.error('Error fetching data:', err);
          res.status(500).send('Server error');
          return;
      }
      res.json(results); // Send the filtered results to the frontend
  });
});

app.get("/forgotpassword", (req, res) => {
  con.query("select * from signup", function (error, result) {
    console.log(result);
    res.json(result);
  });
  // Send the signup data as JSON response
});

app.post("/confirmPassword", (req, res) => {
  console.log(req.body);

  const email = req.body.emailc; // Extract email from request body
  const newPassword = req.body.newPassword;
  const confirmPassword = req.body.confirmPassword;

  console.log(email);
  console.log(newPassword);
  console.log(confirmPassword);
  if (
    newPassword !== confirmPassword ||
    newPassword === "" ||
    confirmPassword === ""
  ) {
    console.log("Passwords do not match");
    //res.status(400).send("Passwords do not match"); // Respond with an error status
    return;
  }
  // Update the password in the database
  const sql = "UPDATE signup SET password = ? WHERE email = ?";
  con.query(sql, [newPassword, email], (err, result) => {
    if (err) {
      console.error("Error updating password:", err);
      // res.status(500).send("Error updating password"); // Respond with an error status
      return;
    }

    console.log("Password updated successfully");

    // res.status(200).send("Password updated successfully"); // Respond with a success status
  });
});
/*
app.get('/api/get-buyer-data', (req, res) => {
  const cnic = req.query.cnic;
console.log("buyer cnic "+gcnic)
  // Query to fetch data based on CNIC
  con.query('SELECT * FROM `' + cnic + '` ', [cnic], (error, results) => {
      if (error) {
          return res.status(500).json({ error: 'Database error' });
      }

      if (results.length > 0) {
          // Assuming only one record per CNIC
          res.json(results[0]);
      } else {
          res.status(404).json({ error: 'Buyer not found' });
      }
  });
});*/
app.get('/api/get-buyer-data', (req, res) => {
  const cnic = req.query.cnic;
  // Assuming gcnic is passed as a query parameter

  console.log("seller cnic: " + cnic);
  console.log("buyer cnic: " + gcnic);

  // Select data from the gcnic table
  con.query('SELECT wallet_address, name, age, buyers_city FROM ??', [gcnic], (selectError, selectResults) => {
      if (selectError) {
          return res.status(500).json({ error: 'Database error while selecting data' });
      }

      if (selectResults.length > 0) {
          // Filter out rows where any of the required fields are null
          const filteredResults = selectResults.filter(row => 
              row.wallet_address && row.name && row.age !== null && row.buyers_city
          );

          if (filteredResults.length > 0) {
              const newTableName = `${cnic}LR`;
              

              // Create the new table
              con.query(`
                  CREATE TABLE IF NOT EXISTS \`${newTableName}\` (
                      wallet_address VARCHAR(255),
                      name VARCHAR(255),
                      age INT,
                      buyers_city VARCHAR(255)
                  );
              `, (createError) => {
                  if (createError) {
                      return res.status(500).json({ error: 'Error creating new table' });
                  }

                  // Prepare the data for insertion
                  const insertData = filteredResults.map(row => [
                      row.wallet_address,
                      row.name,
                      row.age,
                      row.buyers_city
                  ]);

                  // Insert data into the new table
                  con.query(`
    SELECT wallet_address FROM \`${newTableName}\` WHERE wallet_address IN (?)
`, [insertData.map(data => data[0])], (selectError, results) => {
    if (selectError) {
        return res.status(500).json({ error: 'Error checking existing wallet addresses' });
    }

    // Filter out records where wallet_address already exists
    const existingWalletAddresses = results.map(row => row.wallet_address);
    const filteredData = insertData.filter(data => !existingWalletAddresses.includes(data[0]));

    if (filteredData.length > 0) {
        con.query(`
            INSERT INTO \`${newTableName}\` (wallet_address, name, age, buyers_city)
            VALUES ?
        `, [filteredData], (insertError) => {
            if (insertError) {
                return res.status(500).json({ error: 'Error inserting data into new table' });
            }

            res.json({ message: 'Data processed and inserted successfully' });
        });
    } else {
        res.json({ message: 'No new wallet addresses to insert' });
    }
});
              });
          } else {
              res.status(404).json({ error: 'No valid data found to insert' });
          }
      } else {
          res.status(404).json({ error: 'No data found for the given CNIC' });
      }
  });
});
/*
app.get('/api/fetch-requests', (req, res) => {
  const cnic = req.sellerCnic; // Get the CNIC of the logged-in seller

  // Construct the query to get requests from the table named after the CNIC
  const query = 'SELECT * FROM ??';

  // Execute the query with the table name as a parameter
  con.query(query, [cnic], (error, results) => {
      if (error) {
          console.error('Error fetching requests:', error);
          return res.status(500).json({ error: 'Internal server error' });
      }

      res.json(results);
  });
});*/

app.get('/landrequest', (req, res) => {
  console.log('Request received at /landrequest');
  
 // const gcnic = 'yourGcnicValue'; // Replace with actual value or logic
  const newTableName = `${gcnic}lr`;

  console.log('Using table name:', newTableName);

  const sql = `SELECT * FROM ??`;

  con.query(sql, [newTableName], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    console.log('Query results:', results);
    res.json(results);
  });
});

app.get('/totalseller', (req, res) => {
  const query = 'SELECT area, city, walletaddress, price, property_number FROM sellerform';
  
  con.query(query, (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'An error occurred while fetching data' });
      return;
    }
    res.json(results);
  });
});



// Send the signup data as JSON response

app.listen(5500);
//module.exports = { getSignupData };
module.exports = login;

//<button type="submit" class="btn btn-success btn-block" onclick="portal()">Sign Up</button>
//<input type="submit" class="btn">
