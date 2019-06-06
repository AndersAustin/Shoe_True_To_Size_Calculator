import React from 'react';
import { Paper, Typography, FormControl, InputLabel, Select, MenuItem, Button } from '@material-ui/core';
import './styles.css';
const insertNewData = (props) => {
  
  return (
    <Paper className='paper'>
      <Typography variant='h3'>
        Add a true-size data point!
      </Typography>
      <FormControl className = 'selectForm'>
        <InputLabel>Brand</InputLabel>
        <Select
          value={props.selectedBrand}
          onChange={(e) => {props.handleChange(e,'brand')}}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {props.brands.map((value, index) => {
            return <MenuItem value={value} key = {index}>{value.brand_name}</MenuItem>
          })}
        </Select>
      </FormControl>
      <br/><br/>
      <FormControl className = 'selectForm'>
        <InputLabel>Shoe Name</InputLabel>
        <Select
          value={props.selectedShoe}
          onChange={(e) => {props.handleChange(e,'shoe')}}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem><br/><br/>
          {props.shoes.map((value, index) => {
            return <MenuItem value={value} key = {index}>{value.shoe_name}</MenuItem>
          })}
        </Select>
      </FormControl>
      <br/><br/>
      <FormControl className = 'selectForm'>
        <InputLabel>True Size</InputLabel>
        <Select
          value = {props.selectedScale}
          onChange={(e) => {props.handleChange(e,'scale')}}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {['1','2','3','4','5'].map((value, index) => {
            return <MenuItem value={value} key = {index}>{value}</MenuItem>
          })}
        </Select>
      </FormControl>
      <br/><br/>
      <Button variant = 'contained' onMouseUp = {(event) => {props.handleEntrySubmit(event)}}>
        Submit
      </Button>
    </Paper>
  )
}

export default insertNewData;