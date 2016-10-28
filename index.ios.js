
'use strict';
var Home = require('./home.ios');
var Quote = require('./quote.ios');

'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  TabBarIOS,
  View
} from 'react-native';

import api from './api';
import qod from './api';

class Inspired extends Component {
  constructor(props){
    super(props);
    this.state = {
      category: '',
      qod: [],
      categoryQuote: [],
      selectedTab: 'home'
    }
  }

  componentDidMount(){
    var response = qod.getQuoteofDay()
    .then((resJson) => {
      this.setState({qod: resJson.contents.quotes[0]})
    })
    .catch((error) => {
      console.log("these are your errors",error);
    });
  }

  render() {
    const {quote, author, background} = this.state.qod
    console.log(quote, author, background)
    return (
      <TabBarIOS selectedTab={this.state.selectedTab}>
        <TabBarIOS.Item
          selected={this.state.selectedTab === 'home'}
          systemIcon={'most-recent'}
          onPress={() => {
            this.setState({
                selectedTab: 'home',
            });
          }}>
            <Home/>
          </TabBarIOS.Item>
          <TabBarIOS.Item
            selected={this.state.selectedTab === 'qod'}
            systemIcon={'contacts'}
            onPress={() => {
                this.setState({
                  selectedTab: 'qod',
                });
            }}>
              <Quote qod={this.state.qod}/>
            </TabBarIOS.Item>
          </TabBarIOS>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover'
},
  container: {
    flex: 1,
    height: 150
  },
  welcome: {
    fontFamily: 'Cochin',
    fontSize: 20,
    textAlign: 'left',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('Inspired', () => Inspired);
