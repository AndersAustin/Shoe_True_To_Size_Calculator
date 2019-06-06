import React from 'react';
import axios from 'axios';
import { Paper, Typography, FormControl, InputLabel, Select, MenuItem, Button } from '@material-ui/core';
import './styles.css';

class trueToSizeCalc extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      calculated: false,
      calculatedValue: 0
    }
  }

  handleCalculate(event) {
    event.preventDefault();
    axios.get(`${this.props.URI}/TTSEntries?shoe_id=${this.props.selectedShoe.shoe_id}`)
    .then(data => {
      if (!data.data[0].sum) {
        this.setState({
          calculatedValue: `There isn't any data for this shoe yet!`,
          calculated: true
        })
      } else {
        this.setState({
          calculatedValue: Number(data.data[0].sum) / Number(data.data[0].count),
          calculated: true
        })
      }
    })
    .catch(err => {
      // console.error(err)
    })
  }

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
          <FormControl className = 'selectForm'>
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
          <br/><br/>
          <FormControl className = 'selectForm'>
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