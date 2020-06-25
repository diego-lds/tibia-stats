import React from 'react';
import './AutoComplete.css';

import formatterCreatureName from '../utils/formatterCreatureName';


export default class AutoComplete extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      items: props.data,
      suggestions: [],
      text: '',
      handleSelect: props.onSelect,
    }
  }


  handleOnChange = e => {
    const {items} = this.state;
    let value = e.target.value;
    let suggestions = [];
    if(items && value.length >= 2){
      let filteredList = items.filter(item => item.toLowerCase().includes(value.toLowerCase()));
      suggestions = filteredList.sort(function (a,b){
        return a.length - b.length;
      })
    }else{
      suggestions = [];
    }
   
    this.setState(() => ({
      suggestions,
      text: value,
    }));
  }

  handleGetImage = creatureName => {
    
    const formattedName = formatterCreatureName(creatureName);
    console.log(creatureName, formattedName)
    return (
     
        <img className="suggestion-image" src={`assets/creatures/${formattedName}.gif`} alt="" />   
    )
  }

  renderSuggestions(){
    const {suggestions} = this.state;
    if(suggestions.length > 0){
      return (
        <ul>
          {suggestions.map((suggestion, index) => 
          <li
            onClick={() => this.handleSuggestedSelected(suggestion)} 
            key={index}
            >
              <span>
                {suggestion}
              </span>
            {/* {this.handleGetImage(suggestion)} */}
           </li>
           
           )}
        </ul>
      )
    }else{
      return null;
    }
  }

  handleSuggestedSelected(value){
    const {handleSelect} = this.state;

    handleSelect(value);

    this.setState(() => ({
      text: value,
      suggestions:[],
    }));
  }
  
  render(){
    const {text} = this.state;    
    return (
      <div className="wrap-input">
        <input value={text} onChange={this.handleOnChange} type="text" placeholder="Digite um nome" />
        {this.renderSuggestions()}
      </div>
    )
  }
}
