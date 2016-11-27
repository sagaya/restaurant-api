import mongoose from 'mongoose';
import { Router } from 'express';
import Restaurant from '../model/restaurant';


export default ({config,db}) =>{
  let api = Router()
  // for v1/restaurant/add
  //CREATE-
  api.post('/add', (req,res)=>{
    let newRest = new Restaurant();
    newRest.name = req.body.name;
    newRest.save(err=>{
      if (err) {
        res.send(err);
      }else {
        res.json({message: 'Restaurant saved successfully'});
      }
    })
  })

  //read- part /v1/restaurant
  api.get('/', (req,res)=>{
    Restaurant.find({}, (err,restaurants)=>{
      if (err) {
        res.send(err);
      }else {
        res.json(restaurants);
      }
    });
  });

  //search
  //read- /v1/restaurant/:id
  api.get('/:id', (req,res)=>{
    Restaurant.findById(req.params.id, (err,restaurant)=>{
      if (err) {
        res.send(err)
      }else {
        res.json(restaurant);
      }
    });

  });

  //PUT- /V1/restaurant/:ID
  api.put('/:id', (req,res)=>{
    Restaurant.findById(req.params.id, (err,restaurant)=>{
      if (err) {
        res.send(err);
      }else {
        restaurant.name = req.body.name;
        restaurant.save(err => {
          if (err) {
            res.send(err)
          }else{
            res.json({message:"Restaurant info updated"});
          }
        });

      }
    })
  });

  //DELETE- V1/Restaurant/:ID
  api.delete('/:id', (req,res)=>{
    Restaurant.remove({
      _id: req.params.id
    },(err, restaurant)=>{
      if (err) {
        res.send(err)
      }else {
        res.json({message:`Restaurant  successfully removed`})
      }
    });
  });

  return api;
}
