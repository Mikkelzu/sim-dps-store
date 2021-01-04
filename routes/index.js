const express = require('express')
const router = express.Router()

const connection = require('../database/connection-pool')

router.get('/', (req, res, next) => {
    connection.query("SELECT * FROM sim_data ORDER BY sim_date DESC", (err, result, fields) => {
        if (!err) {
            console.log(result);
            res.render('index', {data: result})
        }
        else {
            console.log(err)
        }
    })
})

router.post('/new', (req, res, next) => {
    var post = {
        char_name: req.body.char_name,
        region: req.body.region,
        realm: req.body.realm,
        class: req.body.class,
        spec: req.body.spec,
        sim_type: req.body.sim_type,
        sim_dps: req.body.sim_dps
    }

    let statement = "insert into sim_data(character_name, region_name, realm_name, sim_type, sim_dps, character_class, character_spec) values (?,?,?,?,?,?,?)"
    let values = [post.char_name, post.region, post.realm, post.sim_type, post.sim_dps, post.class, post.spec]

    connection.query(statement, values, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.redirect('/')
        }
    })

})

router.post('/delete/:id', (req, res, next) => {
    connection.query("DELETE FROM sim_data WHERE id = '" + req.params.id + "'", (err, result) => {
        try {
            if (err) {
                console.log(err)
            } else {
                console.log('removed record')
                res.redirect('/')
            }
        }
        catch (e) {
            console.log(e)
        }
    })
})

module.exports = router