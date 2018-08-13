import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation'
import 'tachyons';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Clarifai from 'clarifai';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
const app = new Clarifai.App({
  apiKey: 'd42022ef0dc94e00b7b0026473a85f41'
});


class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false
    }
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    console.log(width, height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({ box: box });
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
    console.log(this.state.input);
  }

  onButtonSubmit = () => {
    this.setState({
      imageUrl: this.state.input
    })
    app.models
      .predict(
        "a403429f2ddf4b49b307e318f00e528b",
        this.state.input)
      .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
      .catch(err => console.log(err));
  }
  onRouteChange = (route) => {
    if (route==='signout'){
      this.setState({isSignedIn: false})
    }else if(route==='home')
    {
      this.setState({isSignedIn: true})
    }
    this.setState({ route: route });
    console.log(this.state.route);
  }
  render() {
    return (
      <div>
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn}/>
        {this.state.route === 'home'
          ? <div>
            <Logo />
            <Rank />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
            />
            <FaceRecognition imageUrl={this.state.imageUrl} box={this.state.box} />
          </div>

          :
          (
            (this.state.route === 'signin' || this.state.route === 'signout')
              ? <Signin onRouteChange={this.onRouteChange} />
              : <Register onRouteChange={this.onRouteChange} />
          )
      }
       </div>
    )
  }
}
  
      
      export default App;
