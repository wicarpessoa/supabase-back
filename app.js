//import express from 'express';
const express = require('express');

//import createClient from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'
//import {createClient} from '@supabase/supabase-js'
const supabaseClient = require('@supabase/supabase-js');

//import morgan from 'morgan';
const morgan = require('morgan');

//import bodyParser from "body-parser";
const bodyParser = require('body-parser');

//import { createClient } from "https://cdn.skypack.dev/@supabase/supabase-js";

const app = express();

const cors = require("cors");
const corsOptions = {
    origin: '*',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}

app.use(cors(corsOptions)) // Use this after the variable declaration


app.use(morgan('combined'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const supabase =
    supabaseClient.createClient('https://zrbbfclbyjbunoxutegs.supabase.co',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpyYmJmY2xieWpidW5veHV0ZWdzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMTc3MTU4NiwiZXhwIjoyMDQ3MzQ3NTg2fQ.DDkQWhy2cgwnbg4VhveyzOQnbOKuiDsnNe0aVSsgjMc')


app.get('/products', async (req, res) => {
    const { data, error } = await supabase
        .from('products')
        .select()
        .order('id')
    return res.send(data);
});

app.get('/products/:id', async (req, res) => {
    console.log("id = " + req.params.id);
    const { data, error } = await supabase
        .from('products')
        .select()
        .eq('id', req.params.id)
    return res.send({ data });

});

app.post('/products', async (req, res) => {
    const { error } = await supabase
        .from('products')
        .insert({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
        })
    if (error) {
        return res.send({ error });
    }
    return res.send({ "message": "created!!" });

});

app.put('/products/:id', async (req, res) => {
    const { error } = await supabase
        .from('products')
        .update({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price
        })
        .eq('id', req.params.id)
    if (error) {
        res.send({ error });
    }
    res.send({ "message": "updated!!" });
});

app.delete('/products/:id', async (req, res) => {
    console.log("delete: " + req.params.id);
    const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', req.params.id)
    if (error) {
        return res.send({ error });
    }
    return res.send({ "message": "deleted!!" })
});

app.get('/', (req, res) => {
    res.send("Hello I am working my friend Supabase <3");
});

app.get('*', (req, res) => {
    res.send("Hello again I am working my friend to the moon and behind <3");
});

app.listen(3000, () => {
    console.log(`> Ready on http://localhost:3000`);
});