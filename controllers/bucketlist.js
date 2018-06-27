//Require the express package and use express.Router()
const express = require('express');
const router = express.Router();
const bucketlist = require('../models/List');

//GET HTTP method to /bucketlist
router.get('/',(req,res) => {
   // res.send("GET");
   bucketlist.getAllLists((err, lists)=> {
    if(err) {
        res.json({success:false, message: `Failed to load all lists. Error: ${err}`});
    }
    else {
        res.write(JSON.stringify({success: true, lists:lists},null,2));
        res.end();

}
});
});

//POST HTTP method to /bucketlist

router.post('/', (req,res,next) => {
    //res.send("POST");
   // console.log( req.body.title, req.body.description, req.body.category);
    let newList = new bucketlist({
        title: req.body.title,
        description: req.body.description,
        category: req.body.category
    });

   // console.log(newList);
    bucketlist.addList(newList,(err, list) => {
        if(err) {
            res.json({success: false, message: `Failed to create a new list. Error: ${err}`});

        }
        else
            res.json({success:true, message: "Added successfully."});

    });
});

//DELETE HTTP method to /bucketlist. Here, we pass in a params which is the object id.
router.delete('/:id', (req,res,next)=> {
    //res.send("DELETE");

    //access the parameter which is the id of the item to be deleted
    let id = req.params.id;
  //Call the model method deleteListById
    bucketlist.deleteListById(id,(err,list) => {
        if(err) {
            res.json({success:false, message: `Failed to delete the list. Error: ${err}`});
        }
        else if(list) {
            res.json({success:true, message: "Deleted successfully"});
        }
        else
            res.json({success:false});
    })

})

module.exports = router;