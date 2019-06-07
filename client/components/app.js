import React from 'react';
import axios from 'axios';
import InsertNewData from './insertNewData.js';
import TrueToSizeCalc from './trueToSizeCalc.js';
import { AppBar, Typography, Tabs, Tab  } from '@material-ui/core';
import './styles.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        URI: `http://3.17.75.37`,
        value: 0,
        brands: [],
        selectedBrand: '',
        shoes: [],
        selectedShoe: '',
        selectedScale: '',
        submitAttempted: false
    }
  }

  //Get all brands so that the drop down menus will be populated (for brand)
  componentDidMount() {
      axios.get(`${this.state.URI}/brands`)
      .then(data => {
          this.setState({
              brands: data.data
          })
      })
      .catch(err => {
        //   console.error(err);
      })
  }

  //Handle the changes in the tabs
  handleTabChange(event,newValue) {
      this.setState({
          value: newValue,
          selectedBrand: '',
          selectedShoe: '',
          selectedScale: '',
          submitAttempted: false
      })
  }

  //This is a reused function for whenever a drop down is selected and the value is changed, using a second hardcoded argument based on which dropdown
  handleChange(event, subject) {
      event.preventDefault();
      if (subject === 'brand') {
        axios.get(`${this.state.URI}/shoes?brand_id=${event.target.value.brand_id}`)
        .then(data => {   
          this.setState({
            selectedBrand: event.target.value,
            shoes: data.data
          })
        })
        .catch(err => {
            //   console.error(err);
          })
      } else if (subject === 'shoe') {
        this.setState({
          selectedShoe: event.target.value
        })
      } else if (subject === 'scale') {
        this.setState({
          selectedScale: Number(event.target.value)
        })
      }
  }

  //This runs when the submit button is clicked on the first tab
  handleEntrySubmit(event) {
      event.preventDefault();

      axios.post(`${this.state.URI}/TTSEntries`, {
          shoe_id: this.state.selectedShoe.shoe_id,
          TTSEntry: Number(this.state.selectedScale)
      })
      .then(data => {
        //   console.log(data.data)
        this.setState({
          selectedBrand: '',
          selectedShoe: '',
          selectedScale: '',
          submitAttempted: false,
          shoes: []
        })
      })
      .catch(err => {
        //   console.error(err);
        this.setState({
          submitAttempted: true
        })
      })
  }

  //used to clear the shoes state object after average is calculated
  handleClearShoes() {
    this.setState({
      shoes: []
    })
  }

  render() {
    return (
    <div>
      <AppBar id = 'appBar' position = 'static' >               
        <Typography id = 'appBarText' variant="h2">Shoe True To Size Calculator</Typography>
      </AppBar>
      <div>
        <Tabs className = 'tabs' value = {this.state.value} onChange = {this.handleTabChange.bind(this)}>
          <Tab label = 'Insert new data point'/>
          <Tab label = 'Find true to size fit'/>
        </Tabs>
        {this.state.value === 0 && <InsertNewData 
          selectedBrand = {this.state.selectedBrand} 
          brands = {this.state.brands} 
          shoes = {this.state.shoes} 
          selectedShoe = {this.state.selectedShoe} 
          selectedScale = {this.state.selectedScale} 
          handleChange = {this.handleChange.bind(this)}
          handleEntrySubmit = {this.handleEntrySubmit.bind(this)}
          submitAttempted = {this.state.submitAttempted}
        />}
        {this.state.value === 1 && <TrueToSizeCalc 
          selectedBrand = {this.state.selectedBrand} 
          brands = {this.state.brands} 
          shoes = {this.state.shoes} 
          URI = {this.state.URI}
          selectedShoe = {this.state.selectedShoe} 
          handleChange = {this.handleChange.bind(this)}
          handleTabChange = {this.handleTabChange.bind(this)}
          handleClearShoes = {this.handleClearShoes.bind(this)}
        />}    
      </div>
    </div>
    )
  }
}


export default App;