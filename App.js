import React from 'react';
import { 
  StyleSheet
  , Text
  , View
  , StatusBar
  , TextInput
  , Dimensions
  , Platform, 
  ScrollView} from 'react-native';
  import Todo from './Todo.js';

const { width, height } = Dimensions.get('window');

class App extends React.Component {
  state = {
    input: ''
  };

  render() {
    const { input } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar barStyle='light-content' />
        <Text style={styles.title}> TODO list </Text>
        <View style={styles.card}>
          <TextInput 
            style={styles.input} 
            placeholder='new to do'
            value={input}
            onChangeText={this.getNewInput}
          />
          <ScrollView style={styles.scroll}>
            <Todo />
          </ScrollView>
        </View>
    </View>
    )
  }

  // getNewInput(text)로 사용할 경우 onChageText event에 따로 bind 해줘야함
  getNewInput = text => {
    this.setState({ input: text });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F23657',
    alignItems: 'center',
  }
  , title: {
    color: 'white'
    , fontSize: 40
    , marginTop: 40
    , fontWeight: "300"
  }
  , card: {
    flex: 1
    , backgroundColor: 'white'
    , width: width - 50
    , marginTop: 20
    , borderTopLeftRadius: 15
    , borderTopRightRadius: 15
    // SHADOW : platform customizing code
    , ...Platform.select({
      ios: {
        shadowColor: 'rgb(50, 50, 50)'
        , shadowOpacity: 0.5
        , shadowRadius: 0.5
        , shadowOffset: {
          height: -2
          , width: 2
        }
      }
      , android: {
        elevation: 3
      }
    })
  }
  , input: {
    fontSize: 20
    , padding: 20
    , borderBottomColor: 'lightgrey'
    , borderBottomWidth: 1
  }
  , scroll: {

  }
});

export default App;