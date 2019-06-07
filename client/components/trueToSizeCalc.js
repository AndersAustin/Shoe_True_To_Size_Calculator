import React from 'react';
import axios from 'axios';
import { Paper, Typography, FormControl, InputLabel, Select, MenuItem, Button } from '@material-ui/core';
import './styles.css';

class trueToSizeCalc extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      calculated: false,
      calculatedValue: 0,
      calculateAttempted: false
    }
  }

  handleCalculate(event) {
    event.preventDefault();
    axios.get(`${this.props.URI}/TTSEntries?shoe_id=${this.props.selectedShoe.shoe_id}`)
    .then(data => {
      //if there are no data points return a string
      if (!data.data[0].sum) {
        this.setState({
          calculatedValue: `There isn't any data for this shoe yet!`,
          calculated: true,
          calculateAttempted: false
        })
      } else {
        this.setState({
          calculatedValue: Number(data.data[0].sum) / Number(data.data[0].count),
          calculated: true,
          calculateAttempted: false
        })
      }
    })
    //when the request fails, it means that one of the forms was not filled, so the attempted state property should be set to true so that the unfilled form can 
    //highlight in red
    .catch(err => {
      // console.error(err)
      this.setState({
        calculateAttempted: true
      })
    })
  }

  //after calculating, this function will trigger when retry is clicked, 'refreshing' the page
  handleRetry(event) {
    event.preventDefault();
    this.setState({
      calculated: false
    }, () => {
      this.props.handleTabChange(null,1);
    })
  }

  render() {
    let output;
    
    const brandForm = (
      <FormControl className = 'selectForm' error = {!this.props.selectedBrand && this.state.calculateAttempted ? true : false}>
        <InputLabel>Brand</InputLabel>
        <Select
          value={this.props.selectedBrand}
          onChange={(e) => {this.props.handleChange(e,'brand')}}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {this.props.brands.map((value, index) => {
            return <MenuItem value={value} key = {index}>{value.brand_name}</MenuItem>
          })}
        </Select>
      </FormControl>
    )

    const shoeForm = (
      <FormControl className = 'selectForm' error = {!this.props.selectedShoe && this.state.calculateAttempted ? true : false}>
        <InputLabel>Shoe Name</InputLabel>
        <Select
          value={this.props.selectedShoe}
          onChange={(e) => {this.props.handleChange(e,'shoe')}}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem><br/><br/>
          {this.props.shoes.map((value, index) => {
            return <MenuItem value={value} key = {index}>{value.shoe_name}</MenuItem>
          })}
        </Select>
      </FormControl>
    )

    if (this.state.calculated) {
      output = (
        <Typography variant= 'h3'>
          {this.state.calculatedValue}
          <br/><br/>
          <Button variant = 'contained' onMouseUp = {(e) => {this.handleRetry(e)}}>
            Retry
          </Button>
        </Typography>
      )
    } else {
      output = (
        <div>
          <Typography variant='h3'>
            Find the average true-to-size fit for a shoe!
          </Typography>
          {brandForm}
          <br/><br/>
          {shoeForm}
          <br/><br/>
          <Button variant = 'contained' onMouseUp = {(e) => {this.handleCalculate(e)}}>
            Calculate
          </Button>
        </div>
      )
    }

    return (
      <Paper className='paper'>
        {output}
      </Paper> 
    )
  }


  
}

export default trueToSizeCalc;